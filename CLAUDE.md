# EasiAbroad — Project Brief (CLAUDE.md)

## What this is
EasiAbroad is a one-stop web platform helping **Bangladeshi students** plan and
execute their study-abroad journey. This build is an **investor MVP**: it should
look and feel like a real product, with all pages navigable, using placeholder/
sample data (no real backend required yet). Real data + auth come later.

## Tech stack
- **Next.js** (App Router) + React
- **TypeScript**, strict mode
- Plain CSS Modules or Tailwind (pick one and stay consistent — Tailwind recommended)
- File-based routing (one route per feature page)
- Deploy target: **Vercel**
- Sample/mock data in local `/data` files for now; structure it so a real API/DB
  (e.g. Supabase) can replace it later without rewriting components.

## Design system (LOCKED — follow exactly)
**Vibe:** bold & energetic, clean, youthful, on a light base. Trustworthy but modern.

**Colors**
- Primary blue: `#1E4FFF`
- Deep blue (gradients): `#0B2FE8`
- Accent red: `#FF3B47`
- Ink (text): `#0B1220`
- Soft background: `#F5F7FC`
- Softer fill: `#EEF2FB`
- Border line: `#E2E8F5`
- Muted text: `#5A6577`
- Paper/white: `#FFFFFF`

**Typography**
- Display / headings: **Space Grotesk** (600–700)
- Body: **Inter** (400–600)
- Labels / data / captions: **JetBrains Mono** (used sparingly, uppercase, letter-spaced)

**Style rules**
- Border radius: cards ~18px, buttons ~11px, pills 99px
- Soft shadows, generous white space, no clutter
- Signature motif: the **"boarding pass" / departure** metaphor (study abroad = a journey/departure). Use it in the hero and reuse tastefully.
- Primary button: solid blue, white text, soft blue glow shadow
- Respect: mobile responsive, visible keyboard focus (red outline), reduced-motion

## Pages / routes (build ONE at a time, test each in browser before next)
1. `/` — Home (DONE as a design reference — see abroadbuddy-home.jsx; rebuild in-project with real nav)
2. `/universities` — **University Search**: filter by CGPA, country, major, budget → ranked result cards
3. `/tools` — **AI CV · SOP · LOR generator**: free/paid AI drafts + option to hire a specialist
4. `/mentors` — **Find My Mentor** marketplace: 1:1 & group sessions, filter by country/field, booking
5. `/lab-kemon` — **Lab Kemon**: professor ratings, lab culture, funding/stipend reviews, search + detail view
6. `/stories` — **Journey Stories**: feed of study-abroad stories, filter by country/field, upload your own, reactions (V1 = post + read + filter + react)
7. `/conferences` — **Conference Calendar**: local & international conferences, research fests, paper deadlines
8. `/scholarships` — **Scholarship Calendar**: month-wise upcoming scholarships, calendar + list view, filter by country/CGPA/degree level/funding type, detail page per scholarship
9. `/resources` — **Housing & Flights**: abroad housing, flight fare info, cost-of-living
10. `/ielts` — **IELTS Mock Test** + expert marketplace (IELTS, GRE, etc.)

Shared: top nav (links to all above), footer, consistent page header pattern.

## Images
- Use only license-clean photos: **Unsplash / Pexels** (free commercial use). Fetch by URL.
- Suggested subjects: university campuses, graduation, students studying, airports/travel, libraries.
- Do NOT hard-depend on any single external image; provide graceful fallback backgrounds.
- Custom illustrations/icons: inline SVG is fine and preferred for the boarding-pass motif.

## Working style
- Build feature-by-feature, not file-by-file. Finish and test one page fully, then move on.
- Keep components reusable: `Nav`, `Footer`, `PageHeader`, `Card`, `Button`, `FilterBar`.
- Commit to git after each working page.
- Copy: plain, active voice, student-friendly, no filler. Sentence case.
