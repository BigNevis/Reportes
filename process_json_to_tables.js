import pg from 'pg';

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reportes_local',
  password: 'admin',
  port: 5432,
});

async function deleteTableData(tableName) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`DELETE FROM ${tableName}`);
    await client.query('COMMIT');
    console.log(`Datos eliminados de la tabla ${tableName}`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`Error al eliminar datos de la tabla ${tableName}:`, error);
    throw error;
  } finally {
    client.release();
  }
}

async function deleteAllTableData() {
  const tables = ['Issues', 'Components', 'Etiquetas', 'History', 'Linked_Issues', 'Sprints', 'Worklogs', 'Epics'];
  for (const table of tables) {
    await deleteTableData(table);
  }
}

async function getLatestJsonData() {
  const client = await pool.connect();
  try {
    const query = `
      SELECT DISTINCT ON (entity_name) 
        entity_name, 
        json_data
      FROM raw_data_json
      ORDER BY entity_name, data_date DESC
    `;
    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
}

async function processIssues(issuesData) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const issue of issuesData) {
      console.log('Procesando Issue:', {
        Clave: issue.Clave,
        Ambiente: issue.Ambiente,
        AmbienteDetectado: issue['Ambiente Detectado']
      });
      const query = `
        INSERT INTO Issues (
          Clave, "Parent Issue Summary", "Start date", "Current Sprint Id", "Prioridad (1)",
          "Current Assignee:  Name", "End date", Ambiente, "Epic Status", "Epic Link",
          TaskPoint, "Current Sprint Start Date", "Tiempo Trabajado", "Fecha pasaje a PROD",
          Prioridad, "Informador:  Name", "Estimación de puntos de historia", "Parent Link",
          "Ambiente Detectado", "Project Key", "Fecha pasaje RFC/PRY", "Fecha de Inicio",
          "Current Sprint Id (Number)", "Time Spent (Incl_ Sub-tasks)", Responsable,
          "Issue ID", Resumen, Criticidad, "Remaining Estimate (Incl_ Sub-tasks)",
          "Story Points Completed", "Trabajo restante estimado", "Criticidad (1)",
          "Parent Issue Key", "Project Name", "Story Points Remaining", Consultora,
          "Current Sprint End Date", "Parent Issue Status", "StoryPoint Finales",
          "Current Sprint Name", "Tipo de Incidencia", BugPoint,
          "Original Estimate (Incl_ Sub-tasks)", "Esfuerzo Estimado en Horas",
          "Estimación original", "Epic Name", "Current Status", "Story Points"
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18,
          $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34,
          $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48
        )
      `;
      await client.query(query, [
        issue.Clave,
        issue['Parent Issue Summary'],
        issue['Start date'],
        issue['Current Sprint Id'],
        issue['Prioridad (1)'],
        issue['Current Assignee:  Name'],
        issue['End date'],
        issue.Ambiente,
        issue['Epic Status'],
        issue['Epic Link'],
        issue.TaskPoint,
        issue['Current Sprint Start Date'],
        issue['Tiempo Trabajado'],
        issue['Fecha pasaje a PROD'],
        issue.Prioridad,
        issue['Informador:  Name'],
        issue['Estimación de puntos de historia'],
        issue['Parent Link'],
        issue['Ambiente Detectado'],
        issue['Project Key'],
        issue['Fecha pasaje RFC/PRY'],
        issue['Fecha de Inicio'],
        issue['Current Sprint Id (Number)'],
        issue['Time Spent (Incl_ Sub-tasks)'],
        issue.Responsable,
        issue['Issue ID'],
        issue.Resumen,
        issue.Criticidad,
        issue['Remaining Estimate (Incl_ Sub-tasks)'],
        issue['Story Points Completed'],
        issue['Trabajo restante estimado'],
        issue['Criticidad (1)'],
        issue['Parent Issue Key'],
        issue['Project Name'],
        issue['Story Points Remaining'],
        issue.Consultora,
        issue['Current Sprint End Date'],
        issue['Parent Issue Status'],
        issue['StoryPoint Finales'],
        issue['Current Sprint Name'],
        issue['Tipo de Incidencia'],
        issue.BugPoint,
        issue['Original Estimate (Incl_ Sub-tasks)'],
        issue['Esfuerzo Estimado en Horas'],
        issue['Estimación original'],
        issue['Epic Name'],
        issue['Current Status'],
        issue['Story Points']
      ]);
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function processComponents(componentsData) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const component of componentsData) {
      const query = `
        INSERT INTO Components (Component_Name, Clave)
        VALUES ($1, $2)
      `;
      await client.query(query, [component['Component Name'], component.Clave]);
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function processEtiquetas(etiquetasData) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const etiqueta of etiquetasData) {
      const query = `
        INSERT INTO Etiquetas (Etiqueta_Name, Clave)
        VALUES ($1, $2)
      `;
      await client.query(query, [etiqueta.Etiquetas, etiqueta.Clave]);
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function processHistory(historyData) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const history of historyData) {
      const query = `
        INSERT INTO History (
          Clave, Assignee_ID, Assignee_Start, Assignee_End, Assignee_Sequence,
          Time_With_Assignee_Days, Time_With_Assignee_Business_Days,
          Time_With_Assignee_Hours, Time_With_Assignee_Business_Hours,
          Is_Current_Assignee
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `;
      await client.query(query, [
        history.Clave,
        history['History Assignee'],
        history['Assignee start'],
        history['Assignee end'],
        history['Assignee sequence'],
        parseFloat(history['Time with assignee (days)']),
        parseFloat(history['Time with assignee (business days)']),
        parseFloat(history['Time with assignee (hrs)']),
        parseFloat(history['Time with assignee (business hrs)']),
        history['Current assignee?'] === 'Y'
      ]);
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function processLinkedIssues(linkedIssuesData) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const linkedIssue of linkedIssuesData) {
      const query = `
        INSERT INTO Linked_Issues (Source_Issue, Linked_Issue, Link_Type)
        VALUES ($1, $2, $3)
      `;
      await client.query(query, [
        linkedIssue.Clave,
        linkedIssue['Linked Issues: Key'],
        linkedIssue['Linked Issues: Link Type']
      ]);
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function processSprints(sprintsData) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const sprint of sprintsData) {
      const query = `
        INSERT INTO Sprints (Sprint_Id, Sprint_Name, Sprint_Start_Date, Sprint_End_Date)
        VALUES ($1, $2, $3, $4)
      `;
      await client.query(query, [
        sprint['Sprint Id'],
        sprint['Sprint Name'],
        sprint['Sprint Start Date'],
        sprint['Sprint End Date']
      ]);
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function processWorklogs(worklogsData) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const worklog of worklogsData) {
      const query = `
        INSERT INTO Worklogs (Worklog_ID, Clave, Time_Entry_User_ID, Time_Entry_Date, Time_Spent)
        VALUES ($1, $2, $3, $4, $5)
      `;
      await client.query(query, [
        worklog['Worklog ID'],
        worklog.Clave,
        worklog['Time Entry User'],
        worklog['Time Entry Date'],
        parseFloat(worklog['Time Spent'])
      ]);
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function processEpics(issuesData) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Filtrar solo las épicas
    const epics = issuesData.filter(issue => issue['Tipo de Incidencia'] === 'Epic');

    for (const epic of epics) {
      // Verificar si la épica ya existe
      const checkQuery = 'SELECT Clave FROM Epics WHERE Clave = $1';
      const existingEpic = await client.query(checkQuery, [epic.Clave]);

      if (existingEpic.rows.length === 0) {
        // La épica no existe, insertarla
        const query = `
          INSERT INTO Epics (
            id,
            Clave,
            "Current Assignee: Name",
            Resumen,
            "Project Name",
            "Oracle Form",
            "Fecha Estiada Discovery",
            "Fecha fin discovery",
            "Fecha Inicio Estimada",
            "Fecha de inicio",
            "Fecha Estiada en DEV",
            "Fecha imp. En Dev",
            "Fecha Estimada en TEST",
            "Fecha imp. En TEST",
            "Fecha Estimada en UAT",
            "Fecha UAT",
            "Fecha Estimada en PROD",
            "Fecha PROD",
            estado,
            motivo,
            bloqueado_por
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
        `;

        await client.query(query, [
          epic['Issue ID'],
          epic.Clave,
          epic['Current Assignee:  Name'],
          epic.Resumen,
          epic['Project Name'],
          '', // Oracle Form (vacío por ahora)
          '', // Fecha Estiada Discovery
          '', // Fecha fin discovery
          '', // Fecha Inicio Estimada
          '', // Fecha de inicio
          '', // Fecha Estiada en DEV
          '', // Fecha imp. En Dev
          '', // Fecha Estimada en TEST
          '', // Fecha imp. En TEST
          '', // Fecha Estimada en UAT
          '', // Fecha UAT
          '', // Fecha Estimada en PROD
          '',  // Fecha PROD
          epic['Current Status'], // estado
          '', // motivo (vacío por ahora)
          ''  // bloqueado_por (vacío por ahora)
        ]);

        console.log(`Épica insertada: ${epic.Clave}`);
      } else {
        console.log(`Épica ya existe: ${epic.Clave}, omitiendo inserción`);
      }
    }

    await client.query('COMMIT');
    console.log(`Procesamiento de épicas completado. Total procesadas: ${epics.length}`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al procesar épicas:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function processAllData() {
  try {
    console.log('Eliminando datos existentes de todas las tablas...');
    await deleteAllTableData();

    const latestData = await getLatestJsonData();
    for (const entityData of latestData) {
      const { entity_name, json_data } = entityData;
      console.log(`Procesando ${entity_name}...`);
      if (json_data && json_data.length > 0) {
        switch (entity_name) {
          case 'Issues':
            await processIssues(json_data);
            // Procesar épicas después de procesar issues
            await processEpics(json_data);
            break;
          case 'Components':
            await processComponents(json_data);
            break;
          case 'Etiquetas':
            await processEtiquetas(json_data);
            break;
          case 'History':
            await processHistory(json_data);
            break;
          case 'Linked Issues':
            await processLinkedIssues(json_data);
            break;
          case 'Sprints':
            await processSprints(json_data);
            break;
          case 'Worklogs':
            await processWorklogs(json_data);
            break;
          default:
            console.log(`Entidad desconocida: ${entity_name}`);
        }
      } else {
        console.log(`No hay datos para procesar en ${entity_name}`);
      }
    }
    console.log('Todos los datos han sido procesados con éxito.');
  } catch (error) {
    console.error('Error al procesar los datos:', error);
  } finally {
    await pool.end();
  }
}

processAllData();