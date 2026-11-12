# form & field

A responsive editorial design portfolio inspired by the spatial restraint, typography, and interaction patterns of Brandon Yasin’s portfolio. The studio identity and four projects are illustrative concepts, not claims of client work.

## Run locally

Requires Node.js 20.9 or later.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. For production, run `npm run build` followed by `npm start`. Run `npm run typecheck` for TypeScript validation, and `npm run test:smoke` while the local server is running for the HTTP and form validation checks.

## Stack and content

Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Lenis, and Lucide React. The four palette variables and responsive styles live in `src/app/globals.css`. All portfolio content is strongly typed in `src/data/portfolio.ts`.

The requested components are in `src/components`. `ProjectPreview` renders original HTML/CSS website compositions around locally hosted photographs. This keeps artwork crisp at every size without embedding other people’s website screenshots. Images are downloaded from Unsplash; photo identifiers and the reproducible download script are in `scripts/download-assets.py`.

## Contact delivery

The form validates on both client and server. In development, successful enquiries are saved to `.data/enquiries.jsonl`; the confirmation explicitly identifies local-only storage. This file is gitignored and contains personal data. Delete local test enquiries when finished testing.

In production, configure `CONTACT_WEBHOOK_URL` with an HTTPS endpoint that accepts JSON and routes enquiries to your inbox or CRM. An optional `CONTACT_WEBHOOK_TOKEN` is sent as a bearer token. Use `.env.example` as the reference. The application never reports a successful production enquiry without a successful upstream response. No email service or account is included.

## Interactions and accessibility

- Fullscreen navigation, four case-study dialogs, and a 12-item archive with previous/next lightbox controls.
- Drag-constrained contact badge with click/drag discrimination; every drag action has a normal button alternative.
- Contact modes, multi-select scope, single-select format and budget, inline validation, loading, error, and confirmation states.
- Focus trapping, focus restoration, Escape dismissal, inert page background, visible keyboard focus, and reduced-motion support.
- Lenis smooth scrolling respects reduced motion and allows independent modal scrolling.
- Local clock uses the visitor’s timezone and updates every second.

## Animation upgrade

The supplied animation archives were reviewed, with five patterns selected: rounded menu expansion, vertical letter tracks, sticky case studies, scroll-highlighted type, and an expanding-image interlude. Source mappings and original notices are in `third_party/animation-sources.md` and `third_party/licenses/`. The adaptations use the existing Framer Motion installation. Motion styles live in `src/app/motion.css`; reusable components live in `src/components/motion/`. Large scroll compositions are enabled only on desktop devices with hover support and no reduced-motion preference.

## Design guidance

The supplied UI/UX Pro Max skill was extracted selectively into `.agents/skills/ui-ux-pro-max`. Its local design-system search recommended Minimalism & Swiss Style; the implementation preserves the user’s explicit monochrome palette over the search’s generic palette. A focused UX search informed visible keyboard focus and unobscured modal controls. Content, typography, grid, and motion decisions are recorded in `design-system/DESIGN.md`.
