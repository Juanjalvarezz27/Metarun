import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Verificación básica: Evitar que una misma cédula se registre dos veces
    if (body.cedula) {
      const existeCedula = await prisma.inscripcion.findUnique({
        where: { cedula: body.cedula },
      });

      if (existeCedula) {
        return NextResponse.json(
          { error: 'Esta cédula ya se encuentra registrada en la carrera.' },
          { status: 400 }
        );
      }
    }

    // Insertar en la BD
    const nuevaInscripcion = await prisma.inscripcion.create({
      data: {
        nombreCompleto: body.nombreCompleto,
        cedula: body.cedula,
        correo: body.correo,
        genero: body.genero,
        fechaNacimiento: body.fechaNacimiento,
        telefono: body.telefono,
        modalidad: body.modalidad,
        club: body.club || null,
        referenciaPago: body.referenciaPago,
        bancoEmisor: body.bancoEmisor,
        telefonoPago: body.telefonoPago,
        captureUrl: body.captureUrl,
      },
    });

    return NextResponse.json(
      { message: 'Inscripción registrada con éxito', inscripcion: nuevaInscripcion },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error al registrar inscripción:', error);
    return NextResponse.json(
      { error: 'Hubo un error en el servidor al intentar registrarte. Intenta de nuevo.' },
      { status: 500 }
    );
  }
}
