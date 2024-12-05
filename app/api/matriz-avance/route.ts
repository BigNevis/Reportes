import { NextResponse } from 'next/server';
import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reportes_local',
  password: 'admin',
  port: 5432,
});

export async function GET() {
  try {
    const client = await pool.connect();
    const query = `
      SELECT 
        e.project_key,
        e.resumen AS nombre_epica,
        e.clave AS id_epica,
        COUNT(i.clave) AS cantidad_incidencias,
        SUM(CASE 
            WHEN i.current_status NOT IN ('PRUEBA UAT PROD', 'Cerrado') THEN 1 
            ELSE 0 
        END) AS incidencias_pendientes,

        SUM(CASE WHEN i.current_status = 'Bloqueado por BUG' THEN 1 ELSE 0 END) AS bloqueado_por_bug,
        SUM(CASE WHEN i.current_status IN ('ABIERTO', 'Esperar Recurso') THEN 1 ELSE 0 END) AS no_iniciado,
        SUM(CASE WHEN i.current_status IN ('Entregado', 'En progreso', 'Pendiente de implementar en DEV', 'Pendiente Deploy') THEN 1 ELSE 0 END) AS en_progreso,
        SUM(CASE WHEN i.current_status IN ('Test en DEV', 'Implementado en DEV', 'Pendiente Implementar TEST', 'Deploy en DEV') THEN 1 ELSE 0 END) AS ambiente_dev,
        SUM(CASE WHEN i.current_status IN ('TEST EN TEST', 'IMPLEMENTADO EN TEST', 'Deploy en TEST') THEN 1 ELSE 0 END) AS ambiente_test,
        SUM(CASE WHEN i.current_status IN ('UAT en TEST', 'Prueba de UAT en TEST', 'PENDIENTE UAT EN TEST') THEN 1 ELSE 0 END) AS uat_con_usuarios,
        SUM(CASE WHEN i.current_status = 'PENDIENTE IMPLEMENTAR EN PROD' THEN 1 ELSE 0 END) AS pendiente_implementar_prod,
        SUM(CASE WHEN i.current_status IN ('PRUEBA UAT PROD', 'Cerrado') THEN 1 ELSE 0 END) AS ambiente_prod

      FROM 
        issues e
      LEFT JOIN 
        issues i
      ON 
        e.clave = i.epic_link
      WHERE 
        e.tipo_de_incidencia = 'Epic' 
        AND e.project_key IN ('MAART', 'MASIN') 
        AND i.tipo_de_incidencia IN ('Historia', 'Fuera de Alcance', 'Mejora')
        AND i.current_status != 'Cancelado'
      GROUP BY 
        e.project_key, e.resumen, e.clave
      ORDER BY 
        e.project_key, cantidad_incidencias DESC
    `;

    const result: QueryResult = await client.query(query);
    client.release();

    // Organizar los datos por project_key
    const matrizAvance = result.rows.reduce((acc, row) => {
      if (!acc[row.project_key]) {
        acc[row.project_key] = [];
      }
      acc[row.project_key].push(row);
      return acc;
    }, {});

    return NextResponse.json(matrizAvance);
  } catch (error) {
    console.error('Error fetching matriz de avance:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

