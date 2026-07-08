import { NextResponse } from 'next/server';

export const revalidate = 3600; // Refrescar la caché cada 1 hora

export async function GET() {
  try {
    const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
      next: { revalidate: 3600 } // ISR Cache por 1 hora para no saturar
    });
    
    if (!res.ok) {
      throw new Error('Error al obtener la tasa');
    }
    
    const data = await res.json();
    return NextResponse.json({
      tasa: data.promedio || data.venta, // La API suele devolver el valor en 'promedio' o 'venta'
      fecha: data.fechaActualizacion
    });
  } catch (error) {
    console.error('Error BCV:', error);
    // Tasa de fallback por seguridad si falla la API
    return NextResponse.json({ tasa: 36.50, fallback: true }, { status: 500 });
  }
}
