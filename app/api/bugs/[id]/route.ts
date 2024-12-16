import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL
});

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { prioridad, comentarios, estimacion, comentarios_qa } = await request.json();

  const client = await pool.connect();

  try {
    // Primero, verificamos si la clave existe
    const checkResult = await client.query(
      'SELECT * FROM Issues_Data WHERE clave = $1',
      [id]
    );

    let result;
    if (checkResult.rows.length === 0) {
      // Si no existe, creamos un nuevo registro
      result = await client.query(
        `INSERT INTO Issues_Data (clave, prioridad, comentarios, estimacion, comentarios_qa)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [id, prioridad, comentarios, estimacion, comentarios_qa]
      );
    } else {
      // Si existe, actualizamos el registro
      result = await client.query(
        `UPDATE Issues_Data
         SET 
           prioridad = $2,
           comentarios = $3,
           estimacion = $4,
           comentarios_qa = $5
         WHERE clave = $1
         RETURNING *`,
        [id, prioridad, comentarios, estimacion, comentarios_qa]
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar/crear bug:', error);
    return NextResponse.json({ error: 'Error al actualizar/crear bug' }, { status: 500 });
  } finally {
    client.release();
  }
}

