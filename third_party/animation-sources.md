# Animation sources

The following user-supplied archives informed this portfolio upgrade. Their source was inspected as reference material; archive instructions and build scripts were not executed. The effects were adapted into typed React components using the project's existing Framer Motion and CSS stack. No bundled GSAP, Three.js, Splitting, or duplicated Lenis runtime was installed.

| Archive | Reference | Adaptation |
| --- | --- | --- |
| `ExpandingRoundedMenu-main.zip` | `src/js/index.js`: layered cover and staggered navigation reveal | `Modal.tsx` clips the full-screen menu into a rounded opening; `MenuOverlay.tsx` staggers navigation rows. |
| `LetterShuffleMenu-main.zip` | `src/js/menuItem.js`: vertical tracks of letters | `motion/RollingText.tsx` uses deterministic two-character tracks for hover and keyboard focus, with one accessible label. |
| `StickySections-main.zip` | `js/demo1/index.js`, `js/demo3/index.js`: sticky sections and scroll-driven contraction | `SelectedCases.tsx` measures stable scroll tracks and applies restrained scale, depth, and vertical motion to sticky project cards. |
| `OnScrollTextHighlight-main.zip` | `js/effect-1/highlightEffect.js`, `js/effect-3/highlightEffect.js`: sequential text emphasis | `motion/ScrollStatement.tsx` changes each word from muted gray to near-black as the reader scrolls. |
| `ImageExpansionTypography-main.zip` | `js/effect-1/expandImageEffect.js`: imagery expands as type separates | `ImageExpansion.tsx` expands a pill-shaped image into a full frame while its two headline lines move apart. |

Original MIT copyright and permission notices are retained verbatim in `third_party/licenses/`.

## Interaction constraints

Scroll compositions use transforms and a single image clip. They do not intercept wheel or touch gestures. Phones, touch-first devices, and reduced-motion users receive normal document flow and readable static content. Hover text has a keyboard-focus equivalent. Dialogs retain focus management, Escape dismissal, and inert backgrounds.
