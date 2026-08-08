import { profile } from "@/config/profile";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";
import { skillCategories, topSkills } from "@/data/skills";
import { recommendations } from "@/data/recommendations";
import { languages } from "@/data/languages";
import { selectedWork } from "@/data/selectedWork";
import { interests } from "@/data/interests";
import type { DomainId, DomainKnowledge, EntityItem, Fact } from "./types";

// Every fact here is derived at request time from the same typed data files
// that render the site — there is no separate prose copy to fall out of
// sync. If profile.ts, experience.ts, education.ts etc. change, the
// chatbot's knowledge changes with them automatically.

function f(tag: Fact["tag"], text: string, type: Fact["type"] = "fact"): Fact {
  return { tag, type, text };
}

function educationItems(): EntityItem[] {
  return education.map((e, i) => {
    const isMba = /mba/i.test(e.degree);
    return {
      id: `education-${i}`,
      label: e.degree,
      aliases: isMba
        ? ["mba", "masters", "master's", "business administration", e.school.toLowerCase()]
        : ["bcom", "bachelor", "b.com", "commerce", "undergrad", "undergraduate", e.school.toLowerCase()],
      start: e.start,
      end: e.end,
      facts: [
        f("summary", `${e.degree} from ${e.school} (${e.start}–${e.end}).`),
        f("where", `${e.school}.`),
        f("when", `${e.start} to ${e.end}${e.detail ? ` (${e.detail})` : ""}.`),
        ...e.points.map((p) => f("detail", p)),
      ],
    };
  });
}

const RELATED_ARTICLES: Record<string, string[]> = {
  "sula indian restaurant": [
    "what-a-rainstorm-taught-me-about-event-operations",
    "a-restaurant-and-a-factory-taught-me-the-same-job",
  ],
  "surgical products india pvt. ltd.": ["a-restaurant-and-a-factory-taught-me-the-same-job"],
};

function experienceItems(): EntityItem[] {
  const aliasMap: Record<string, string[]> = {
    "ele foundation": ["ele", "foundation", "non-profit", "nonprofit", "director role", "youth"],
    "sula indian restaurant": ["sula", "restaurant", "catering", "manager role", "hospitality"],
    "alchemy bar & kitchen": ["alchemy", "bar", "mixologist", "cocktail", "yaletown"],
    "surgical products india pvt. ltd.": ["surgical", "factory", "medical", "india", "supervisor"],
  };
  return experience.map((e, i) => {
    const key = e.org.toLowerCase();
    const aliases = [e.org.toLowerCase(), e.role.toLowerCase(), ...(aliasMap[key] ?? [])];
    return {
      id: `experience-${i}`,
      label: `${e.role} at ${e.org}`,
      aliases,
      start: e.start,
      end: e.end,
      facts: [
        f("summary", `${e.role} at ${e.org} (${e.start}–${e.end}). ${e.summary}`),
        f("where", `${e.org}, ${e.location}.`),
        f("when", `${e.start} to ${e.end}, ${e.employment}.`),
        ...e.points.map((p) => f("detail", p)),
        f("skills", `Skills involved: ${e.skills.join(", ")}.`),
      ],
      relatedArticleSlugs: RELATED_ARTICLES[key],
    };
  });
}

