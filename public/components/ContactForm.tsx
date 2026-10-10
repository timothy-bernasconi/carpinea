"use client";
import { useState, type FormEvent } from "react";

const MSG = {
  required: "Merci de compléter ce champ.",
  email: "Merci d’indiquer une adresse e-mail valide.",
  ok: "Votre demande a bien été transmise à notre équipe.",
  error: "Votre demande n’a pas pu être envoyée. Merci de réessayer ou de nous contacter directement.",
};
const RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const chf = (n: number) => `CHF ${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "’")}.-`;

type Status = "idle" | "sending" | "ok" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [budget, setBudget] = useState(3500000);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const err: Record<string, string> = {};
    ["prenom", "nom", "email", "tel"].forEach((k) => { if (!v(k)) err[k] = MSG.required; });
    if (v("email") && !RE.test(v("email"))) err.email = MSG.email;
    if (!fd.get("consent")) err.consent = MSG.required;
    setErrors(err);
    if (Object.keys(err).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          civilite: v("civilite"), prenom: v("prenom"), nom: v("nom"), email: v("email"), tel: v("tel"),
          localite: v("localite"), type: v("type"), pieces: fd.getAll("pieces"), budget,
          message: v("message"), infos: !!fd.get("infos"), consent: true,
        }),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) { form.reset(); setBudget(3500000); }
    } catch {
      setStatus("error");
    }
  }

  const field = (name: string, label: string, type = "text", required = false) => (
    <div className="field">
      <label htmlFor={name}>{label}{required && " *"}</label>
      <input id={name} name={name} type={type} aria-invalid={!!errors[name]} />
      {errors[name] && <span className="err">{errors[name]}</span>}
    </div>
  );

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <fieldset className="inline">
        <legend className="sr">Civilité</legend>
        <label><input type="radio" name="civilite" value="Madame" /> Madame</label>
        <label><input type="radio" name="civilite" value="Monsieur" /> Monsieur</label>
      </fieldset>
      <div className="row">{field("prenom", "Prénom", "text", true)}{field("nom", "Nom", "text", true)}</div>
      <div className="row">{field("email", "Email", "email", true)}{field("tel", "Téléphone", "tel", true)}</div>
      <div className="row">{field("localite", "Localité recherchée")}{field("type", "Type de bien")}</div>
      <fieldset className="inline">
        <legend>Nombre de pièces</legend>
        {["4 pièces", "5 pièces", "6 pièces et +"].map((p) => (
          <label key={p}><input type="checkbox" name="pieces" value={p} /> {p}</label>
        ))}
      </fieldset>
      <div className="field">
        <label htmlFor="budget">Budget max : <span className="budget">{chf(budget)}</span></label>
        <input id="budget" type="range" min={1000000} max={3500000} step={50000} value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
      </div>
      <div className="field">
        <label htmlFor="message">Votre message</label>
        <textarea id="message" name="message" rows={4} />
      </div>
      <label className="check"><input type="checkbox" name="infos" /> Je souhaite recevoir des informations sur des projets similaires.</label>
      <div>
        <label className="check"><input type="checkbox" name="consent" /> En cochant cette case, j’autorise Rosset à traiter mes données personnelles dans le cadre de ma demande, conformément à la politique de confidentialité *</label>
        {errors.consent && <span className="err">{errors.consent}</span>}
      </div>
      <p className="note">* champs obligatoires</p>
      <button type="submit" disabled={status === "sending"}>Envoyer</button>
      <p role="status" className={`status ${status}`}>{status === "ok" ? MSG.ok : status === "error" ? MSG.error : ""}</p>
    </form>
  );
}
