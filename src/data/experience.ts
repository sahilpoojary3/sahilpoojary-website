export type ExperienceEntry = {
  role: string;
  org: string;
  employment: string;
  start: string;
  end: string;
  location: string;
  workMode: string;
  summary: string;
  points: string[];
  skills: string[];
};

// Sourced from my own LinkedIn profile — dates, employers, and facts stay
// accurate; only the voice is mine.
export const experience: ExperienceEntry[] = [
  {
    role: "Director",
    org: "ELE Foundation",
    employment: "Contract, Part-time",
    start: "Jun 2025",
    end: "Present",
    location: "Vancouver, British Columbia, Canada",
    workMode: "Hybrid",
    summary:
      "I help direct a non-profit built around a simple idea: every young person deserves the tools and opportunities to succeed, regardless of where they started.",
    points: [
      "I work on a mission built around education, leadership, and encouragement as the foundations of youth development.",
      "Day to day, that means helping expand access to opportunity for young people who wouldn't otherwise have it.",
    ],
    skills: ["Management", "Project Management", "Team Building", "Executive Management", "Networking", "Volunteering"],
  },
  {
    role: "Manager",
    org: "Sula Indian Restaurant",
    employment: "Permanent, Full-time",
    start: "Mar 2024",
    end: "Present",
    location: "Vancouver, British Columbia, Canada",
    workMode: "On-site",
    summary:
      "I plan and run large-scale catering operations for community events, including Car Free Day and Mount Pleasant Day.",
    points: [
      "I've planned, organized, and run large catering events at community festivals like Car Free Day and Mount Pleasant Day — aiming for seamless operations and a genuinely good guest experience.",
      "I coordinate across kitchen, service, and logistics to keep high-volume catering running on tight deadlines without dropping quality.",
      "I manage vendor and stakeholder relationships, negotiate contracts, and work with event organizers to lock down good locations and visibility.",
      "I've streamlined event setup, resource allocation, and post-event reporting — it's made things faster and cheaper to run.",
    ],
    skills: ["Point of Sale (POS) Systems", "Customer Service", "Inventory Control", "Vendor Management"],
  },
  {
    role: "Mixologist",
    org: "Alchemy Bar & Kitchen",
    employment: "Part-time",
    start: "May 2025",
    end: "Aug 2025",
    location: "Yaletown, Vancouver",
    workMode: "On-site",
    summary:
      "I built original cocktails and handled high-volume guest service at a Yaletown bar and kitchen.",
    points: [
      "I created original cocktails and drink recipes that made it onto both the seasonal and permanent menus.",
      "I kept speed and accuracy up during peak hours — high-volume service without cutting corners.",
      "I built real relationships with regulars through personalized service and recommendations, which kept people coming back.",
      "I kept the bar clean, stocked, and compliant with health and safety standards.",
    ],
    skills: ["Cocktails", "Customer Service", "Hospitality Management", "Creative Content Creation"],
  },
  {
    role: "Operations Supervisor",
    org: "Surgical Products India Pvt. Ltd.",
    employment: "Full-time",
    start: "Feb 2021",
    end: "Jul 2021",
    location: "Maharashtra, India",
    workMode: "On-site",
    summary:
      "I supervised daily operations at a health and medical products company — workflow, inventory, and compliance.",
    points: [
      "I supervised daily operations and coordinated the team to keep workflow smooth.",
      "I managed inventory levels so supply never held up production.",
      "I pushed efficiency improvements that helped with cost control.",
      "I made sure we stayed compliant on safety and quality, acting as the bridge between staff and management.",
    ],
    skills: ["Operations Management", "Sales Operations", "Inventory Management", "Compliance"],
  },
];
