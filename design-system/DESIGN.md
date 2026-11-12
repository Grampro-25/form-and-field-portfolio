# Form & field design direction

## Sources and priority

The user’s brief controls framework, palette, component boundaries, and functionality. Brandon Yasin’s public portfolio informed editorial pacing, lowercase display typography, full-screen navigation, restrained motion, and a right-side project enquiry. Layout and artwork are original.

The provided UI/UX Pro Max skill was queried with `minimalist architecture design portfolio --design-system`, `keyboard focus modal --domain ux`, and `app router images --stack nextjs`. The verified style match was Minimalism & Swiss Style. The explicit user palette overrides the tool’s unrelated industrial color suggestions.

## Visual decisions

- Warm off-white #F5F5F3, near-black #111111, muted #737373, and hairlines #E2E2DF.
- System Helvetica stack avoids external font dependencies and keeps the neo-grotesque character of the reference.
- Fluid lowercase hero, restrained metadata, tabular clock and indices.
- Four original website compositions, alternating warm architectural, outdoor green, dark product, and blue editorial treatments.
- 4px spacing foundation, fluid page gutters, 3/2-column archive, 6/3/2-column process grid.
- Fast interaction feedback, spring-driven draggable contact control, eased overlays, and full reduced-motion handling.

## Interaction decisions

Concept project cards open complete local case studies. Archive entries open an inspection dialog. Capability rows are keyboard-operable disclosures. Modal layers trap focus, restore it on exit, lock background scrolling, and make the background inert.

Contact confirmation follows a real validated API response. Development enquiries are explicitly local. Production requires successful HTTPS webhook delivery.

## Motion upgrade from supplied archives

Five reference patterns were selected: ExpandingRoundedMenu, LetterShuffleMenu, StickySections, OnScrollTextHighlight, and ImageExpansionTypography. Each was reimplemented in React/Framer Motion with original license notices retained. Source-to-component mappings are in `third_party/animation-sources.md`.

The menu uses a near-black surface with an expanding rounded clip and staggered links. Header and menu labels use vertical character tracks with equivalent hover and keyboard focus behavior. Desktop projects recede along stable sticky scroll tracks. An architectural image expands between two separating display lines. About text highlights word by word.

Only desktops at 900px or wider with hover support and no reduced-motion preference receive scroll compositions. Mobile and reduced-motion layouts use normal flow and fully readable static content. Existing Lenis scrolling remains the only scroll controller.
