"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function DraggableContactBadge({ onClick, open }: { onClick: () => void; open: boolean }) {
  const dragged = useRef(false);
  const reduce = useReducedMotion();
  const [bounds, setBounds] = useState({ left: -300, top: -400, right: 0, bottom: 0 });
  useEffect(() => {
    const resize = () => setBounds({ left: -(window.innerWidth - 150), top: -(window.innerHeight - 170), right: 16, bottom: 16 });
    resize(); window.addEventListener("resize", resize); return () => window.removeEventListener("resize", resize);
  }, []);
  return <motion.button className="contact-badge" aria-label="Contact the studio. You can also drag this button." aria-expanded={open} aria-controls="contact-drawer"
    drag={!reduce} dragConstraints={bounds} dragElastic={.12} dragTransition={{ bounceStiffness: 400, bounceDamping: 30 }} whileDrag={{ scale: 1.06, cursor: "grabbing" }}
    onPointerDown={() => { dragged.current = false; }} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") dragged.current = false; }} onDragStart={() => { dragged.current = true; }}
    onClick={() => { if (!dragged.current) onClick(); }}>
    <ArrowUpRight size={22} strokeWidth={1.25} /><span>Contact</span><small>or drag me</small>
  </motion.button>;
}
