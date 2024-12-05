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
        e.resumen AS nombre_epica,
        COUNT(i.clave) AS cantidad_incidencias,
        SUM(CASE 
            WHEN i.current_status NOT IN ('PRUEBA UAT PROD', 'Cerrado') THEN 1 
            ELSE 0 
        END) AS incidencias_pendientes,
        ROUND(
            (1 - COALESCE(SUM(CASE 
                              WHEN i.current_status NOT IN ('PRUEBA UAT PROD', 'Cerrado') THEN 1 
                              ELSE 0 
                          END)::NUMERIC / 
                      NULLIF(COUNT(i.clave), 0), 0)) * 100, 
            2
        ) AS porcentaje_avance
      FROM 
        issues e
      LEFT JOIN 
        issues i
      ON 
        e.clave = i.epic_link
      WHERE 
        e.tipo_de_incidencia = 'Epic' 
        AND e.project_key IN ('MAART','MASIN') 
        AND i.tipo_de_incidencia IN ('Historia', 'Fuera de Alcance', 'Mejora')
        AND i.current_status != 'Cancelado'
      GROUP BY 
        e.resumen
      HAVING
        COUNT(i.clave) > 0
      ORDER BY 
        cantidad_incidencias DESC
    `;

    const result = await client.query(query);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'No se encontraron datos' }, { status: 404 });
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching epics progress:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

