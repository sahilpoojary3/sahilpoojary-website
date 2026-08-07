// Single source of truth for personal + site configuration.
// Edit this file to update contact info, links, and section toggles —
// nothing else in the codebase should need to change.

export const profile = {
  name: "Sahil Poojary",
  initials: "SP",
  pronouns: "He/Him",
  headline:
    "MBA Graduate | Business Strategy & Marketing | Administrative & Operations Professional | eCommerce & Digital Transformation Enthusiast",
  tagline:
    "I'm building a career at the crossroads of operations, marketing and digital transformation — an MBA graduate now splitting my time between a non-profit I help direct and running events for a growing hospitality brand.",
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
