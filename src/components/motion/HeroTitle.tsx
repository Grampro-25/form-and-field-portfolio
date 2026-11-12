"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMotionEnabled } from "./useMotionEnabled";

export default function HeroTitle() {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const enabled = useMotionEnabled();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const firstX = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const secondX = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const rotation = useTransform(scrollYProgress, [0, 1], [-10, 120]);

  return <h1 ref={ref} id="hero-title" className="hero-title hero-title-motion" aria-label="digital, by design.">
    <span className="hero-line-mask" aria-hidden="true"><motion.span className="hero-line-drift" style={{ x: enabled ? firstX : 0 }}><motion.span className="hero-line-enter" initial={reduced ? false : { y: "115%", rotate: 3 }} animate={{ y: "0%", rotate: 0 }} transition={{ duration: 1.15, ease: [.22, 1, .36, 1] }}>digital,</motion.span></motion.span></span>
    <span className="hero-line-mask" aria-hidden="true"><motion.span className="hero-line-drift" style={{ x: enabled ? secondX : 0 }}><motion.span className="hero-line-enter" initial={reduced ? false : { y: "115%", rotate: 3 }} animate={{ y: "0%", rotate: 0 }} transition={{ delay: .12, duration: 1.15, ease: [.22, 1, .36, 1] }}>by design<span className="hero-period">.</span><motion.span className="hero-flower" style={{ rotate: enabled ? rotation : -10 }}>✳</motion.span></motion.span></motion.span></span>
  </h1>;
}
