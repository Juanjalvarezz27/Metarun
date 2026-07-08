import { NextResponse } from 'next/server';

export const revalidate = 3600; // Refrescar la caché cada 1 hora

export async function GET() {
  try {
    // Usamos DolarAPI (Oficial)
    // cache: 'no-store' asegura que siempre vaya a buscar el último precio y no se quede pegado en días anteriores
    const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }
    
    const data = await res.json();
    
    return NextResponse.json({
      tasa: data.promedio || data.venta,
      fecha: data.fechaActualizacion
    });
  } catch (error) {
    console.error('Error al contactar DolarAPI:', error);
    return NextResponse.json({ 
      error: 'No se pudo conectar al banco central' 
    }, { status: 500 });
  }
}
