import { NextResponse } from "next/server";

const RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// TODO : brancher l'envoi (Resend, SMTP...) vers villas-carpinea@rosset.ch
export async function POST(req: Request) {
  let d: Record<string, unknown>;
  try { d = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const s = (k: string) => String(d[k] ?? "").trim();
  if (!s("prenom") || !s("nom") || !s("tel") || !RE.test(s("email")) || d.consent !== true) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  console.log("Demande de contact :", d);
  return NextResponse.json({ ok: true });
}
