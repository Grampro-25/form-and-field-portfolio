export type ProjectTheme = "architecture" | "outdoors" | "objects" | "culture";
export interface Project {
  id: string; title: string; subtitle: string; year: string; tags: string[];
  theme: ProjectTheme; image: string; alt: string; description: string;
  approach: string; deliverables: string[];
}
export const studio = {
  name: "form & field", email: "hello@formandfield.studio", location: "Berlin, DE",
  description: "An independent design practice shaping considered websites and digital experiences.",
  availability: "Open for select collaborations",
};
export const motionInterlude = {
  firstLine: "less noise.",
  secondLine: "more meaning.",
  image: "/images/architecture.jpg",
  alt: "Sunlit living space with warm wood, natural textures, and considered furniture",
  caption: "Space for what matters.",
} as const;
export const projects: Project[] = [
  { id: "aestr", title: "ÆSTR Studio", subtitle: "Space to feel something.", year: "2026", tags: ["Website design", "Development"], theme: "architecture", image: "/images/architecture.jpg", alt: "Sunlit sculptural concrete architecture framed by soft shadows", description: "A digital home for an architecture practice exploring the relationship between people, material, and place. Quiet by intention. Distinct by design.", approach: "An editorial grid, warm material tones, and generous pauses give the architecture room to breathe. A restrained typographic system brings a human voice to a precise practice.", deliverables: ["Creative direction", "Responsive website", "Motion system", "Frontend development"] },
  { id: "roam", title: "ROAM Outdoors", subtitle: "A little further from ordinary.", year: "2026", tags: ["E-commerce", "Digital identity"], theme: "outdoors", image: "/images/landscape.jpg", alt: "Dramatic mountain landscape and a calm alpine lake", description: "An outdoor label built around the simple pleasure of getting outside. An immersive shopping experience that puts the landscape first.", approach: "Expansive imagery meets a functional commerce system. Earthy colors, useful product details, and confident typography make discovery feel as natural as the destination.", deliverables: ["Digital identity", "E-commerce design", "Product pages", "Design system"] },
  { id: "still", title: "STILL Objects", subtitle: "Less, but with more meaning.", year: "2025", tags: ["Art direction", "Website design"], theme: "objects", image: "/images/objects.jpg", alt: "Considered sculptural furniture and objects in a minimal interior", description: "Everyday objects, carefully considered. A tactile digital gallery for a collection of contemporary furniture and collectible design.", approach: "A gallery-like interface lets silhouette, texture, and proportion tell the story. Deliberately slow transitions turn browsing into a moment of observation.", deliverables: ["Art direction", "Website design", "Interaction design", "CMS architecture"] },
  { id: "offscript", title: "Offscript®", subtitle: "Culture without a template.", year: "2025", tags: ["UI/UX", "Interactive motion"], theme: "culture", image: "/images/culture.jpg", alt: "Modern art gallery with bold sculptural forms", description: "An independent journal at the intersection of art, design, and contemporary culture. A flexible platform for people who see things differently.", approach: "A bold editorial framework balances oversized headlines with small, purposeful details. Fluid layouts give every story its own rhythm while keeping reading effortless.", deliverables: ["Editorial platform", "UI/UX system", "Motion direction", "Responsive design"] },
];
export interface ArchiveItem { id: string; title: string; category: string; year: string; theme: ProjectTheme; variation: number; image: string; alt: string }
export const archive: ArchiveItem[] = [
  { id: "01", title: "Material studies", category: "Art direction", year: "2026", theme: "objects", variation: 0, image: "/images/objects.jpg", alt: "Sculptural furniture composition" },
  { id: "02", title: "A slower kind of stay", category: "Hospitality", year: "2026", theme: "architecture", variation: 1, image: "/images/architecture.jpg", alt: "Quiet architectural retreat" },
  { id: "03", title: "Beyond the familiar", category: "Editorial", year: "2026", theme: "outdoors", variation: 2, image: "/images/landscape.jpg", alt: "Alpine landscape editorial" },
  { id: "04", title: "Type in motion", category: "Typography", year: "2026", theme: "culture", variation: 3, image: "/images/culture.jpg", alt: "Experimental oversized typography" },
  { id: "05", title: "Objects of intention", category: "E-commerce", year: "2025", theme: "objects", variation: 4, image: "/images/objects.jpg", alt: "A curated object storefront" },
  { id: "06", title: "The quiet index", category: "Website design", year: "2025", theme: "architecture", variation: 5, image: "/images/architecture.jpg", alt: "Minimal architecture index" },
  { id: "07", title: "Somewhere outside", category: "Digital identity", year: "2025", theme: "outdoors", variation: 6, image: "/images/landscape.jpg", alt: "Outdoor exploration identity" },
  { id: "08", title: "New perspectives", category: "Culture", year: "2025", theme: "culture", variation: 7, image: "/images/culture.jpg", alt: "Contemporary cultural journal" },
  { id: "09", title: "Everyday rituals", category: "Product design", year: "2025", theme: "objects", variation: 8, image: "/images/objects.jpg", alt: "Still life of everyday objects" },
  { id: "10", title: "Space between", category: "Architecture", year: "2024", theme: "architecture", variation: 9, image: "/images/architecture.jpg", alt: "Studies of light and architectural space" },
  { id: "11", title: "Field notes", category: "Editorial", year: "2024", theme: "outdoors", variation: 10, image: "/images/landscape.jpg", alt: "Travel journal landscape" },
  { id: "12", title: "A different frame", category: "Interaction", year: "2024", theme: "culture", variation: 11, image: "/images/culture.jpg", alt: "Experimental gallery interface" },
];
export const capabilities = [
  { title: "Website design", description: "Distinctive, responsive websites that bring a clear point of view to every screen." },
  { title: "UI/UX systems", description: "Thoughtful flows and reusable systems built around the people who use them." },
  { title: "E-commerce", description: "Considered shopping experiences that connect good products with the right people." },
  { title: "Interactive motion", description: "Purposeful movement that adds character, guides attention, and makes things feel natural." },
  { title: "Frontend & Webflow", description: "Precise, accessible builds that carry the design intent through to the final interaction." },
  { title: "Digital brand identity", description: "A cohesive visual language for how a brand looks, speaks, and moves online." },
] as const;
export const values = [
  { title: "Empathy", description: "Good work starts with listening. I get to know your world before I start shaping it." },
  { title: "Clarity", description: "Remove the noise. Keep what matters. Make every choice feel intentional." },
  { title: "Craft", description: "The bigger picture lives in the smallest details. I give both the attention they deserve." },
] as const;
export const process = [
  { title: "See", description: "Listen, ask questions, and understand the people and purpose behind the project.", takeaway: "A shared foundation" },
  { title: "Explore", description: "Research, experiment, and find the unexpected connections worth following.", takeaway: "New possibilities" },
  { title: "Shape", description: "Turn promising ideas into a focused visual direction and a clear plan.", takeaway: "A clear direction" },
  { title: "Craft", description: "Bring the direction to life through typography, layout, interaction, and code.", takeaway: "Thoughtful execution" },
  { title: "Refine", description: "Test the details, question the assumptions, and make the whole feel right.", takeaway: "A cohesive finish" },
  { title: "Evolve", description: "Launch with care and keep learning as the project meets the real world.", takeaway: "Room to grow" },
] as const;
