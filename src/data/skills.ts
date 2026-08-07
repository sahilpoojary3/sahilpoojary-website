export type SkillCategory = {
  category: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Business",
    skills: ["Business Strategy", "Operations Management", "Sales Operations", "Analytical Skills", "Inventory Control"],
  },
  {
    category: "Leadership",
    skills: ["Executive Management", "Team Management", "Team Building", "Networking", "Volunteering"],
  },
  {
    category: "Marketing",
    skills: ["Digital Marketing", "Creative Content Creation", "Communication"],
  },
  {
    category: "Operations & Service",
    skills: ["Point of Sale (POS) Systems", "Customer Service", "Hospitality Management"],
  },
];

// Flat list as shown at the top of the LinkedIn profile.
export const topSkills = [
  "Communication",
  "Management",
  "Team Management",
  "Analytical Skills",
  "Digital Marketing",
];
