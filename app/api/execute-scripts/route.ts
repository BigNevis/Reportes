import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

const DB_CONFIG = 'user=postgres host=localhost database=reportes_local password=admin port=5432'

export async function POST() {
  try {
    console.log('Iniciando ejecución de scripts...');

    // Ejecutar powerbi-api.js
    console.log('Ejecutando powerbi-api.js...');
    const { stdout: stdout1, stderr: stderr1 } = await execAsync(`node "${process.cwd()}/powerbi-api.js" "${DB_CONFIG}"`);
    console.log('Salida de powerbi-api.js:', stdout1);
    if (stderr1) console.error('Error en powerbi-api.js:', stderr1);

    // Ejecutar process_json_to_tables.js
    console.log('Ejecutando process_json_to_tables.js...');
    const { stdout: stdout2, stderr: stderr2 } = await execAsync(`node "${process.cwd()}/process_json_to_tables.js" "${DB_CONFIG}"`);
    console.log('Salida de process_json_to_tables.js:', stdout2);
    if (stderr2) console.error('Error en process_json_to_tables.js:', stderr2);

    console.log('Ejecución de scripts completada.');

    return NextResponse.json({ 
      success: true, 
      output: { 
        powerbiApi: stdout1, 
        processJsonToTables: stdout2 
      } 
    })
  } catch (error) {
    console.error('Error al ejecutar los scripts:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

