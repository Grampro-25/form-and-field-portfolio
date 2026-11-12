"use client";
import { useState, useCallback, useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import ProjectPreview from "./ProjectPreview";
import Modal from "./Modal";
import { useMotionEnabled } from "./motion/useMotionEnabled";

/** StickySections-inspired scroll contraction, measured against a stable track. */
function CaseStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useMotionEnabled();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.14", "end 0.14"] });
  const scale = useTransform(scrollYProgress, [0, .35, 1], [1, 1, .92]);
  const y = useTransform(scrollYProgress, [0, .35, 1], [0, 0, -32]);
  const rotateX = useTransform(scrollYProgress, [0, .35, 1], [0, 0, -4]);

  return <div ref={ref} className={`case-stage ${enabled ? "case-stage-enabled" : ""}`}><motion.div className="case-scroll-card" style={{ scale: enabled ? scale : 1, y: enabled ? y : 0, rotateX: enabled ? rotateX : 0 }}>{children}</motion.div></div>;
}

export default function SelectedCases({ onContact }: { onContact: () => void }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 25 }); const sy = useSpring(y, { stiffness: 250, damping: 25 });
  return <section id="cases" className="cases-section section-wrap">
    <div className="section-heading"><h2><span className="section-mark">↳</span> Selected work <sup>(04)</sup></h2><span>A few things, thoughtfully made.<br /><span className="muted">2025 — 2026</span></span></div>
    <div className="project-list">{projects.map((project, i) => <CaseStage key={project.id}><article className="case-item">
      <button className="case-preview" aria-label={`View ${project.title} case study`} onClick={() => setSelected(project)} onPointerEnter={() => setHover(project.id)} onPointerLeave={() => setHover(null)} onPointerMove={e => { const r = e.currentTarget.getBoundingClientRect(); x.set(e.clientX - r.left); y.set(e.clientY - r.top); }}>
        <ProjectPreview theme={project.theme} image={project.image} alt={project.alt} priority={i === 0} />
        {hover === project.id && <motion.span style={{ left: sx, top: sy }} className="case-cursor">View case<ArrowUpRight size={17} strokeWidth={1.25} /></motion.span>}
        <span className="mobile-case-link"><ArrowUpRight size={20} strokeWidth={1.25} /></span>
      </button>
      <div className="case-info"><span className="case-index">0{i + 1}</span><div><button className="case-title text-link" onClick={() => setSelected(project)}>{project.title}<ArrowUpRight size={20} strokeWidth={1.25} /></button><p>{project.subtitle}</p></div><div className="case-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="case-year">{project.year}</span></div>
    </article></CaseStage>)}</div>
    <div className="cases-end"><span>There’s more where that came from.</span><a href="#archive" className="text-link">Explore the archive <ArrowUpRight size={16} strokeWidth={1.25} /></a></div>
    <AnimatePresence>{selected && <Modal label={`${selected.title} case study`} onClose={close} className="case-modal"><div className="lightbox-top"><span>{selected.title} / Concept project</span><button className="icon-button" aria-label="Close case study" onClick={close}><X strokeWidth={1.25} /></button></div><ProjectPreview theme={selected.theme} image={selected.image} alt={selected.alt} /><div className="case-detail"><div><span className="muted">{selected.year} / {selected.tags.join(" + ")}</span><h2>{selected.subtitle}</h2><p>{selected.description}</p></div><div><h3>The approach</h3><p>{selected.approach}</p><ul>{selected.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div></div><button className="primary-button" onClick={() => { setSelected(null); onContact(); }}>Let’s make something together <ArrowUpRight size={18} /></button></Modal>}</AnimatePresence>
  </section>;
}
