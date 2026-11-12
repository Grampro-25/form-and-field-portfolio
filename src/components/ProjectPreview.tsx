import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import type { ProjectTheme } from "@/data/portfolio";

interface Props { theme: ProjectTheme; image: string; alt: string; compact?: boolean; priority?: boolean; variation?: number }
export default function ProjectPreview({ theme, image, alt, compact = false, priority = false, variation = 0 }: Props) {
  const names = { architecture: "ÆSTR", outdoors: "ROAM", objects: "STILL", culture: "offscript®" };
  return <div className={`project-art art-${theme} ${compact ? "art-compact" : ""} variation-${variation % 3}`} aria-hidden="true">
    <div className="mockup-site">
      <div className="mockup-nav"><span className="mockup-logo">{names[theme]}</span><span>{theme === "architecture" ? "Architecture & interiors" : theme === "outdoors" ? "Made for the outside." : theme === "objects" ? "Objects with intention" : "An independent point of view"}</span><span>Explore <Plus size={9} /></span></div>
      {theme === "architecture" && <><div className="architecture-title"><span>Spaces for<br />a slower life.</span><span className="mockup-aside">Considered architecture.<br />Lasting impressions.<br /><ArrowUpRight size={18} strokeWidth={1} /></span></div><div className="mockup-image"><Image src={image} alt={alt} fill sizes={compact ? "(max-width: 600px) 90vw, 32vw" : "(max-width: 700px) 90vw, 80vw"} priority={priority} /><span className="image-caption">The residence, 2026 <ArrowUpRight size={13} /></span></div><div className="mockup-bottom"><span>Rooted in place.</span><span>Designed around you.</span><span>01 / 04</span></div></>}
      {theme === "outdoors" && <><div className="outdoors-image"><Image src={image} alt={alt} fill sizes="(max-width: 700px) 90vw, 70vw" /><div className="outdoors-copy"><small>Less signal. More feeling.</small><span>Go where<br />you feel alive.</span><span className="mockup-pill">Find your outside <ArrowUpRight size={12} /></span></div><span className="outdoors-coordinates">46°35′N 12°17′E</span></div><div className="mockup-bottom"><span>Built for the detour.</span><span>Explore the collection ↗</span></div></>}
      {theme === "objects" && <><div className="objects-body"><div className="objects-copy"><span>Good things.<br />Quietly made.</span><p>A collection of considered objects<br />for the spaces we call our own.</p><span className="mockup-pill">Discover the collection <ArrowUpRight size={12} /></span></div><div className="objects-photo"><Image src={image} alt={alt} fill sizes="(max-width: 700px) 60vw, 40vw" /><span>No. 028 — Everyday essentials</span></div></div><div className="mockup-bottom"><span>Fewer things. Better things.</span><span>Designed to stay.</span></div></>}
      {theme === "culture" && <><div className="culture-heading"><span>outside<br />the lines<span className="culture-asterisk">✳</span></span><span className="mockup-aside">Ideas, people, and things<br />moving culture forward.</span></div><div className="culture-image"><Image src={image} alt={alt} fill sizes="(max-width: 700px) 90vw, 80vw" /><div>New ways<br />of seeing.<ArrowUpRight size={32} strokeWidth={1} /></div></div><div className="mockup-bottom"><span>Issue 04 / Different perspectives</span><span>Read the stories ↗</span></div></>}
    </div>
  </div>;
}
