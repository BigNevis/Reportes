"use client"

import { useEffect, useRef, useState } from 'react'
import { treemap, hierarchy, HierarchyNode } from 'd3-hierarchy'
import { select } from 'd3-selection'
import { scaleLinear } from 'd3-scale'

interface EpicaData {
  nombre_epica: string;
  cantidad_incidencias: number;
  incidencias_pendientes: number;
  porcentaje_avance: number;
}

export function IncidenciasPorEpica() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [data, setData] = useState<EpicaData[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/epicas-avance')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No se recibieron datos válidos');
        }
        setData(data.map(item => ({
          ...item,
          cantidad_incidencias: Number(item.cantidad_incidencias),
          incidencias_pendientes: Number(item.incidencias_pendientes),
          porcentaje_avance: Number(item.porcentaje_avance)
        })));
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setError("Error al cargar los datos. Por favor, intente nuevamente más tarde.");
      });
  }, [])

  useEffect(() => {
    if (svgRef.current && data.length > 0) {
      try {
        const svg = select(svgRef.current)
        const width = svg.node()?.getBoundingClientRect().width ?? 800
        const height = 400

        svg.selectAll("*").remove()

        // Filtramos las épicas que no están al 100%
        const epicasPendientes = data.filter(d => d.porcentaje_avance < 100)

        const root = hierarchy<{ children: EpicaData[] }>({ children: epicasPendientes })
          .sum(d => (d as EpicaData).cantidad_incidencias)
          .sort((a, b) => (b.value || 0) - (a.value || 0));

        const treeMapLayout = treemap<{ children: EpicaData[] }>()
          .size([width, height])
          .padding(2)
          .round(true)

        treeMapLayout(root)

        const colorScale = scaleLinear<string>()
          .domain([0, 50, 100])
          .range(["#ff0000", "#ffff00", "#00ff00"])

        const nodes = svg.selectAll<SVGGElement, HierarchyNode<EpicaData>>('g')
          .data(root.leaves())
          .join('g')
          .attr('transform', d => `translate(${d.x0},${d.y0})`)

        nodes.append('rect')
          .attr('width', d => Math.max(0, d.x1 - d.x0))
          .attr('height', d => Math.max(0, d.y1 - d.y0))
          .attr('fill', '#8b5cf6') // Color violeta base

        nodes.append('rect')
          .attr('width', d => Math.max(0, d.x1 - d.x0) * (d.data.porcentaje_avance / 100))
          .attr('height', d => Math.max(0, d.y1 - d.y0))
          .attr('fill', '#10b981') // Color verde para el progreso


        nodes.append('text')
          .selectAll('tspan')
          .data(d => [
            { text: d.data.nombre_epica, y: 13 },
            { text: `${d.data.incidencias_pendientes} de ${d.data.cantidad_incidencias}`, y: 26 },
            { text: `${d.data.porcentaje_avance.toFixed(2)}%`, y: 39 }
          ])
          .join('tspan')
          .attr('x', 3)
          .attr('y', d => d.y)
          .attr('fill', 'white') // Cambiamos el color del texto a blanco para mejor contraste
          .attr('font-size', '10px')
          .attr('font-weight', 'bold') // Hacemos el texto más grueso
          .text(d => d.text)

        svg.append("title").text("Treemap de incidencias por épica pendiente")
      } catch (err) {
        console.error("Error rendering treemap:", err)
        setError("Error al renderizar el gráfico. Por favor, intente nuevamente más tarde.")
      }
    }
  }, [data])

  if (error) {
    return <div className="text-white bg-red-600 p-4 rounded-md">{error}</div>;
  }

  if (data.length === 0) {
    return <div className="text-white">Cargando datos de épicas pendientes...</div>;
  }

  return (
    <div className="w-full overflow-hidden">
      <svg ref={svgRef} width="100%" height="400" className="overflow-visible" aria-label="Treemap de incidencias por épica"></svg>
    </div>
  )
}

