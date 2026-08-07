export type EducationEntry = {
  school: string;
  degree: string;
  start: string;
  end: string;
  detail?: string;
  points: string[];
  skills?: string[];
};

export const education: EducationEntry[] = [
  {
    school: "University Canada West",
    degree: "Master of Business Administration (MBA)",
    start: "Jan 2024",
    end: "Aug 2025",
    points: [
      "Specialized in leadership, marketing management, and entrepreneurship within the Canadian business environment.",
      "Learned what it actually takes to build and scale a business from the ground up.",
      "Researched digital transformation, eCommerce, and business analysis.",
      "Sharpened strategic thinking and communication through case studies and group work.",
    ],
    skills: ["Project Management", "Managerial Skills"],
  },
  {
    school: "University of Mumbai",
    degree: "Bachelor of Commerce (BCom), Accounting and Finance",
    start: "Jul 2020",
    end: "May 2023",
    detail: "Grade: 8.81",
    points: [
      "Built a foundation in business, accounting, and finance.",
      "Served as Secretary of the National Service Scheme (NSS) unit.",
      "Kept up sketching and painting alongside coursework.",
    ],
    skills: ["Finance", "Accounting"],
  },
];
