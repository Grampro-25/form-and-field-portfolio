"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";

interface Props { children: ReactNode; onClose: () => void; label: string; className?: string; drawer?: boolean; id?: string }
export default function Modal({ children, onClose, label, className = "", drawer = false, id }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const roundedMenu = id === "menu-overlay";
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    const root = document.getElementById("site-content");
    document.body.style.overflow = "hidden";
    root?.setAttribute("inert", "");
    const focusable = () => Array.from(ref.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select,[tabindex="0"]') || []).filter(el => el.getClientRects().length > 0);
    (focusable()[0] || ref.current)?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); }
      if (event.key !== "Tab") return;
      const nodes = focusable();
      const first = nodes[0]; const last = nodes[nodes.length - 1];
      if (!first) { event.preventDefault(); ref.current?.focus(); return; }
      if (event.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
      document.body.style.overflow = overflow;
      root?.removeAttribute("inert");
      previous?.focus();
    };
  }, [onClose]);
  return createPortal(<motion.div className="modal-backdrop" data-lenis-prevent initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .25 }} onClick={onClose}>
    <motion.div id={id} ref={ref} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} data-lenis-prevent className={`modal-panel ${className}`} onClick={e => e.stopPropagation()}
      initial={roundedMenu ? { clipPath: reduce ? "inset(0% 0% 0% 0% round 0px)" : "inset(0% 0% 100% 0% round 0px 0px 200px 200px)" } : drawer ? { x: reduce ? 0 : "100%" } : { opacity: 0, y: reduce ? 0 : 24 }} animate={{ x: 0, opacity: 1, y: 0, ...(roundedMenu ? { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)" } : {}) }} exit={roundedMenu ? { clipPath: reduce ? "inset(0% 0% 0% 0% round 0px)" : "inset(0% 0% 100% 0% round 0px 0px 200px 200px)" } : drawer ? { x: reduce ? 0 : "100%" } : { opacity: 0, y: reduce ? 0 : 16 }} transition={{ duration: reduce ? 0 : roundedMenu ? .85 : .45, ease: [.76, 0, .24, 1] }}>
      {children}
    </motion.div>
  </motion.div>, document.body);
}
