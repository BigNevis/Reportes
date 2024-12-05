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
        COUNT(*) AS total_issues,
        SUM(CASE WHEN current_status IN ('PRUEBA UAT PROD', 'Cerrado') THEN 1 ELSE 0 END) AS completed_issues,
        project_key 
      FROM issues
      WHERE project_key IN ('MASIN','MAART') 
        AND tipo_de_incidencia IN ('Historia','Fuera de Alcance','Mejora') 
        AND current_status <> 'Cancelado' 
      GROUP BY project_key
    `;

    const result: QueryResult = await client.query(query);
    client.release();

    const projectData = result.rows.reduce((acc, row) => {
      const completion_percentage = row.total_issues > 0 
        ? (row.completed_issues / row.total_issues) * 100 
        : 0;
      
      acc[row.project_key] = {
        total_issues: parseInt(row.total_issues),
        completed_issues: parseInt(row.completed_issues),
        completion_percentage
      };
      return acc;
    }, {});

    return NextResponse.json(projectData);
  } catch (error) {
    console.error('Error fetching project progress:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
