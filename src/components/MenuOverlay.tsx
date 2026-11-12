"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Modal from "./Modal";
import { studio } from "@/data/portfolio";
import RollingText from "./motion/RollingText";

export default function MenuOverlay({ onClose, onContact }: { onClose: () => void; onContact: () => void }) {
  const reduce = useReducedMotion();
  return <Modal id="menu-overlay" label="Navigation" onClose={onClose} className="menu-overlay">
    <div className="overlay-top"><span className="wordmark">{studio.name}<span aria-hidden="true"> ✳</span></span><button className="text-link" onClick={onClose}>Close <X size={20} strokeWidth={1.25} /></button></div>
    <nav aria-label="Overlay navigation" className="large-nav">{["Cases", "Archive", "About", "Contact"].map((label, i) => <motion.div key={label} initial={{ y: reduce ? 0 : 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: reduce ? 0 : .18 + i * .075, duration: reduce ? 0 : .7, ease: [.22, 1, .36, 1] }}><span className="nav-number">0{i + 1}</span>{label === "Contact" ? <button onClick={onContact}><RollingText text={label} /><ArrowUpRight strokeWidth={1} /></button> : <a href={`#${label.toLowerCase()}`} onClick={onClose}><RollingText text={label} /><ArrowUpRight strokeWidth={1} /></a>}</motion.div>)}</nav>
    <div className="overlay-bottom"><span>Independent by nature.<br />Considered by design.</span><span>{studio.location}<br />Working everywhere.</span></div>
  </Modal>;
}
