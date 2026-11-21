import { NextResponse } from "next/server";

/**
 * POST /api/contact — delivers the contact form to your inbox via Resend (https://resend.com).
 * Required env: RESEND_API_KEY. Optional: CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (see .env.example).
 */

const TO = process.env.CONTACT_TO_EMAIL ?? "nattawat140947@gmail.com";
const FROM = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 100, email: 200, subject: 120, message: 5000 } as const;

// Best-effort rate limit (per serverless instance): 5 messages / 10 min per IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled → pretend success so bots learn nothing.
  if (str(body.company)) return NextResponse.json({ ok: true });

  const name = str(body.name);
  const email = str(body.email);
  const subject = str(body.subject);
  const message = str(body.message);

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Please fill in every field." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json({ error: "Your message is a little short — add a few more details." }, { status: 400 });
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message
  ) {
    return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages — please try again in a few minutes." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "The contact form isn't configured yet. Please email me directly." },
      { status: 503 },
    );
  }

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#0f172a;max-width:600px">
      <h2 style="margin:0 0 16px">New message from your portfolio</h2>
      <table style="border-collapse:collapse;margin-bottom:16px">
        <tr><td style="padding:4px 16px 4px 0;color:#64748b">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#64748b">Email</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#64748b">Topic</td><td>${escapeHtml(subject)}</td></tr>
      </table>
      <div style="white-space:pre-wrap;border-top:1px solid #e2e8f0;padding-top:16px">${escapeHtml(message)}</div>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `[Portfolio] ${subject} — ${name}`,
        html,
        text: `Name: ${name}\nEmail: ${email}\nTopic: ${subject}\n\n${message}`,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      return NextResponse.json({ error: "Email service error. Please try again or email me directly." }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] Network error", err);
    return NextResponse.json({ error: "Network error. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
