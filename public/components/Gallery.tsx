"use client";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/lib/photos";

const POPUP_DELAY = 12000; // ms après l'ouverture de la lightbox, une seule fois par session

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [popup, setPopup] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const n = photos.length;
  const isOpen = open !== null;

  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + n) % n)), [n]);
  const close = useCallback(() => {
    setOpen(null);
    setPopup(false);
    lastFocus.current?.focus();
  }, []);

  // Clavier + blocage du scroll
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (popup) { if (e.key === "Escape") setPopup(false); return; }
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, popup, go, close]);

  // Popup « Ce projet vous plaît ? » : une fois par session
  useEffect(() => {
    if (!isOpen) return;
    try { if (sessionStorage.getItem("carpinea-offer")) return; } catch {}
    const t = setTimeout(() => {
      setPopup(true);
      try { sessionStorage.setItem("carpinea-offer", "1"); } catch {}
    }, POPUP_DELAY);
    return () => clearTimeout(t);
  }, [isOpen]);

  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  return (
    <>
      <div className="gal">
        {photos.map((p, i) => (
          <figure key={p.src} className={`gal-item g${i % 4}`}>
            <button
              type="button"
              aria-label={`Agrandir : ${p.alt}`}
              onClick={(e) => { lastFocus.current = e.currentTarget; setOpen(i); }}
            >
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 700px) 100vw, 60vw" />
            </button>
          </figure>
        ))}
      </div>

      {isOpen && (
        <div
          className="lb" role="dialog" aria-modal="true" aria-label="Galerie photos"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={onTouchEnd}
        >
          <button ref={closeRef} className="lb-btn lb-close" aria-label="Fermer"
            onClick={(e) => { e.stopPropagation(); close(); }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1"><path d="M3 3l16 16M19 3L3 19" /></svg>
          </button>
          <button className="lb-btn lb-prev" aria-label="Photo précédente"
            onClick={(e) => { e.stopPropagation(); go(-1); }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1"><path d="M16 4L7 13l9 9" /></svg>
          </button>
          <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
            <Image key={open} className="lb-img" src={photos[open].src} alt={photos[open].alt} fill sizes="100vw" priority />
          </div>
          <button className="lb-btn lb-next" aria-label="Photo suivante"
            onClick={(e) => { e.stopPropagation(); go(1); }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1"><path d="M10 4l9 9-9 9" /></svg>
          </button>
          <p className="lb-count">{open + 1} / {n}</p>

          {popup && (
            <aside className="offer" role="alertdialog" aria-labelledby="offer-title" onClick={(e) => e.stopPropagation()}>
              <button className="offer-x" aria-label="Fermer" onClick={() => setPopup(false)}>
                <svg width="16" height="16" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 3l16 16M19 3L3 19" /></svg>
              </button>
              <h3 id="offer-title">Ce projet vous plaît ?</h3>
              <p>Notre équipe vente répond volontiers à vos questions.</p>
              <Link href="/contact" className="offer-cta" onClick={close}>Prendre contact</Link>
            </aside>
          )}
        </div>
      )}
    </>
  );
}
