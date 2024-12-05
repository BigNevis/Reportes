import fetch from 'node-fetch';
import pg from 'pg';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://bi-reports.appfire.app/aio-app/rest/aio-cn/1.0/powerbi/export/NmJiZDkwZTctN2NiMC00Njk4LTlkMmUtNjVjNDkyMDdk';

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reportes_local',
  password: 'admin',
  port: 5432,
});

async function fetchOData(url) {
  console.log(`Fetching data from: ${url}`);
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json;odata=verbose',
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0'
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

async function obtenerDatosEntidad(entidad) {
  console.log(`Obteniendo datos para: ${entidad}`);
  let url = `${baseUrl}/${entidad}?$format=json`;
  let allData = [];
  
  try {
    while (url) {
      const data = await fetchOData(url);
      if (data.value) {
        allData = allData.concat(data.value);
        
        // Log the first 5 elements for debugging
        if (allData.length <= 5) {
          console.log(`Primeros ${allData.length} elementos de ${entidad}:`, JSON.stringify(allData, null, 2));
        }
        
        // For Issues, log specific fields
        if (entidad === 'Issues' && allData.length <= 5) {
          allData.forEach((item, index) => {
            console.log(`Issue ${index + 1}:`, {
              Clave: item.Clave,
              Ambiente: item.Ambiente,
              AmbienteDetectado: item['Ambiente Detectado']
            });
          });
        }
      }
      url = data['@odata.nextLink'];
      console.log(`Obtenidos ${allData.length} registros para ${entidad}. ${url ? 'Continuando con el siguiente conjunto de datos.' : 'Todos los datos obtenidos.'}`);
    }
    
    console.log(`Datos obtenidos con éxito para ${entidad}. Cantidad total: ${allData.length}`);
    return allData;
  } catch (error) {
    console.error(`Error al obtener datos para ${entidad}:`, error.message);
    return { error: error.message };
  }
}

async function guardarReporteEnDB(entidad, datos) {
  const client = await pool.connect();
  try {
    const query = 'INSERT INTO raw_data_json (entity_name, json_data) VALUES ($1, $2)';
    await client.query(query, [entidad, JSON.stringify(datos)]);
    console.log(`Datos de ${entidad} guardados en la base de datos.`);
  } catch (error) {
    console.error(`Error al guardar datos de ${entidad} en la base de datos:`, error);
  } finally {
    client.release();
  }
}

async function obtenerTodasLasEntidades() {
  try {
    const metadataResponse = await fetchOData(`${baseUrl}?$format=json`);
    return metadataResponse.value.map(e => e.name);
  } catch (error) {
    console.error('Error al obtener la lista de entidades:', error.message);
    return [];
  }
}

async function inicializarBaseDeDatos() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS raw_data_json (
        id SERIAL PRIMARY KEY,
        entity_name VARCHAR(50) NOT NULL,
        data_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        json_data JSONB NOT NULL
      );
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_raw_data_json_entity_name ON raw_data_json(entity_name);
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_raw_data_json_data_date ON raw_data_json(data_date);
    `);

    // Crear o modificar la tabla Issues
    await client.query(`
      CREATE TABLE IF NOT EXISTS Issues (
        Clave VARCHAR(50) PRIMARY KEY,
        "Parent Issue Summary" TEXT,
        "Start date" DATE,
        "Current Sprint Id" VARCHAR(50),
        "Prioridad (1)" TEXT,
        "Current Assignee:  Name" TEXT,
        "End date" DATE,
        Ambiente TEXT,
        "Epic Status" TEXT,
        "Epic Link" TEXT,
        TaskPoint NUMERIC(10, 2),
        "Current Sprint Start Date" TIMESTAMP,
        "Tiempo Trabajado" NUMERIC(10, 2),
        "Fecha pasaje a PROD" DATE,
        Prioridad TEXT,
        "Informador:  Name" TEXT,
        "Estimación de puntos de historia" NUMERIC,
        "Parent Link" TEXT,
        "Ambiente Detectado" TEXT,
        "Project Key" TEXT,
        "Fecha pasaje RFC/PRY" DATE,
        "Fecha de Inicio" DATE,
        "Current Sprint Id (Number)" INTEGER,
        "Time Spent (Incl_ Sub-tasks)" NUMERIC(10, 2),
        Responsable TEXT,
        "Issue ID" INTEGER,
        Resumen TEXT,
        Criticidad TEXT,
        "Remaining Estimate (Incl_ Sub-tasks)" NUMERIC(10, 2),
        "Story Points Completed" NUMERIC,
        "Trabajo restante estimado" NUMERIC(10, 2),
        "Criticidad (1)" TEXT,
        "Parent Issue Key" TEXT,
        "Project Name" TEXT,
        "Story Points Remaining" NUMERIC,
        Consultora TEXT,
        "Current Sprint End Date" TIMESTAMP,
        "Parent Issue Status" TEXT,
        "StoryPoint Finales" NUMERIC,
        "Current Sprint Name" TEXT,
        "Tipo de Incidencia" TEXT,
        BugPoint NUMERIC,
        "Original Estimate (Incl_ Sub-tasks)" NUMERIC(10, 2),
        "Esfuerzo Estimado en Horas" NUMERIC(10, 2),
        "Estimación original" NUMERIC(10, 2),
        "Epic Name" TEXT,
        "Current Status" TEXT,
        "Story Points" NUMERIC
      );
    `);

    console.log('Base de datos inicializada correctamente.');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    client.release();
  }
}

async function obtenerReporteCompleto() {
  try {
    console.log('Iniciando la obtención de datos de todas las entidades...');

    await inicializarBaseDeDatos();

    const entidades = await obtenerTodasLasEntidades();
    console.log('Entidades disponibles:', entidades);

    for (const entidad of entidades) {
      const datosEntidad = await obtenerDatosEntidad(entidad);
      await guardarReporteEnDB(entidad, datosEntidad);
    }

    console.log('Todos los datos han sido guardados en la base de datos.');
  } catch (error) {
    console.error('Error al obtener o procesar el reporte completo:', error.message);
  } finally {
    await pool.end();
  }
}

obtenerReporteCompleto();

