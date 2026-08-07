export type Recommendation = {
  name: string;
  context: string;
  date: string;
  quote: string;
};

export const recommendations: Recommendation[] = [
  {
    name: "Kirtika Sharma",
    context: "Technical Support | Systems Support | Data Analyst — worked with Sahil on the same team",
    date: "April 2026",
    quote:
      "I had the pleasure of working with Sahil, and he consistently stood out for his professionalism, reliability, and positive attitude. He never thinks about whether something is part of his job or not — he simply steps in and helps wherever he can. Most importantly, the way he handles clients is exceptional. His calm, professional, and understanding approach makes people feel comfortable and valued.",
  },
  {
    name: "Eleazar Noel",
    context: "Assistant Professor, Career Consultant, Business Consultant — taught and mentored Sahil during his MBA",
    date: "May 2025",
    quote:
      "Sahil is a rare combination of creativity, drive, and professionalism. As a marketer, he has a sharp strategic mind and a natural understanding of consumer behavior. What sets Sahil apart is his authenticity and strong communication skills — he connects easily with others and is a natural networker. Any team would be lucky to have someone like Sahil.",
  },
];
