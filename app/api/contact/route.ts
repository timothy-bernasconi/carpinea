import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Limitation simple par IP (en mémoire) : 5 demandes par tranche de 10 minutes.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now(), win = 10 * 60 * 1000;
  const list = (hits.get(ip) ?? []).filter((t) => now - t < win);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < win)) hits.delete(k);
  return list.length > 5;
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "inconnue";
  if (limited(ip)) return NextResponse.json({ ok: false }, { status: 429 });
  let d: Record<string, unknown>;
  try { d = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const s = (k: string) => String(d[k] ?? "").trim().slice(0, 3000);
  if (s("website")) return NextResponse.json({ ok: true }); // robot : on fait comme si, sans rien envoyer
  if (!s("prenom") || !s("nom") || !s("tel") || !RE.test(s("email")) || d.consent !== true) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const pieces = Array.isArray(d.pieces) ? d.pieces.map(String).join(", ") : "";
  const budget = Number(d.budget);
  const rows: [string, string][] = [
    ["Civilité", s("civilite")],
    ["Prénom", s("prenom")],
    ["Nom", s("nom")],
    ["E-mail", s("email")],
    ["Téléphone", s("tel")],
    ["Localité", s("localite")],
    ["Type de bien", s("type")],
    ["Nombre de pièces", pieces],
    ["Budget maximum", Number.isFinite(budget) ? `CHF ${budget.toLocaleString("fr-CH")}` : ""],
    ["Message", s("message")],
    ["Souhaite recevoir des informations", d.infos ? "Oui" : "Non"],
  ];
  const text = rows.map(([k, v]) => `${k} : ${v || "-"}`).join("\n");
  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td style="color:#777;vertical-align:top">${esc(k)}</td><td>${esc(v || "-").replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "villas-carpinea@rosset.ch";
  const from = process.env.CONTACT_FROM || "Villas Carpinea <onboarding@resend.dev>";

  if (!apiKey) {
    // En local sans clé : on journalise la demande au lieu de l'envoyer.
    console.warn("RESEND_API_KEY absente : demande non envoyée.\n" + text);
    return NextResponse.json({ ok: process.env.NODE_ENV !== "production" }, { status: process.env.NODE_ENV !== "production" ? 200 : 500 });
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from, to: [to], reply_to: s("email"),
        subject: `Villas Carpinea : demande de ${s("prenom")} ${s("nom")}`,
        text, html,
      }),
    });
    if (!r.ok) {
      console.error("Resend a refusé l’envoi :", r.status, await r.text());
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Échec de l’envoi :", e);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
