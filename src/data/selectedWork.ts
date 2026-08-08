export type WorkEntry = {
  title: string;
  context: string;
  date: string;
  challenge: string;
  action: string;
  outcome: string;
  learned: string;
  tags: string[];
  // Slug of the Insights article that tells this story in full, if one exists.
  insightSlug?: string;
};

// Real initiatives drawn from my own experience and activity — no invented
// clients, metrics, or projects, just told in my own words.
export const selectedWork: WorkEntry[] = [
  {
    title: "Car Free Day 2025 — Event Operations with Sula",
    context: "Manager, Sula Indian Restaurant",
    date: "2025",
    insightSlug: "what-a-rainstorm-taught-me-about-event-operations",
    challenge:
      "I was representing Sula at a large public community event when, mid-way through, heavy rain suddenly hit — stalls needed protection, visitors needed guidance, and the whole setup needed adjusting fast.",
    action:
      "Instead of letting the team scramble, I split up responsibilities on the spot: some handled logistics, others kept the crowd engaged, and I focused on coordinating everyone so we could get back on track quickly.",
    outcome:
      "We adapted in real time and kept the activation running through the disruption, still representing Sula well at a vibrant community event.",
    learned:
      "Flexibility and calm decision-making matter most in live events — and teamwork isn't just dividing tasks, it's backing each other up when things don't go as planned.",
    tags: ["Event Management", "Team Coordination", "Problem Solving"],
  },
  {
    title: "NSS Blood Donation Drive — Andheri Railway Station",
    context: "Secretary, National Service Scheme (NSS) Unit, Smt. MMK College of Commerce & Economics",
    date: "College years",
    insightSlug: "180-units-of-blood-one-afternoon",
    challenge:
      "I helped lead one of the largest blood donation drives ever held at Andheri Railway Station, where every unit collected was earmarked for Thalassemia patients who depend on regular transfusions to stay alive.",
    action:
      "As Secretary of the NSS unit, I helped organize the drive and coordinate logistics and volunteers on the ground.",
    outcome: "We collected 180 units of blood — the highest ever recorded at that location.",
    learned:
      "Organizing at scale for a cause with real, ongoing stakes taught me how much disciplined logistics matters in service of something bigger than the event itself.",
    tags: ["Leadership", "Community Impact", "Logistics"],
  },
  {
    title: "Youth Opportunity Programs — ELE Foundation",
    context: "Director, ELE Foundation",
    date: "Jun 2025 – Present",
    challenge:
      "I wanted to put my time toward a non-profit built on a real idea: young people deserve the tools and opportunities to succeed, no matter where they started.",
    action:
      "As Director, I contribute to a mission built on education, leadership, and encouragement as the foundations of youth development.",
    outcome: "It's ongoing work — helping communities break the cycle of poverty by expanding access to opportunity.",
    learned:
      "Real community impact comes from building durable structures — education and leadership pathways — not one-off gestures.",
    tags: ["Non-Profit Leadership", "Community Development"],
  },
];
