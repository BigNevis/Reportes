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
      FROM public.epics 
      ORDER BY "Fecha Estiada Discovery" ASC NULLS LAST
    `);
    client.release();
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error al obtener épicas:', error);
    return NextResponse.json({ error: 'Error al obtener épicas' }, { status: 500 });
  }
}

