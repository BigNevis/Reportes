import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL
});

export async function GET() {
  try {
    const client = await pool.connect();
    const { rows } = await client.query(`
SELECT 
  issue,
  summary,
  status,
  "Issue Type",
  "Project Key",
  epic,
  "Epic name",
  "Parent link",
  assignee,
  creator,
  Prioridad,
  Comentarios,
  Estimacion,
  Comentarios_QA
FROM vw_issues_epics
WHERE status NOT IN ('Cancelado')
ORDER BY prioridad, issue ASC
    `);
    client.release();
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error al obtener bugs:', error);
    return NextResponse.json({ error: 'Error al obtener bugs' }, { status: 500 });
  }
}

