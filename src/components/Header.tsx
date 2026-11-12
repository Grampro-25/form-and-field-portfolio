"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { studio } from "@/data/portfolio";
import RollingText from "./motion/RollingText";

export default function Header({ onMenu, onContact, menuOpen, contactOpen }: { onMenu: () => void; onContact: () => void; menuOpen: boolean; contactOpen: boolean }) {
  const [clock, setClock] = useState({ time: "00:00:00", zone: "Local time" });
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZoneName: "short" });
    const tick = () => { const parts = formatter.formatToParts(new Date()); setClock({ time: parts.filter(p => ["hour", "minute", "second", "literal"].includes(p.type)).map(p => p.value).join("").trim(), zone: parts.find(p => p.type === "timeZoneName")?.value || "Local" }); };
    tick(); const interval = setInterval(tick, 1000); return () => clearInterval(interval);
  }, []);
  return <header className="site-header">
    <a href="#" className="wordmark" aria-label={`${studio.name}, home`}>{studio.name}<span className="brand-star" aria-hidden="true">✳</span></a>
    <div className="clock"><span className="status-dot" /><span>Local time</span><time suppressHydrationWarning>{clock.time}</time><span className="clock-zone">{clock.zone}</span></div>
    <nav aria-label="Main navigation"><button className="text-link" onClick={onMenu} aria-expanded={menuOpen} aria-controls="menu-overlay"><RollingText text="Menu" /> <Plus size={14} strokeWidth={1.25} /></button><button className="text-link" onClick={onContact} aria-expanded={contactOpen} aria-controls="contact-drawer"><RollingText text="Contact" /> <ArrowUpRight size={15} strokeWidth={1.25} /></button></nav>
  </header>;
}
