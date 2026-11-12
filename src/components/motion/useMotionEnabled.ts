"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Scroll compositions stay static on touch-sized screens and under reduced motion. */
export function useMotionEnabled() {
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 900px) and (hover: hover)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return desktop && reduced === false;
}
