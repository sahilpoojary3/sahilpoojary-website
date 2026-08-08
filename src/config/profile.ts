// Single source of truth for personal + site configuration.
// Edit this file to update contact info, links, and section toggles —
// nothing else in the codebase should need to change.

export const profile = {
  name: "Sahil Poojary",
  initials: "SP",
  pronouns: "He/Him",
  // Leads with Operations because that's what every job, story, and
  // published article actually demonstrates — not because it sounds more
  // impressive. Every element here is still a real, held credential; this
  // is a resequencing for clarity, not a new claim. Sahil's LinkedIn
  // headline lists these same four things in a broader, platform-optimized
  // order — see SEO_CONTENT_OPERATIONS.md's positioning note if reconciling
  // the two.
  headline:
    "Operations-Focused Business & Management Professional | MBA Graduate",
  tagline:
    "My work is operations when the plan meets reality — coordinating events, teams, and logistics under pressure, from a rain-soaked community festival to a non-profit's day-to-day. MBA-trained in leadership, strategy, and marketing.",
  // Kept short (~150-160 chars) on purpose — search engines truncate or
  // flag longer meta descriptions. Used for <meta description>, OG, and
  // Twitter cards; the fuller `tagline` above is for on-page copy.
  metaDescription:
    "Sahil Poojary — Operations-focused Business & Management professional in Vancouver, BC. MBA graduate leading a non-profit and running event operations.",
  location: "Vancouver, British Columbia, Canada",
  openTo: "I'm open to consulting and management opportunities",

  // Update this if you'd like a different public-facing inbox.
  email: "sahilpoojary3@gmail.com",

  socials: {
    linkedin: "https://www.linkedin.com/in/sahilpoojary/",
  },

  resume: {
    // Drop your resume at public/resume.pdf — the Resume section
    // detects it automatically and hides the buttons gracefully if missing.
    path: "/resume.pdf",
  },

  about: {
    full: "I completed my MBA at University Canada West in August 2025, focused on leadership, marketing, and entrepreneurship in the Canadian business world. Outside the classroom, that's played out as administrative operations, client-facing work, and strategic consulting across a few very different industries — plus research papers on digital transformation, business analysis, and eCommerce that shaped a lot of how I think about where business is headed.",
    extra:
      "What I actually care about is following through. Plans matter, but so does showing up when something goes sideways — a strategy deck, a rain-soaked community event, a team that needs someone to just make a call.",
  },

  // Section visibility toggles — flip to false to hide a section site-wide.
  sections: {
    hero: true,
    about: true,
    journey: true,
    experience: true,
    selectedWork: true,
    education: true,
    certifications: true,
    skills: true,
    recommendations: true,
    languages: true,
    beyondWork: true,
    artTeaser: true,
    askSahil: true,
    resume: false,
    contact: true,
  },

  ai: {
    // If NEXT_PUBLIC_ASK_SAHIL_API is unset, Ask Sahil runs entirely
    // client-side against the structured profile data (free, no API key).
    // Set it to a deployed /api/ask route once a model key is configured
    // server-side to upgrade to full natural-language answers.
    remoteEndpoint: process.env.NEXT_PUBLIC_ASK_SAHIL_API ?? "",
  },
} as const;

export type Profile = typeof profile;
