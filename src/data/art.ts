export type ArtCategory =
  | "Portraits"
  | "Sketches"
  | "Acrylic"
  | "Watercolor"
  | "Digital Art"
  | "Illustrations"
  | "Other";

export type ArtPiece = {
  title: string;
  image: string; // path under /public, e.g. "/art/tiger-study.jpg"
  category: ArtCategory;
  medium: string;
  date: string;
  description: string;
};

// Add new artwork here: drop the image file in public/art/ and add one
// entry below. No component code needs to change.
//
// Example:
// {
//   title: "Tiger Study",
//   image: "/art/tiger-study.jpg",
//   category: "Acrylic",
//   medium: "Acrylic on canvas",
//   date: "2026",
//   description: "Months spent on a single tiger — one slow, deliberate stroke at a time.",
// },
export const art: ArtPiece[] = [
  {
    title: "Patience",
    image: "/art/tiger-study.jpg",
    category: "Acrylic",
    medium: "Acrylic on canvas",
    date: "2026",
    description:
      "I spent months on this one — not because it needed that long, but because I wanted to see how far patience could take a single idea. Every strand of fur, every shadow, every catch of light in the eyes was one slow stroke at a time, layered until the coat had real depth instead of just color. There was no moment where it suddenly came together — just showing up, session after session, fixing the smallest details and trusting they'd add up. That's become how I approach most things, honestly: don't rush the details, and don't call it done until it's right.",
  },
  {
    title: "Where I'd Rather Be",
    image: "/art/where-id-rather-be.jpg",
    category: "Acrylic",
    medium: "Acrylic on canvas",
    date: "Undated",
    description:
      "Almost every surface here is built from small, individual dabs of the brush rather than blended strokes — closer to stippling than painting, and it took a lot longer than it probably needed to. I kept adding dots until the light actually felt like it was catching on the grass instead of just sitting flat on the canvas. It isn't a real place. It's just somewhere I'd go if I could — a stream, two quiet houses, nowhere to be. Some days I think that's the whole point of painting: giving yourself somewhere to be for a while.",
  },
  {
    title: "Same Coin",
    image: "/art/same-coin.jpg",
    category: "Sketches",
    medium: "Graphite on paper",
    date: "Undated",
    description:
      "Fan art, honestly — Batman down one half, the Joker down the other, split by a single line straight through the middle of one face. The technical challenge was making the shading do the storytelling: heavier, blockier crosshatching on the Batman side, looser and more chaotic linework on the Joker side, so the two halves read as different people even though the bone structure underneath is identical. The idea stuck with me more than the drawing itself did — how much of 'hero' and 'villain' really just comes down to which side of the line you happened to land on.",
  },
  {
    title: "Last Light",
    image: "/art/forest-at-dusk.jpg",
    category: "Watercolor",
    medium: "Watercolor on paper",
    date: "Undated",
    description:
      "This one's built almost entirely on restraint. Watercolor doesn't forgive overworking, so the glow at the center — that break of light through the canopy — is really just paper I chose not to paint. Everything else, the stags, the trees, the long shadows on the ground, is layered in wet-on-wet washes that were left to bleed into each other rather than controlled stroke by stroke. It's the piece I go back to when I want to remember that sometimes the best move is to do less, not more.",
  },
  {
    title: "The Weight I Carry",
    image: "/art/the-weight-of-thought.jpg",
    category: "Illustrations",
    medium: "Pen and ink on paper",
    date: "2022",
    description:
      "A headless figure with a mass of folded, eye-studded thought where a head should be — I drew this during a period when my own head genuinely felt like that. Every fold is built from tight cross-hatching, all done in fineliner with no pencil underneath, so there was no erasing a bad line, only working around it. It took a long time to get the density of linework right without the whole thing turning into noise. It's less a portrait of a person and more a portrait of what overthinking actually feels like from the inside.",
  },
  {
    title: "Layers",
    image: "/art/beneath-the-surface.jpg",
    category: "Illustrations",
    medium: "Pen, ink and stippling on paper",
    date: "Undated",
    description:
      "This is the most technically demanding piece I've done — a face dissolving into a skull, a second face, a third eye, roses, tarot cards, and radiating lines, all stitched together into one composition. Most of the shading is stippling: thousands of individual dots, placed one at a time to build tone instead of using cross-hatching. It's slow, meditative work — the kind where you look up after an hour and realize you've filled maybe two square inches. I wanted it to reward a close look, so the longer you stare, the more you notice.",
  },
  {
    title: "Holding It Together",
    image: "/art/fracture.jpg",
    category: "Sketches",
    medium: "Graphite on paper",
    date: "2021",
    description:
      "A profile that's half intact, half breaking apart into stone shards. The soft side is built with blended graphite and careful shading to keep the skin looking real; the fractured side is all hard, angular linework — sharp contrast on purpose. I wanted the two halves to fight each other a little, the way it feels when you're holding it together on the outside and cracking on the inside. It's one of the simplest pieces here technically, but it's the one that took the most restraint to keep from over-rendering.",
  },
  {
    title: "Legacy",
    image: "/art/the-warrior.jpg",
    category: "Illustrations",
    medium: "Pen and ink on paper",
    date: "Undated",
    description:
      "Inspired by Maratha-era imagery I grew up around — the turban, the jewelry, the fierce set of the jaw. I built the whole thing in pen, no pencil sketch first, which meant every line in that turban had to be right the first time. The small rider and hilltop fort at the bottom came last, almost as a footnote to the portrait, but they're what turn a single face into a story. This one's about heritage more than technique — it's the piece I'd point to if someone asked what I grew up hearing stories about.",
  },
  {
    title: "Running Late",
    image: "/art/white-rabbit.jpg",
    category: "Sketches",
    medium: "Graphite on paper",
    date: "Undated",
    description:
      "My version of the White Rabbit, if he'd been running late for a very long time. The fur and coat are loose, scratchy pencil work — fast, expressive strokes — while the pocket-watch clockwork embedded in his chest is drawn tight and mechanical, almost architectural. That contrast was the whole point: something falling apart on the outside, still ticking with precision underneath. It's playful and a little unsettling at the same time, which is exactly the tone I was chasing.",
  },
  {
    title: "Between",
    image: "/art/unseen.jpg",
    category: "Sketches",
    medium: "Graphite on paper",
    date: "Undated",
    description:
      "A quiet one. Blindfolded, hand mid-motion, either tying it or about to pull it off — I left that ambiguous on purpose. The hair and shoulders are soft, blended graphite; the blindfold itself is woven in tight, deliberate lines so it reads as fabric with real texture, not just a flat band across the face. I like drawing moments right before or after something happens rather than the obvious action itself — this is one of those in-between moments.",
  },
  {
    title: "Hidden in Plain Sight",
    image: "/art/eyes-in-the-foliage.jpg",
    category: "Illustrations",
    medium: "Pen and ink on paper",
    date: "Undated",
    description:
      "A face nearly overtaken by ornamental acanthus scrollwork, with only the eyes left to prove there's a person under all that foliage. This one leans on classical decorative engraving — the kind of linework you'd see carved into old architecture — which meant a lot of care in how each leaf curls and overlaps so it still reads as continuous growth rather than a patchwork. The eyes were the last thing I added, and they change the whole piece from a decorative pattern into a portrait.",
  },
  {
    title: "Unfinished",
    image: "/art/ink-and-crimson.jpg",
    category: "Illustrations",
    medium: "Ink on paper",
    date: "Undated",
    description:
      "A bald, bearded profile marked up in black ink with sharp strokes of red cutting across it. I worked fast and loose on this one compared to most of my other pieces — the crimson went in with almost no planning, more instinct than layout, which is what gives it that raw, unfinished energy. It's less about anatomical precision and more about intensity: the glare in that one visible eye is doing most of the emotional work in the piece.",
  },
];

export const artCategories: ArtCategory[] = [
  "Portraits",
  "Sketches",
  "Acrylic",
  "Watercolor",
  "Digital Art",
  "Illustrations",
  "Other",
];
