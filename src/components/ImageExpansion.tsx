"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMotionEnabled } from "./motion/useMotionEnabled";
import { motionInterlude } from "@/data/portfolio";

/** Scroll-driven image/text separation adapted from ImageExpansionTypography. */
export default function ImageExpansion() {
  const ref = useRef<HTMLElement>(null);
  const enabled = useMotionEnabled();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const clipPath = useTransform(scrollYProgress, [0, .72, 1], ["inset(31% 35% 31% 35% round 160px)", "inset(0% 0% 0% 0% round 0px)", "inset(0% 0% 0% 0% round 0px)"]);
  const scale = useTransform(scrollYProgress, [0, .85], [1.3, 1]);
  const topY = useTransform(scrollYProgress, [0, .7], [0, -130]);
  const bottomY = useTransform(scrollYProgress, [0, .7], [0, 130]);
  const textOpacity = useTransform(scrollYProgress, [.05, .4, .65], [1, .8, 0]);
  const captionOpacity = useTransform(scrollYProgress, [.55, .85], [0, 1]);

  return <section ref={ref} className={`expansion-section ${enabled ? "expansion-enabled" : ""}`} aria-label="Design perspective">
    <div className="expansion-stage">
      <div className="expansion-meta"><span>A moment of perspective</span><span>Form, feeling, and the space between.</span></div>
      <div className="expansion-composition">
        <h2 className="expansion-heading" aria-label={`${motionInterlude.firstLine} ${motionInterlude.secondLine}`}>
          <motion.span aria-hidden="true" className="expansion-line expansion-line-top" style={{ y: enabled ? topY : 0, opacity: enabled ? textOpacity : 1 }}>{motionInterlude.firstLine}</motion.span>
          <motion.span aria-hidden="true" className="expansion-line expansion-line-bottom" style={{ y: enabled ? bottomY : 0, opacity: enabled ? textOpacity : 1 }}>{motionInterlude.secondLine}</motion.span>
        </h2>
        <motion.div className="expansion-image-mask" style={{ clipPath: enabled ? clipPath : "none" }}>
          <motion.div className="expansion-image" style={{ scale: enabled ? scale : 1 }}><Image src={motionInterlude.image} alt={motionInterlude.alt} fill sizes="100vw" /></motion.div>
          <motion.p className="expansion-caption" style={{ opacity: enabled ? captionOpacity : 1 }}>{motionInterlude.caption}<span>form & field / A design study</span></motion.p>
        </motion.div>
      </div>
    </div>
  </section>;
}
