"use client";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";
import { studio } from "@/data/portfolio";
import Header from "./Header";
import SelectedCases from "./SelectedCases";
import ArchiveGrid from "./ArchiveGrid";
import AboutAndProcess from "./AboutAndProcess";
import ContactDrawer from "./ContactDrawer";
import MenuOverlay from "./MenuOverlay";
import DraggableContactBadge from "./DraggableContactBadge";
import HeroTitle from "./motion/HeroTitle";
import ImageExpansion from "./ImageExpansion";

export default function Portfolio() {
  const [overlay, setOverlay] = useState<"menu" | "contact" | null>(null);
  const reduce = useReducedMotion();
  const close = useCallback(() => setOverlay(null), []);
  const contact = useCallback(() => setOverlay("contact"), []);
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -96 } });
    let frame: number;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, [reduce]);
  return <MotionConfig reducedMotion="user"><div id="site-content">
    <a href="#cases" className="skip-link">Skip to selected work</a>
    <Header onMenu={() => setOverlay("menu")} onContact={contact} menuOpen={overlay === "menu"} contactOpen={overlay === "contact"} />
    <main>
      <section className="hero section-wrap" aria-labelledby="hero-title"><div className="hero-topline"><span>Independent design practice</span><span>Based in Berlin. Working everywhere.</span></div>
        <HeroTitle />
        <div className="hero-bottom"><a href="#cases" className="scroll-link"><span className="circle-arrow"><ArrowDown size={18} strokeWidth={1.25} /></span>Scroll to explore</a><p>I turn a clear point of view into<br />websites that feel as good as they look.</p><div className="availability"><span className="status-dot" /><span>{studio.availability}</span></div></div>
      </section>
      <SelectedCases onContact={contact} /><ArchiveGrid /><ImageExpansion /><AboutAndProcess onContact={contact} />
      <section id="contact" className="contact-section section-wrap"><div className="section-heading"><span>Have something in mind?</span><span className="muted">Let’s find out what it could become.</span></div><button className="footer-cta" onClick={contact}>let’s make<br />it matter<span>.</span><ArrowUpRight strokeWidth={.8} /></button><div className="contact-section-bottom"><span><i className="status-dot" />{studio.availability}</span><button className="text-link" onClick={contact}>Start a conversation <ArrowUpRight size={17} /></button></div></section>
    </main>
    <footer className="site-footer section-wrap"><a className="wordmark" href="#">{studio.name}<span aria-hidden="true"> ✳</span></a><span className="muted">© {new Date().getFullYear()} · Independent by nature.</span><span className="footer-note muted">Selected work shown as concept projects.</span><a href="#" className="text-link">Back to top <ArrowUp size={15} strokeWidth={1.25} /></a></footer>
    <DraggableContactBadge onClick={contact} open={overlay === "contact"} />
  </div><AnimatePresence mode="wait">{overlay === "menu" && <MenuOverlay key="menu" onClose={close} onContact={contact} />}{overlay === "contact" && <ContactDrawer key="contact" onClose={close} />}</AnimatePresence></MotionConfig>;
}
