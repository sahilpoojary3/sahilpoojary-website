export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type InsightArticle = {
  slug: string;
  title: string;
  dek: string; // one-sentence summary shown in listings and meta description
  category: string;
  publishedDate: string; // ISO date
  updatedDate?: string;
  readingMinutes: number;
  tags: string[];
  content: ContentBlock[];
};

// Every article here is grounded in Sahil's own, already-verified experience —
// no invented expertise, no generic "thought leadership" written to fill a
// publishing quota. Add new pieces only when there's a real story to tell.
//
// Voice notes (derived from Sahil's own writing on this site — keep new
// pieces consistent with this, don't drift toward generic AI-blog tone):
//   - First person, contractions throughout (I've, didn't, it's)
//   - Concrete specifics before the lesson — show the situation, then name
//     what it meant, never the other way around
//   - Short bold mini-headings framed as a plain phrase, not a question
//   - "What I learned" as a short list of aphorism + one-line elaboration
//   - Closes on a quiet, understated reflection — never a hype CTA
//   - No exclamation points, no "in today's world," no corporate buzzwords
//   - Comfortable being plain: "just work," "unglamorous," "not the point"
export const insights: InsightArticle[] = [
  {
    slug: "what-a-rainstorm-taught-me-about-event-operations",
    title: "What a Rainstorm Taught Me About Event Operations",
    dek: "Managing catering for Car Free Day when the weather turned — and what it taught me about running operations under pressure.",
    category: "Operations & Management",
    publishedDate: "2026-08-07",
    readingMinutes: 4,
    tags: ["Operations", "Event Management", "Leadership"],
    content: [
      {
        type: "paragraph",
        text: "Car Free Day 2025 was supposed to be a straightforward job: represent Sula Indian Restaurant at a large public community event, keep the catering running smoothly, and make sure people had a good experience. It mostly was — until, mid-way through the day, heavy rain suddenly hit.",
      },
      {
        type: "paragraph",
        text: "Stalls needed protection. Visitors needed guidance to safe spots. Our setup needed adjusting fast, in real time, with a crowd still on site. There was no playbook for this specific moment — just a team that needed to make good decisions quickly.",
      },
      { type: "heading", text: "Splitting up, not standing still" },
      {
        type: "paragraph",
        text: "The instinct in a moment like that is to freeze, or to have everyone try to fix everything at once. Neither works. Instead, we split up responsibilities on the spot: some people handled logistics — moving stock, securing the stalls, protecting equipment. Others focused on keeping the crowd calm and engaged, since a room full of anxious people creates its own problems. I focused on coordinating between the two groups so decisions didn't get made twice, or missed entirely.",
      },
      {
        type: "paragraph",
        text: "None of this was planned in advance. It came from having a team that trusted each other enough to take a piece of the problem without waiting to be told exactly what to do.",
      },
      { type: "heading", text: "What actually mattered" },
      {
        type: "list",
        items: [
          "Flexibility beats a rigid plan. The plan for the day was fine — it just didn't account for the weather, and no plan fully does.",
          "Calm is contagious, in both directions. The moment someone visibly panics, it spreads through a team faster than the actual problem does.",
          "Teamwork isn't dividing tasks in advance — it's backing each other up when the division of tasks stops making sense.",
        ],
      },
      {
        type: "paragraph",
        text: "We got the activation running again before the disruption did any real damage, and the event finished representing Sula the way it was supposed to. But the thing I actually took away from that day wasn't about catering logistics. It was a small, concrete lesson in what \"operations\" actually means when you strip away the spreadsheets: it's a group of people making fast, coordinated decisions when the plan stops matching reality. Fieldwork teaches you that in a way a classroom can't.",
      },
    ],
  },
  {
    slug: "180-units-of-blood-one-afternoon",
    title: "180 Units of Blood, One Afternoon",
    dek: "What organizing the largest blood donation drive at Andheri Railway Station taught me about logistics in service of something bigger than the event itself.",
    category: "Leadership & Community",
    publishedDate: "2026-08-07",
    readingMinutes: 4,
    tags: ["Leadership", "Community Impact", "Logistics"],
    content: [
      {
        type: "paragraph",
        text: "As Secretary of the National Service Scheme (NSS) unit at Smt. MMK College of Commerce & Economics, I helped lead and organize one of the largest blood donation drives ever held at Andheri Railway Station. By the end of the day, we'd collected 180 units of blood — the highest ever recorded at that location.",
      },
      {
        type: "paragraph",
        text: "The number itself isn't really the point. What stayed with me was what the doctors told us afterward: every single unit collected that day was earmarked for Thalassemia patients — people who depend on regular transfusions simply to stay alive. That reframed the entire event for me. This wasn't a campus activity with a good turnout. It was logistics with a direct, ongoing line to someone's health.",
      },
      { type: "heading", text: "Scale is a logistics problem before it's anything else" },
      {
        type: "paragraph",
        text: "Getting to 180 units at a public railway station — not a hospital, not a controlled environment — meant solving a lot of unglamorous problems: volunteer scheduling, donor flow, keeping lines moving without making the process feel rushed, coordinating with medical staff, managing space in a location that wasn't built for this. None of that is inspiring on its own. It's just work. But it's the work that determines whether a good cause turns into an actual outcome.",
      },
      { type: "heading", text: "What I took from it" },
      {
        type: "list",
        items: [
          "A cause is not the same as an outcome. Good intentions organize the event; disciplined logistics is what actually gets 180 units collected.",
          "Scale changes the job. Running a small donation table and running a station-wide drive are different problems, not the same problem done bigger.",
          "Knowing the stakes changes how you work. Once we knew where the blood was going, the small logistical decisions stopped feeling small.",
        ],
      },
      {
        type: "paragraph",
        text: "I've carried that lesson into everything since — from running catering operations at community events to the non-profit work I do now with ELE Foundation. The instinct is the same: figure out what actually moves the outcome, and put the discipline there, not just in the parts of the work that feel meaningful in the moment.",
      },
    ],
  },
  {
    slug: "a-restaurant-and-a-factory-taught-me-the-same-job",
    title: "A Restaurant and a Factory Taught Me the Same Job",
    dek: "Operations Supervisor at a surgical products company, then Manager at a catering business — different industries, same underlying skill.",
    category: "Operations & Management",
    publishedDate: "2026-08-08",
    readingMinutes: 4,
    tags: ["Operations", "Career", "Leadership"],
    content: [
      {
        type: "paragraph",
        text: "Before Sula, before ELE Foundation, I spent six months as an Operations Supervisor at Surgical Products India — a health and medical products company in Maharashtra. Different industry, different country, different stakes entirely from catering. But when I started managing operations for Sula's catering business in Vancouver a few years later, a lot of it felt oddly familiar.",
      },
      { type: "heading", text: "The details change. The job doesn't." },
      {
        type: "paragraph",
        text: "At Surgical Products, inventory had to be right because a shortage meant a production line waiting on parts, not a customer complaining. At Sula, inventory means prep quantities, POS stock, and having enough on hand for a catering job at a community event without over-ordering and eating the cost. The consequences are completely different. The actual skill — know what you have, know what you'll need, don't guess — is the same one.",
      },
      { type: "heading", text: "The part nobody puts on a job title" },
      {
        type: "paragraph",
        text: "At the factory, a big part of the role was acting as the communication bridge between staff and management — translating what was happening on the floor into something leadership could act on, and translating decisions back down in a way the team could actually use. At Sula, that same function shows up as vendor and stakeholder management: negotiating with suppliers, coordinating with event organizers, making sure the kitchen, service, and logistics teams aren't working from three different versions of the plan. Nobody hires for \"being the translator between two groups who don't talk to each other enough.\" But it's most of what operations work actually is.",
      },
      { type: "heading", text: "What stuck with me" },
      {
        type: "list",
        items: [
          "Inventory discipline isn't glamorous, but it's the same muscle whether it's surgical components or catering supplies.",
          "Being the go-between is a real, learnable skill — not just something that happens to whoever's in the middle.",
          "Most operations jobs are the same job wearing a different uniform. The room changes. The problem doesn't.",
        ],
      },
      {
        type: "paragraph",
        text: "I don't think of my work history as separate chapters — a manufacturing stint here, a hospitality job there, unrelated to each other. It's closer to the same exercise, done in different rooms, with different things on the line. That's part of why I don't worry much about switching industries. The room is rarely the hard part.",
      },
    ],
  },
];
