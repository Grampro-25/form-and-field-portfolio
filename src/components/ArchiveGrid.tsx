"use client";
import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { archive } from "@/data/portfolio";
import Modal from "./Modal";
import ProjectPreview from "./ProjectPreview";

export default function ArchiveGrid() {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const selected = index === null ? null : archive[index];
  return <section id="archive" className="archive-section section-wrap"><div className="section-heading"><h2><span className="section-mark">↳</span> The archive <sup>(12)</sup></h2><span>A curated selection of web experiments<br /><span className="muted">& UI explorations. 2024 — 2026</span></span></div>
    <div className="archive-intro"><p>A place for the ideas<br />that keep me curious.</p><span className="muted">Studies in type, interaction, and the space between.<br />A little less polished. A little more playful.</span></div>
    <div className="archive-grid">{archive.map((item, i) => <button key={item.id} className={`archive-item archive-position-${i % 6}`} onClick={() => setIndex(i)} aria-label={`Inspect ${item.title}`}><div className="archive-art"><ProjectPreview theme={item.theme} image={item.image} alt={item.alt} compact variation={item.variation} /><span className="archive-open"><ArrowUpRight size={20} strokeWidth={1.25} /></span></div><span className="archive-caption"><span>{item.title}</span><span className="muted">{item.category}</span></span></button>)}</div>
    <AnimatePresence>{selected && <Modal label={`${selected.title} archive preview`} onClose={close} className="archive-modal"><div className="lightbox-top"><span>{selected.title} <span className="muted">/ {selected.category}, {selected.year}</span></span><button className="icon-button" aria-label="Close archive preview" onClick={close}><X strokeWidth={1.25} /></button></div><ProjectPreview theme={selected.theme} image={selected.image} alt={selected.alt} variation={selected.variation} /><div className="lightbox-bottom"><button className="text-link" onClick={() => setIndex(i => ((i ?? 0) - 1 + archive.length) % archive.length)}><ArrowLeft size={18} />Previous</button><span className="muted" aria-live="polite">{(index ?? 0) + 1} / {archive.length} · Concept exploration</span><button className="text-link" onClick={() => setIndex(i => ((i ?? 0) + 1) % archive.length)}>Next<ArrowRight size={18} /></button></div></Modal>}</AnimatePresence>
  </section>;
}
