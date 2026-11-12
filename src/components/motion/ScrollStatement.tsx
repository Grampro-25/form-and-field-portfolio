"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useMotionEnabled } from "./useMotionEnabled";

function Word({ text, index, total, progress, enabled }: { text: string; index: number; total: number; progress: MotionValue<number>; enabled: boolean }) {
  const color = useTransform(progress, [index / total, Math.min(1, (index + 1.5) / total)], ["#737373", "#111111"]);
  return <motion.span className="statement-word" style={{ color: enabled ? color : "var(--fg)" }}>{text}{" "}</motion.span>;
}

export default function ScrollStatement({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const enabled = useMotionEnabled();
  const words = text.split(" ");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "end 0.5"] });

  return <h2 ref={ref} className="about-statement scroll-statement" aria-label={`${text}.`}>
    <span aria-hidden="true">{words.map((word, index) => <Word key={`${word}-${index}`} text={word} index={index} total={words.length} progress={scrollYProgress} enabled={enabled} />)}<span className="statement-dot">.</span></span>
  </h2>;
}
