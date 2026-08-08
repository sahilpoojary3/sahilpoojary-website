# SEO, Content & Brand Operations Charter

This file is the standing operating manual for anyone (human or AI session)
doing ongoing SEO, content, or growth work on this site. It is loaded
automatically into Claude Code sessions in this repo via `CLAUDE.md`. A
weekly scheduled task also re-reads it every run — it has no memory of past
sessions, so this document (plus `CONTENT_CALENDAR.md`) is its only continuity.

Owner: Sahil Poojary. Site: https://sahilpoojary-website.vercel.app
(short alias: https://sahilpoojary.vercel.app — does not auto-follow deploys,
must be re-pinned after every production deploy, see Deploy Workflow below).

## Non-negotiable rules

1. **Never fabricate.** No invented jobs, achievements, credentials,
   testimonials, statistics, opinions, or personal experiences — ever, for
   any reason, including to hit a content quota. If something is missing,
   ask Sahil (see "Needs Sahil" queue) or don't publish.
2. **Quality over quantity, always.** Zero new articles in a given week is a
   completely acceptable, expected outcome. Never publish filler to keep a
   cadence.
3. **Two content types only** — and every article must be clearly one or the
   other:
   - **Grounded personal content**: based directly on Sahil's real education,
     work history, projects, and experiences. First person. Zero fabrication.
   - **Research-based professional content**: broader business/management/AI
     topics Sahil hasn't necessarily lived personally. Framed explicitly as
     research/analysis ("How AI Is Changing Business Decision-Making"), never
     disguised as personal experience ("My experience using AI to..." when he
     hasn't). Written in his natural voice, grounded in credible sources
     (government, universities, peer-reviewed research, established business
     publications, official documentation) — not SEO blogs copying each
     other. Cite/link sources where useful.
4. **Never sacrifice design, truth, or Sahil's actual identity for SEO
   metrics.** The site is a credible professional knowledge platform, not a
   content farm.

## Priority order for every session

Work through in this order and stop at the highest-value action — do not
mechanically execute every category every week:

1. SEO opportunities (technical issues, indexing problems, quick wins)
2. Existing content improvements (expand/update/re-link underperforming or
   outdated pieces)
3. Technical improvements (schema, performance, crawlability, canonicals)
4. New content (only when a genuinely strong, well-grounded topic exists)
5. Authority / backlinks (legitimate outreach and link-worthy assets)

Use judgment, not a fixed checklist. If one category has an obviously bigger
opportunity than the others, do that first even if it's out of order.

## What to check each session

**SEO**: Search Console (queries, impressions, clicks, CTR, average position,
pages gaining/losing visibility, crawl/indexing issues, sitemap status),
Bing Webmaster Tools (same), canonical consistency, robots.txt, technical SEO.

**Content**: performance of existing articles, expansion candidates, content
gaps against the topic pillars below, internal linking gaps, outdated info.

**Personal brand**: how "Sahil Poojary" appears in search, whether the site
clearly communicates who he is, entity/schema consistency, positioning.

**AI/GEO**: is content easy for AI systems to parse and cite — clear entity
relationships, structured data, author credibility signals, original
analysis (not rehashed generic content), legitimate FAQ/definition
opportunities.

**Authority**: backlink opportunities, link-worthy content ideas, real
publication/guest-contribution/interview/alumni opportunities. Never
spammy link schemes.

## Browser-based checks (Search Console / Bing)

Use the `claude-in-chrome` MCP tools — Sahil's real Google/Microsoft sessions
are already authenticated there. **Hard rule, no exceptions:** if any step
asks for a Google/Microsoft account password, 2FA code, verification code,
or recovery code, STOP immediately at that exact step and flag it in the
"Needs Sahil" section of the report. Never ask Sahil for these credentials in
chat, never store them, never attempt to work around the prompt.

## Topical authority — build gradually, don't force it

Target clusters, built organically based on what Sahil actually knows, is
studying, is working on, and what has real search opportunity — not all at
once:

- Business & Management
- MBA & Education
- Operations (currently the strongest-covered pillar)
- Accounting & Finance (currently research-based only — no personal grounding yet)
- AI + Business (currently research-based only — no personal grounding yet)
- Technology & Digital Transformation
- Strategy
- Career Development

For pillars with no personal grounding yet (Accounting/Finance, AI+Business),
start with research-based articles and explicitly note in the calendar that
personal-perspective pieces are pending real experience from Sahil. As Sahil
provides real information over time, incorporate it into future pieces.

## "Needs Sahil" queue

When a strong article idea depends on information only Sahil can provide,
don't invent it — add it to the "Needs Sahil Input" section of
`CONTENT_CALENDAR.md` with the specific questions needed to write it
responsibly (e.g. "What did the UCW MBA actually change about how you think
about business? Which course had the biggest impact? What's a concept you
actually use now? What surprised you?"). Resume writing once answered.

## Internal linking

Every new article gets a "Related reading" section (see
`src/app/insights/[slug]/page.tsx`) and should be considered as a link target
from relevant existing pages. Don't force links that don't make sense — the
goal is a logical knowledge graph, not link density.

## Content calendar discipline

`CONTENT_CALENDAR.md` is a living document. Every session should:
- Update the Published table when something ships
- Add new ideas as they're discovered, with pillar, type (personal/research),
  target audience, search intent, target keyword, why it fits Sahil's brand,
  potential internal links, potential backlink value, priority, status
- Remove ideas that no longer make sense
- Keep "Needs Sahil Input" current

## Deploy workflow (this repo specifically)

1. `npx eslint .` then `npm run build` — both must be clean before deploying
2. `git add <files>` (never `git add -A`), commit with a message explaining
   the *why*, push
3. `vercel --prod --yes`
4. `vercel alias set sahilpoojary-website.vercel.app sahilpoojary.vercel.app`
   — required every time; the short alias is a static pin, not a live-following
   alias, and silently serves a stale deploy if this step is skipped
5. Verify live: page loads, metadata/canonical/JSON-LD correct, appears in
   `/sitemap.xml`, no console errors, mobile layout OK. Never claim something
   is "live," "indexed," or "verified" without actually checking it.

## Weekly report format

Keep it short — don't report for the sake of reporting:

- **DONE** — what actually changed
- **PUBLISHED** — any new articles (title + URL)
- **IMPROVED** — existing pages/content upgraded
- **SEO** — meaningful ranking/impression/CTR/indexing changes
- **TECHNICAL** — technical fixes
- **NEXT** — priority for next session
- **NEEDS SAHIL** — only genuine questions/information gaps, with exactly why
  each one is needed

## Operating principle

Think like an SEO engineer + investigative researcher + professional writer
+ content strategist + personal brand manager + technical developer — not a
checklist executor. Pursue the best opportunity, not the planned one, when a
better one is found. Don't ask "what should I work on" — decide, using this
file, the content calendar, search data, and the current state of the site.
Only ask Sahil when the information genuinely can't come from anywhere else.
