import type { CSSProperties } from "react";

/** React/CSS adaptation of the vertical character tracks in LetterShuffleMenu. */
export default function RollingText({ text }: { text: string }) {
  return <span className="rolling-text">
    <span className="sr-only">{text}</span>
    <span aria-hidden="true" className="rolling-characters">
      {Array.from(text).map((character, index) => <span className="rolling-character" key={index} style={{ "--character-index": index } as CSSProperties}>
        <span className="rolling-track"><span>{character === " " ? "\u00a0" : character}</span><span>{character === " " ? "\u00a0" : character}</span></span>
      </span>)}
    </span>
  </span>;
}
