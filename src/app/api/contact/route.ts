import { Resend } from 'resend';
import { NextRequest } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'ahmadi@neoskop.de';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, phone, company, projectType, message } = body;

  const { error } = await resend.emails.send({
    from: 'Airflow Kontaktformular <onboarding@resend.dev>',
    to: TO_EMAIL,
    replyTo: email,
    subject: `Neue Anfrage: ${projectType} – ${name}`,
    html: `
      <h2>Neue Kontaktanfrage</h2>
      <table cellpadding="8" style="border-collapse:collapse;width:100%">
        <tr><td><strong>Name</strong></td><td>${name}</td></tr>
        <tr><td><strong>E-Mail</strong></td><td>${email}</td></tr>
        <tr><td><strong>Telefon</strong></td><td>${phone}</td></tr>
        ${company ? `<tr><td><strong>Firma</strong></td><td>${company}</td></tr>` : ''}
        <tr><td><strong>Projekttyp</strong></td><td>${projectType}</td></tr>
        <tr><td><strong>Nachricht</strong></td><td>${message}</td></tr>
      </table>
    `,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
