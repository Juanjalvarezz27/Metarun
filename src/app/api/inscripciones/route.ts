import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import nodemailer from 'nodemailer';

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

    // Enviar correo de confirmación con máximas optimizaciones anti-spam
    try {
      if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        });

        // Generar un Message-ID único basado en el dominio de Gmail
        const messageId = `<${Date.now()}.${Math.random().toString(36).slice(2)}@gmail.com>`;

        const mailOptions = {
          from: `MetaRun <${process.env.GMAIL_USER}>`,
          to: body.correo,
          replyTo: process.env.GMAIL_USER,
          subject: 'Confirmacion de inscripcion - MetaRun',
          messageId: messageId,
          headers: {
            'X-Mailer': 'MetaRun-App',
            'X-Priority': '3',
            'Precedence': 'bulk',
            'List-Unsubscribe': `<mailto:${process.env.GMAIL_USER}?subject=unsubscribe>`,
          },

          text: [
            `Hola ${body.nombreCompleto},`,
            '',
            'Tu inscripcion en MetaRun ha sido registrada exitosamente.',
            `Modalidad: ${body.modalidad}`,
            'Estado: Aprobada',
            '',
            'Ya formas parte oficial de la carrera. Nos comunicaremos contigo cuando se acerque el dia del evento.',
            '',
            'Gracias por inscribirte.',
            'El equipo de MetaRun Venezuela',
          ].join('\n'),
          html: `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">

<!-- Contenedor Principal -->
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#ffffff;border-radius:12px;overflow:hidden;">

  <!-- Barra Naranja Superior con Logo -->
  <tr>
    <td style="background-color:#ea4a22;padding:28px 24px;text-align:center;">
      <img src="cid:logo_metarun" alt="MetaRun" width="72" height="72" style="display:block;margin:0 auto 12px;border-radius:50%;border:3px solid rgba(255,255,255,0.3);" />
      <h1 style="color:#ffffff;font-size:20px;margin:0;font-weight:700;letter-spacing:-0.5px;">MetaRun Venezuela</h1>
    </td>
  </tr>

  <!-- Saludo -->
  <tr>
    <td style="padding:28px 28px 0;">
      <p style="font-size:16px;color:#111827;margin:0 0 6px;font-weight:700;">Hola ${body.nombreCompleto},</p>
      <p style="font-size:14px;color:#6b7280;margin:0;line-height:1.6;">Tu inscripcion ha sido registrada exitosamente. Ya formas parte oficial de la carrera.</p>
    </td>
  </tr>

  <!-- Tarjeta de Estado -->
  <tr>
    <td style="padding:20px 28px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;">
        <tr>
          <td style="padding:20px;text-align:center;">
            <p style="margin:0 0 4px;font-size:11px;color:#16a34a;text-transform:uppercase;font-weight:700;letter-spacing:1.5px;">Estado</p>
            <p style="margin:0;font-size:22px;color:#15803d;font-weight:800;">Inscripcion Aprobada</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Detalles del corredor -->
  <tr>
    <td style="padding:0 28px 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fafafa;border-radius:10px;border:1px solid #f0f0f0;">
        <tr>
          <td style="padding:16px 20px;border-bottom:1px solid #f0f0f0;">
            <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;font-weight:600;letter-spacing:1px;">Corredor</p>
            <p style="margin:4px 0 0;font-size:15px;color:#111827;font-weight:600;">${body.nombreCompleto}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 20px;border-bottom:1px solid #f0f0f0;">
            <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;font-weight:600;letter-spacing:1px;">Modalidad</p>
            <p style="margin:4px 0 0;font-size:15px;color:#111827;font-weight:600;">${body.modalidad}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 20px;">
            <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;font-weight:600;letter-spacing:1px;">Cedula</p>
            <p style="margin:4px 0 0;font-size:15px;color:#111827;font-weight:600;">V-${body.cedula}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Mensaje Final -->
  <tr>
    <td style="padding:0 28px 24px;">
      <p style="font-size:13px;color:#6b7280;line-height:1.6;margin:0;">Nos comunicaremos contigo cuando se acerque el dia del evento. Mientras tanto, preparate para dar lo mejor de ti.</p>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background-color:#fafafa;padding:20px 28px;border-top:1px solid #f0f0f0;text-align:center;">
      <p style="margin:0 0 4px;font-size:13px;color:#6b7280;font-weight:600;">MetaRun Venezuela</p>
      <p style="margin:0;font-size:11px;color:#9ca3af;">Este correo fue enviado a ${body.correo}</p>
    </td>
  </tr>

</table>
</td></tr>
</table>

</body>
</html>`
        };

        await transporter.sendMail(mailOptions);
        console.log("Correo de confirmacion enviado exitosamente.");
      } else {
        console.log("Aviso: No se configuraron GMAIL_USER y GMAIL_PASS.");
      }
    } catch (emailError) {
      console.error("Error enviando el correo:", emailError);
    }

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
