import { Resend } from 'resend';
import { NextRequest } from 'next/server';
import { contactSchema } from '@/lib/contactSchema';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'ahmadi@neoskop.de';

// Rate limiting: max 3 requests per IP per 10 minutes
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const ipStore = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipStore.get(ip);

  if (!entry || now > entry.resetAt) {
    ipStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count++;
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (isRateLimited(ip)) {
    return Response.json(
      { error: 'Zu viele Anfragen. Bitte warte 10 Minuten.' },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return Response.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Ungültige Formulardaten.' }, { status: 422 });
  }

  const { name, email, phone, company, projectType, message } = parsed.data;

  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;font-weight:600;background:#f5f5f5;width:140px">${label}</td><td style="padding:8px 12px">${escapeHtml(value)}</td></tr>`;

  const { error } = await resend.emails.send({
    from: 'Airflow Kontaktformular <onboarding@resend.dev>',
    to: TO_EMAIL,
    replyTo: email,
    subject: `Neue Anfrage: ${escapeHtml(projectType)} – ${escapeHtml(name)}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="background:#0f172a;color:#fff;padding:20px 24px;margin:0">Neue Kontaktanfrage</h2>
        <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0">
          ${row('Name', name)}
          ${row('E-Mail', email)}
          ${row('Telefon', phone)}
          ${company ? row('Firma', company) : ''}
          ${row('Projekttyp', projectType)}
          <tr>
            <td style="padding:8px 12px;font-weight:600;background:#f5f5f5;vertical-align:top">Nachricht</td>
            <td style="padding:8px 12px;white-space:pre-wrap">${escapeHtml(message)}</td>
          </tr>
        </table>
        <p style="color:#94a3b8;font-size:12px;padding:16px">Diese E-Mail wurde über das Kontaktformular auf airflowsystem.ir gesendet.</p>
      </div>
    `,
  });

  if (error) {
    return Response.json({ error: 'E-Mail konnte nicht gesendet werden.' }, { status: 500 });
  }

  return Response.json({ ok: true });
}
