"use client";
import { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { capabilities, values, process } from "@/data/portfolio";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ScrollStatement from "./motion/ScrollStatement";

export default function AboutAndProcess({ onContact }: { onContact: () => void }) {
  const [active, setActive] = useState<number | null>(0);
  const reduce = useReducedMotion();
  return <section id="about" className="about-section section-wrap"><div className="section-heading"><h2><span className="section-mark">↳</span> A little about me</h2><span>Independent designer.<br /><span className="muted">An eye for the essential.</span></span></div>
    <ScrollStatement text="i design refined digital experiences across web and product" />
    <div className="philosophy"><h3>Form follows meaning.</h3><div><p>I’m an independent digital designer working at the intersection of strategy, design, and technology. I partner with people who care about what they put into the world.</p><p className="muted">My approach is rooted in simplicity. I strip away the unnecessary to make room for what matters: a clear idea, a considered detail, an experience that feels right.</p><button className="text-link" onClick={onContact}>A good conversation is a good start <ArrowUpRight size={16} /></button></div></div>
    <div className="capabilities-layout"><div><h3>What I can help with</h3><p className="muted">From the first conversation<br />to the final detail.</p></div><div className="capabilities-list">{capabilities.map((item, i) => <div className="capability" key={item.title}><h4><button aria-expanded={active === i} aria-controls={`capability-${i}`} onClick={() => setActive(active === i ? null : i)}><span className="muted">0{i + 1}</span><span>{item.title}</span>{active === i ? <Minus size={20} strokeWidth={1.25} /> : <Plus size={20} strokeWidth={1.25} />}</button></h4><AnimatePresence initial={false}>{active === i && <motion.div id={`capability-${i}`} initial={{ height: reduce ? "auto" : 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: reduce ? "auto" : 0, opacity: 0 }} transition={{ duration: reduce ? 0 : .25 }}><p>{item.description}</p></motion.div>}</AnimatePresence></div>)}</div></div>
    <div className="values-heading"><h3>A few things I believe in.</h3><span className="muted">The way I think shapes the way I work.</span></div><div className="values-grid">{values.map((value, i) => <div key={value.title}><span className="muted">0{i + 1}</span><h4>{value.title}</h4><p>{value.description}</p></div>)}</div>
    <div className="process-heading"><h3>A clear process.<br />Room for discovery.</h3><p className="muted">Every project is different.<br />The care behind it stays the same.</p></div><div className="process-grid">{process.map((step, i) => <div key={step.title}><span className="muted">0{i + 1}</span><h4>{step.title}</h4><p>{step.description}</p><span className="takeaway">{step.takeaway}</span></div>)}</div>
  </section>;
}
