export type Certification = {
  name: string;
  issuer: string;
  issued: string;
  expires?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
};

export const certifications: Certification[] = [
  {
    name: "Certified Digital Marketing Associate",
    issuer: "University Canada West",
    issued: "Jul 2024",
    credentialId: "CA-UCW278772",
    skills: ["Marketing", "Digital Marketing"],
  },
  {
    name: "Financial Accounting 099",
    issuer: "University Canada West",
    issued: "Mar 2024",
    credentialId: "98276519",
    skills: ["Financial Accounting"],
  },
  {
    name: "Serving It Right",
    issuer: "Responsible Service BC",
    issued: "Jan 2024",
    expires: "Jan 2029",
    credentialId: "3063757",
  },
  {
    name: "Technical Analysis",
    issuer: "Udemy",
    issued: "Aug 2023",
    credentialId: "0004",
    skills: ["Technical Analysis"],
  },
  {
    name: "Digital Advertising Certification",
    issuer: "HubSpot Academy",
    issued: "2025",
    skills: ["Digital Advertising", "Marketing Strategy"],
  },
];
