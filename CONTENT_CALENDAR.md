# Content Calendar

Living document, updated by every weekly SEO/content session (automated —
see the "weekly-seo-content-review" scheduled task) and by ad-hoc work in
between. Governed by [`SEO_CONTENT_OPERATIONS.md`](SEO_CONTENT_OPERATIONS.md)
— read that first for the rules behind every decision made here.

**Zero new articles in a week is a fine outcome.** Nothing goes on the
Planned table unless it's either fully grounded in Sahil's real experience or
clearly framed as research/analysis. Never filler, never fabricated.

---

## Published

| Title | Category | Type | Published | URL |
|---|---|---|---|---|
| What a Rainstorm Taught Me About Event Operations | Operations & Management | Personal | 2026-08-07 | [/insights/what-a-rainstorm-taught-me-about-event-operations](https://sahilpoojary-website.vercel.app/insights/what-a-rainstorm-taught-me-about-event-operations) |
| 180 Units of Blood, One Afternoon | Leadership & Community | Personal | 2026-08-07 | [/insights/180-units-of-blood-one-afternoon](https://sahilpoojary-website.vercel.app/insights/180-units-of-blood-one-afternoon) |
| A Restaurant and a Factory Taught Me the Same Job | Operations & Management | Personal | 2026-08-08 | [/insights/a-restaurant-and-a-factory-taught-me-the-same-job](https://sahilpoojary-website.vercel.app/insights/a-restaurant-and-a-factory-taught-me-the-same-job) |

## Topic pillars — current state

| Pillar | Personal grounding | Research-based OK | Status |
|---|---|---|---|
| Operations & Management | Strong (Sula, Surgical Products India, NSS) | Yes | Active, best-covered |
| Leadership & Community | Strong (NSS, ELE Foundation) | Yes | Active |
| Business & Management | Moderate (MBA, ELE direction work) | Yes | Not yet started |
| MBA & Education | Real but under-detailed — see Needs Sahil | Yes | Not yet started |
| Research & Analysis | Real (UCW papers) but under-detailed — see Needs Sahil | Yes | Not yet started |
| Accounting & Finance | None yet | Yes — start here | Not yet started |
| AI + Business | None yet | Yes — start here | Not yet started |
| Technology & Digital Transformation | Light (referenced in About) | Yes | Not yet started |
| Strategy | Light (MBA-adjacent) | Yes | Not yet started |
| Career Development | Moderate (career-switch narrative) | Yes | Not yet started |

## Planned

Populated as opportunities are identified. Columns per the operations
charter: pillar, type, audience, search intent, target keyword, brand
relevance, internal link targets, backlink potential, priority, status.

| Title | Pillar | Type | Target audience | Search intent | Target keyword | Why relevant | Internal links | Backlink value | Priority | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| How AI Is Changing Business Decision-Making | AI + Business | Research | Business professionals, MBA peers | Informational | "AI business decision-making" | Establishes the AI+Business pillar without fabricating personal AI experience; Sahil's MBA/operations background gives him standing to add real analysis on top of sourced research | Author page, future AI+Business pieces | Moderate — citable, shareable in professional circles | High | Queued — needs credible-source research pass before drafting |
| AI Adoption: The Management Problem Businesses Often Overlook | AI + Business | Research | Managers, business leaders | Informational | "AI adoption management challenges" | Operations/management angle plays directly to Sahil's actual experience translating between floor-level work and leadership decisions | A Restaurant and a Factory Taught Me the Same Job (the "translator" theme is genuinely related) | Moderate | Medium | Queued |
| How Businesses Can Evaluate AI Tools | AI + Business | Research | Small/mid-size business owners, operators | Commercial investigation | "how to evaluate AI tools for business" | Practical, evaluative framing fits Sahil's operations-first voice | AI Adoption piece above | Moderate | Medium | Queued |
| What AI Means for the Future of Business Management | AI + Business | Research | MBA students, early-career managers | Informational | "AI future of business management" | Broadest of the four — best as a pillar/hub piece once the others exist | All AI+Business pieces | Moderate | Low (write last, after the others exist to link to) | Queued |

Deliberately not drafted this cycle — see weekly report for why (existing
higher-priority SEO/internal-linking work took the slot). Whoever picks
these up next: research from credible sources per the operations charter
(no scraping generic SEO-blog takes) and keep the voice analytical/curious,
not personal-experience-flavored, since Sahil hasn't lived this one yet.

## Authority & backlink opportunities

Documented so this doesn't live only in chat history. None of these have
been contacted yet — outreach is a "needs Sahil's go-ahead" action, not
something to execute unilaterally, since it's an external-facing message
sent in his name.

| Opportunity | Type | Why it's legitimate | Status |
|---|---|---|---|
| LinkedIn "Featured" section link to the site | Owned — no outreach needed | Sahil already controls this; free, immediate authority signal from an established profile | Not yet added — needs Sahil to add it himself in LinkedIn's UI |
| University Canada West alumni story submission (alumni@ucanwest.ca) | Earned | Real alum with a real MBA-completion story; UCW's own domain carries genuine education-sector authority | Drafted contact idea only — needs Sahil's approval before anything is sent in his name |

*Small list on purpose — this is a new site with three articles. Forcing a
long backlink wishlist this early would be busywork, not strategy. Revisit
and expand once there's more published content worth linking to.*

## Needs Sahil Input

Strong article ideas blocked on real information only Sahil can provide.
Nothing here gets written until answered — no invented substitute.

### What UCW's MBA Actually Changed About How I Think
- What did the MBA change about how you approach business problems?
- Which course or professor had the biggest impact, and why?
- Is there a specific concept/framework you actually use since?
- What surprised you most, going in vs. coming out?

### The Research Behind the Résumé Line
`about.full` references research papers on digital transformation, business
analysis, and eCommerce.
- What were the actual paper topics/titles?
- What was the core finding or argument in each?
- Did writing them change any of your own thinking?

### Directing a Non-Profit While Working Full-Time (ELE Foundation)
- What does the ELE Foundation role actually involve week to week?
- What's a real decision or problem you've had to work through there?
- What's different about leading in a non-profit vs. a business context?

### Should the Resume section come back?
`sections.resume` is off (your earlier call) and no `public/resume.pdf`
exists. That's respected — not changed without asking. But the master
mandate's "recruiter with 30 seconds" test flags this as a real gap: a
recruiter can piece together your background from Experience/Education/
Skills, but can't download a resume in one click. If you want it back,
drop a PDF at `public/resume.pdf` and say the word — the button already
exists and activates automatically once the file is present.

---

## Missed opportunities log

Surfaced during audits, not requested — each with an honest recommendation,
not just "here's an idea." Removed once addressed or superseded.

| Opportunity | Why it matters | Recommendation |
|---|---|---|
| Rate limiting on `/api/ask` | No abuse protection on the endpoint. Low risk today (no paid API key configured, so abuse just costs local compute), but would matter the moment an `ANTHROPIC_API_KEY` is added — an abusive script could run up real API costs. | Don't build now — needs Vercel KV or similar infra I shouldn't provision unasked. Revisit if/when a real API key gets added. |
| Site search / topic hub pages | Only 3 articles exist — a search feature or dedicated topic-cluster pages would be near-empty and read as thin/premature. | Not worth it yet. Revisit once there are ~8-10 articles across 2+ pillars. |
| Interactive career timeline / data visualization | Sounds impressive, but the existing Journey timeline + Experience cards already cover this clearly; a visualization would be decorative, not more useful. | Don't build — no real UX or SEO gain over what exists. |
| Per-article OG/Twitter images | Article links shared on LinkedIn had no dedicated share-card image — fell back to generic/none. | **Built this session** — dynamic per-article image showing title + category, plus a `twitter-image` route. |
| Fragmented Person schema across pages | Homepage, author page, and articles each declared their own disconnected `Person`/author object instead of one canonical entity — weakens entity clarity for Google/AI systems. | **Built this session** — unified via a stable `@id` (`#person`) referenced everywhere instead of redeclared. |
| Chatbot keyboard accessibility | The Ask Sahil dialog had no Escape-to-close and no focus management (open → focus lost, close → focus lost). | **Built this session** — Escape closes it, focus moves to the input on open and back to the launcher button on close. |

---

## Session log

Short append-only record so the next session (which starts with no memory)
knows what just happened without re-discovering it.

**2026-08-08 — first full-cycle test run.** Checked GSC + Bing (both still
in initial processing, no performance data yet — site verified <1 week).
Found and fixed: Google's sitemap crawl was one deploy behind (resubmitted),
the newest article was unindexed on Google (quota-blocked, will retry),
submitted it to Bing directly (quota available). Found and fixed: Selected
Work cards for Car Free Day and the NSS blood drive linked generically to
`/insights` instead of their specific matching article — added direct
per-card links. Queued 4 AI+Business research-article ideas (Sahil's own
examples) rather than drafting one this cycle, since the SEO fix + internal
linking were the higher-priority items available. Documented the two known
backlink opportunities (LinkedIn Featured, UCW alumni story) so they're not
only in chat history.

**2026-08-08 — master-mandate audit.** Rewrote `SEO_CONTENT_OPERATIONS.md`
into a full multi-disciplinary charter (SEO/UX/performance/accessibility/
security/E-E-A-T/GEO/prioritization/content-scoring) and updated the weekly
scheduled task to match. Ran a fresh audit rather than trusting prior
sessions' conclusions — found and fixed 3 real issues: (1) Insights articles
had no per-article social share image (added a dynamic `opengraph-image` +
`twitter-image` route per article); (2) the Person entity was redeclared
three separate, disconnected times across the homepage/author page/articles
instead of one linked entity (unified via `@id`); (3) the Ask Sahil dialog
had no Escape-to-close or focus management (fixed). Checked live signals:
Google/Bing performance reports are still processing (expected — very new,
low-authority site), but the homepage is confirmed indexed and already
ranks **#2** for "Sahil Poojary" and "Sahil Poojary Vancouver" behind only
his LinkedIn profile — a genuinely strong early entity-SEO result. `npm
audit` clean, no vulnerable dependencies. Logged the resume-section gap as
Needs Sahil Input rather than silently re-enabling something Sahil
explicitly turned off earlier.

---

*This file is read at the start of every weekly session — see
`SEO_CONTENT_OPERATIONS.md` for the full operating rules and
`.claude/scheduled-tasks/weekly-seo-content-review/` for the automation.*
