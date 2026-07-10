import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, dorsal } = body;

    if (!id) {
      return NextResponse.json({ error: 'Falta el ID del corredor' }, { status: 400 });
    }

    // Si dorsal es un string vacío, lo trataremos como null (quitar dorsal)
    const finalDorsal = dorsal && dorsal.trim() !== '' ? dorsal.trim() : null;

    // Verificar si el dorsal ya existe (solo si no es null)
    if (finalDorsal) {
      const existing = await prisma.inscripcion.findFirst({
        where: {
          dorsal: finalDorsal,
          id: { not: id } // No chocar consigo mismo
        }
      });

      if (existing) {
        return NextResponse.json(
          { error: `El dorsal ${finalDorsal} ya está asignado a ${existing.nombreCompleto}` },
          { status: 400 }
        );
      }
    }

    const updatedInscripcion = await prisma.inscripcion.update({
      where: { id },
      data: { dorsal: finalDorsal }
    });

    return NextResponse.json({ success: true, data: updatedInscripcion });

  } catch (error: any) {
    console.error('Error actualizando dorsal:', error);
    return NextResponse.json({ error: 'Error interno del servidor al actualizar el dorsal' }, { status: 500 });
  }
}
