'use client'

import { useState, useEffect, useMemo } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import React from 'react';
import { MatrizAvance } from '@/types/matriz-avance';

const estados = [
  { key: 'bloqueado_por_bug', label: 'Bloqueado por BUG' },
  { key: 'no_iniciado', label: 'No iniciado' },
  { key: 'en_progreso', label: 'En progreso' },
  { key: 'ambiente_dev', label: 'Ambiente DEV' },
  { key: 'ambiente_test', label: 'Ambiente TEST' },
  { key: 'uat_con_usuarios', label: 'UAT con usuarios' },
  { key: 'pendiente_implementar_prod', label: 'Pendiente implementar PROD' },
  { key: 'ambiente_prod', label: 'Ambiente PROD' },
] as const;

type EstadoKey = typeof estados[number]['key'];

const calcularPorcentaje = (valor: number, total: number): number => {
  return total > 0 ? (valor / total) * 100 : 0;
};

const formatPercentage = (value: number): string => {
  return value.toFixed(2) + '%';
};

export function TablaAvance() {
  const [data, setData] = useState<MatrizAvance | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    fetch('/api/matriz-avance')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(setData)
      .catch(err => {
        console.error("Error fetching data:", err);
        setError("Error al cargar los datos. Por favor, intente nuevamente más tarde.");
      });
  }, []);

  const processedData = useMemo(() => {
    if (!data) return null;

    return Object.entries(data).map(([projectKey, epicas]) => {
      const processedEpicas = epicas.map(epica => {
        const porcentajes = {} as Record<EstadoKey, number>;
        estados.forEach(({ key }) => {
          porcentajes[key] = calcularPorcentaje(Number(epica[key]), Number(epica.cantidad_incidencias));
        });
        return { ...epica, porcentajes };
      });

      const resumen = processedEpicas.reduce((acc, epica) => {
        acc.cantidad_incidencias += Number(epica.cantidad_incidencias);
        estados.forEach(({ key }) => {
          acc[key] += Number(epica[key]);
        });
        return acc;
      }, {
        project_key: projectKey,
        nombre_epica: 'Resumen del Proyecto',
        id_epica: 'resumen',
        cantidad_incidencias: 0,
        ...Object.fromEntries(estados.map(({ key }) => [key, 0]))
      });

      const resumenPorcentajes = {} as Record<EstadoKey, number>;
      estados.forEach(({ key }) => {
        resumenPorcentajes[key] = calcularPorcentaje(resumen[key], resumen.cantidad_incidencias);
      });

      return {
        projectKey,
        resumen: { ...resumen, porcentajes: resumenPorcentajes },
        epicas: processedEpicas
      };
    });
  }, [data]);

  const toggleProject = (projectKey: string) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectKey]: !prev[projectKey]
    }));
  };

  if (error) {
    return <div className="text-white bg-red-600 p-4 rounded-md">{error}</div>;
  }

  if (!processedData) {
    return <div className="text-white">Cargando datos...</div>;
  }

  return (
    <div className="overflow-x-auto">
      {processedData.map(({ projectKey, resumen, epicas }) => (
        <div key={projectKey} className="mb-8">
          <div 
            className="flex items-center text-xl font-bold text-white mb-4 cursor-pointer"
            onClick={() => toggleProject(projectKey)}
          >
            {expandedProjects[projectKey] ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
            {projectKey}
          </div>
          <table className="min-w-full divide-y divide-violet-400/20">
            <thead>
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-white bg-violet-800/50">
                  Épica
                </th>
                {estados.map((estado) => (
                  <th
                    key={estado.key}
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-semibold text-white bg-violet-800/50"
                  >
                    {estado.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-violet-400/20 bg-violet-900/20">
              <tr key={`${projectKey}-summary`} className="bg-violet-800/30">
                <th scope="row" className="px-4 py-3 text-sm font-medium text-white whitespace-nowrap text-left">
                  {resumen.nombre_epica}
                </th>
                {estados.map((estado) => (
                  <td
                    key={estado.key}
                    className="px-4 py-3 text-sm text-white whitespace-nowrap"
                    style={{
                      backgroundColor: `rgba(139, 92, 246, ${resumen.porcentajes[estado.key] / 100})`
                    }}
                  >
                    {formatPercentage(resumen.porcentajes[estado.key])}
                  </td>
                ))}
              </tr>
              {expandedProjects[projectKey] && epicas.map((epica) => (
                <tr key={epica.id_epica}>
                  <th scope="row" className="px-4 py-3 text-sm font-medium text-white whitespace-nowrap pl-8 text-left">
                    {`[${epica.id_epica}] - ${epica.nombre_epica}`}
                  </th>
                  {estados.map((estado) => (
                    <td
                      key={estado.key}
                      className="px-4 py-3 text-sm text-white whitespace-nowrap"
                      style={{
                        backgroundColor: `rgba(139, 92, 246, ${epica.porcentajes[estado.key] / 100})`
                      }}
                    >
                      {formatPercentage(epica.porcentajes[estado.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