export function buildKnowledge(): Record<DomainId, DomainKnowledge> {
  const eduItems = educationItems();
  const expItems = experienceItems();

  const identity: DomainKnowledge = {
    id: "identity",
    label: "Identity",
    keywords: ["who", "introduce", "overview", "profile", "headline", "vancouver", "person", "kind of person"],
    facts: [
      f("summary", `${profile.name} is based in ${profile.location}. ${profile.headline}.`),
      f("detail", profile.about.full),
      f("detail", profile.about.extra),
      f("detail", profile.openTo),
    ],
  };

  const educationDomain: DomainKnowledge = {
    id: "education",
    label: "Education",
    keywords: ["education", "educational", "degree", "degrees", "school", "university", "college", "study", "studied", "studying", "mba", "bcom", "bachelor", "academic", "grade", "graduated"],
    facts: [
      f("summary", `Sahil holds ${education.length} degrees: ${education.map((e) => e.degree).join(" and ")}.`),
    ],
    items: eduItems,
  };

  const experienceDomain: DomainKnowledge = {
    id: "experience",
    label: "Experience",
    keywords: ["experience", "work history", "job", "jobs", "career history", "role", "roles", "worked", "employment", "employer", "position"],
    facts: [
      f("summary", `Sahil has worked across ${experience.length} roles spanning non-profit leadership, hospitality operations, and industrial operations.`),
    ],
    items: expItems,
  };

  const businessManagement: DomainKnowledge = {
    id: "businessManagement",
    label: "Business & Management",
    keywords: ["business", "management", "manage", "operations", "strategy", "industries", "businesses is he interested"],
    facts: [
      f("summary", "Sahil's focus sits at the crossroads of operations, marketing, and digital transformation."),
      f("detail", "He's currently splitting his time between directing a non-profit (ELE Foundation) and running catering operations and community events for Sula Indian Restaurant."),
      f("detail", "His MBA specialized in leadership, marketing management, and entrepreneurship.", "fact"),
      f("why", "His operations roles — from a medical products company to hospitality — give him a consistent lens on management: inventory discipline, vendor coordination, and being the bridge between frontline work and decision-makers.", "interpretation"),
    ],
  };

  const accountingFinance: DomainKnowledge = {
    id: "accountingFinance",
    label: "Accounting & Finance",
    keywords: ["accounting", "accountant", "finance", "financial", "bookkeeping", "cpa"],
    facts: [
      f("summary", "Sahil's accounting and finance grounding comes from his education, not a professional accounting role."),
      f("detail", "He holds a Bachelor of Commerce in Accounting and Finance from the University of Mumbai (2020–2023), plus a Financial Accounting 099 certification from University Canada West (2024)."),
      f("why", "That background gives him real fluency with financial fundamentals, though his career since has run through operations and management rather than accounting itself.", "interpretation"),
    ],
  };

  const aiTechnology: DomainKnowledge = {
    id: "aiTechnology",
    label: "AI & Technology",
    keywords: ["ai", "artificial intelligence", "technology", "tech", "digital transformation", "software", "automation", "machine learning"],
    facts: [
      f("summary", "Sahil's documented technology interest is digital transformation and eCommerce, from his MBA research — there's no dedicated AI project or publication on his profile yet."),
      f("detail", "His MBA included research on digital transformation, eCommerce, and business analysis, and his headline lists him as a \"Digital Transformation Enthusiast.\""),
    ],
  };

  const projects: DomainKnowledge = {
    id: "projects",
    label: "Projects",
    keywords: ["project", "projects", "initiative", "initiatives", "case study"],
    facts: [
      f("summary", `Sahil's documented projects are real initiatives from his work, not a client portfolio — ${selectedWork.map((w) => w.title).join("; ")}.`),
      ...selectedWork.map((w) =>
        f("detail", `${w.title} (${w.context}, ${w.date}): ${w.outcome}`)
      ),
    ],
  };

  const career: DomainKnowledge = {
    id: "career",
    label: "Career positioning",
    keywords: ["hire him", "hire", "why should", "suitable for", "looking for", "career interests", "career direction", "career goals", "positioning", "consulting"],
    facts: [
      f("summary", profile.openTo + "."),
      f("detail", "His path runs from a commerce degree through operations roles in two very different industries (medical products, hospitality) to an MBA and current non-profit leadership — a consistent throughline of operations discipline plus people-facing coordination.", "interpretation"),
      ...recommendations.slice(0, 1).map((r) =>
        f("detail", `${r.context.split("—")[0].trim()} ${r.name} described him as: "${r.quote.split(".")[0]}."`)
      ),
    ],
  };

  const skills: DomainKnowledge = {
    id: "skills",
    label: "Skills",
    keywords: ["skill", "skills", "capable", "good at", "proficient", "expertise"],
    facts: [
      f("summary", `Top skills: ${topSkills.join(", ")}.`),
      ...skillCategories.map((c) => f("detail", `${c.category}: ${c.skills.join(", ")}.`)),
    ],
  };

  const certificationsDomain: DomainKnowledge = {
    id: "certifications",
    label: "Certifications",
    keywords: ["certification", "certifications", "certificate", "certified", "credential", "license"],
    facts: [
      f("summary", `Sahil holds ${certifications.length} certifications: ${certifications.map((c) => c.name).join(", ")}.`),
      ...certifications.map((c) => f("detail", `${c.name}, issued by ${c.issuer} (${c.issued}${c.expires ? `, expires ${c.expires}` : ""}).`)),
    ],
  };

  const languagesDomain: DomainKnowledge = {
    id: "languages",
    label: "Languages",
    keywords: ["language", "languages", "speak", "fluent", "bilingual", "multilingual"],
    facts: [
      f("summary", `Sahil speaks ${languages.length} languages: ${languages.map((l) => `${l.name} (${l.proficiency})`).join(", ")}.`),
    ],
  };

  const interestsDomain: DomainKnowledge = {
    id: "interests",
    label: "Beyond work",
    keywords: ["hobby", "hobbies", "beyond work", "free time", "outside work", "personal interest", "painting", "sketch", "art", "outdoors", "hiking", "camping", "cocktail"],
    facts: [
      f("summary", "Outside of work, Sahil paints and sketches, spends time outdoors, and volunteers."),
      ...interests.map((it) => f("detail", `${it.title}: ${it.description}`)),
    ],
  };

  const recommendationsDomain: DomainKnowledge = {
    id: "recommendations",
    label: "Recommendations",
    keywords: ["recommend", "recommendation", "testimonial", "reference", "said about him", "colleagues say", "what do people say"],
    facts: recommendations.map((r) => f("detail", `${r.name} (${r.context}) wrote: "${r.quote}"`)),
  };

  const contact: DomainKnowledge = {
    id: "contact",
    label: "Contact",
    keywords: ["contact", "email", "reach him", "linkedin", "get in touch", "connect with him"],
    facts: [
      f("summary", `Best reached by email at ${profile.email} or on LinkedIn.`),
    ],
    source: { label: "LinkedIn", href: profile.socials.linkedin },
  };

  const writing: DomainKnowledge = {
    id: "writing",
    label: "Writing",
    keywords: ["write", "writes", "writing", "written", "article", "articles", "blog", "insights", "post", "posts", "published"],
    facts: [],
  };

  return {
    identity, education: educationDomain, experience: experienceDomain,
    businessManagement, accountingFinance, aiTechnology, projects, writing,
    career, skills, certifications: certificationsDomain, languages: languagesDomain,
    interests: interestsDomain, recommendations: recommendationsDomain, contact,
  };
}
