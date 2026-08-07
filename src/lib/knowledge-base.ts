import { profile } from "@/config/profile";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";
import { skillCategories, topSkills } from "@/data/skills";
import { recommendations } from "@/data/recommendations";
import { languages } from "@/data/languages";
import { selectedWork } from "@/data/selectedWork";
import { interests } from "@/data/interests";

export type KnowledgeChunk = {
  id: string;
  topic: string;
  keywords: string[];
  text: string;
};

// Every chunk here is derived directly from verified profile data.
// Ask Sahil (local + remote) may only answer using these chunks.
export function buildKnowledgeBase(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  chunks.push({
    id: "profile",
    topic: "Overview",
    keywords: ["who", "sahil", "about", "overview", "introduce", "background", "headline", "location", "vancouver"],
    text: `${profile.name} (${profile.pronouns}) is based in ${profile.location}. Professional headline: "${profile.headline}". In his own words: "${profile.about.full} ${profile.about.extra}" ${profile.openTo}.`,
  });

  experience.forEach((e, i) => {
    chunks.push({
      id: `experience-${i}`,
      topic: `Experience: ${e.role} at ${e.org}`,
      keywords: [
        "experience", "work", "job", "role", "career", "employment",
        e.role.toLowerCase(), e.org.toLowerCase(), ...e.skills.map((s) => s.toLowerCase()),
      ],
      text: `${e.role} at ${e.org} (${e.start} – ${e.end}, ${e.employment}, ${e.location}). ${e.summary} Responsibilities: ${e.points.join(" ")} Skills used: ${e.skills.join(", ")}.`,
    });
  });

  education.forEach((e, i) => {
    chunks.push({
      id: `education-${i}`,
      topic: `Education: ${e.degree}`,
      keywords: ["education", "degree", "school", "university", "mba", "study", "studied", e.school.toLowerCase()],
      text: `${e.degree} from ${e.school} (${e.start} – ${e.end}${e.detail ? `, ${e.detail}` : ""}). ${e.points.join(" ")}`,
    });
  });

  certifications.forEach((c, i) => {
    chunks.push({
      id: `cert-${i}`,
      topic: `Certification: ${c.name}`,
      keywords: ["certification", "certificate", "credential", "license", c.name.toLowerCase(), c.issuer.toLowerCase()],
      text: `${c.name}, issued by ${c.issuer} (${c.issued}${c.expires ? `, expires ${c.expires}` : ""}).`,
    });
  });

  chunks.push({
    id: "skills",
    topic: "Skills",
    keywords: ["skill", "skills", "capable", "capability", "expertise", "good at", ...topSkills.map((s) => s.toLowerCase())],
    text: `Top skills: ${topSkills.join(", ")}. Full skill set by category: ${skillCategories
      .map((c) => `${c.category} — ${c.skills.join(", ")}`)
      .join("; ")}.`,
  });

  languages.forEach((l) => {
    chunks.push({
      id: `language-${l.name}`,
      topic: `Language: ${l.name}`,
      keywords: ["language", "languages", "speak", "fluent", l.name.toLowerCase()],
      text: `${l.name}: ${l.proficiency}.`,
    });
  });

  chunks.push({
    id: "languages-all",
    topic: "Languages",
    keywords: ["language", "languages", "speak", "multilingual"],
    text: `Speaks ${languages.length} languages: ${languages.map((l) => `${l.name} (${l.proficiency})`).join(", ")}.`,
  });

  selectedWork.forEach((w, i) => {
    chunks.push({
      id: `work-${i}`,
      topic: `Project: ${w.title}`,
      keywords: ["project", "work", "initiative", "event", ...w.tags.map((t) => t.toLowerCase())],
      text: `${w.title} (${w.context}, ${w.date}). Challenge: ${w.challenge} What he did: ${w.action} Outcome: ${w.outcome} Lesson: ${w.learned}`,
    });
  });

  interests.forEach((it, i) => {
    chunks.push({
      id: `interest-${i}`,
      topic: `Interest: ${it.title}`,
      keywords: ["hobby", "hobbies", "interest", "interests", "personal", "beyond work", "art", "painting", "creative"],
      text: `${it.title}: ${it.description}`,
    });
  });

  recommendations.forEach((r, i) => {
    chunks.push({
      id: `recommendation-${i}`,
      topic: `Recommendation from ${r.name}`,
      keywords: ["recommendation", "reference", "testimonial", "colleague", "manager", r.name.toLowerCase()],
      text: `${r.name} (${r.context}) wrote: "${r.quote}"`,
    });
  });

  chunks.push({
    id: "contact",
    topic: "Contact",
    keywords: ["contact", "email", "reach", "hire", "linkedin", "connect"],
    text: `Best reached by email at ${profile.email} or on LinkedIn at ${profile.socials.linkedin}.`,
  });

  return chunks;
}
