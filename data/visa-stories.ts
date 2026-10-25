// Visa stories currently cover these destinations only, separate from the
// University Finder's wider country list.
export const COUNTRIES = ["USA", "UK", "Canada", "Germany", "Australia"] as const;

export type VisaOutcome = "Approved" | "Rejected";
export const VISA_OUTCOMES: VisaOutcome[] = ["Approved", "Rejected"];

export const VISA_TYPE_BY_COUNTRY: Record<(typeof COUNTRIES)[number], string> = {
  USA: "F-1 Student Visa",
  UK: "Student Route Visa",
  Canada: "Study Permit",
  Germany: "National Visa (Type D)",
  Australia: "Subclass 500 Student Visa",
};

// Admin-approval flag: only "approved" stories are ever shown in the public feed.
// New submissions from the share form start as "pending" and are reviewed by an
// admin before they'd be published — there is no live moderation queue in this
// MVP, so every seed story below is pre-approved.
export type VisaStoryStatus = "approved" | "pending";

export type VisaStory = {
  id: string;
  authorName: string;
  authorAvatarSrc: string;
  authorAvatarAlt: string;
  destinationCountry: (typeof COUNTRIES)[number];
  visaType: string;
  outcome: VisaOutcome;
  university: string;
  title: string;
  snippet: string;
  body: string[];
  waitTimeWeeks: number;
  coverImageSrc?: string;
  coverImageAlt?: string;
  reactionCount: number;
  postedDate: string;
  status: VisaStoryStatus;
};

export const VISA_STORIES: VisaStory[] = [
  {
    id: "rumana-f1-approved",
    authorName: "Rumana Akter",
    authorAvatarSrc:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80&auto=format&fit=crop&facepad=2",
    authorAvatarAlt: "Portrait of a smiling young woman",
    destinationCountry: "USA",
    visaType: "F-1 Student Visa",
    outcome: "Approved",
    university: "Purdue University",
    title: "My F-1 interview lasted 90 seconds — here's exactly what I was asked",
    snippet:
      "I over-prepared for a 20-minute grilling and got three questions total. The prep still mattered — here's why.",
    body: [
      "Everyone in my prep group swapped horror stories about 20-minute interviews, so I walked into the Dhaka embassy expecting the same. Mine lasted under two minutes.",
      "The officer asked three things: why Purdue, how I'd fund two years of study, and what I planned to do after graduating. I answered in one or two sentences each, made eye contact, and didn't over-explain.",
      "The financial documents I over-prepared — bank statements, my sponsor's income tax returns, an affidavit of support — never even left my folder. But I'm convinced having them ready is what made my answers sound confident instead of rehearsed-nervous.",
      "If you're prepping: know your funding numbers cold, have a one-sentence answer for 'why this school,' and don't over-explain. Confident and brief beats long and anxious.",
    ],
    waitTimeWeeks: 3,
    coverImageSrc:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&auto=format&fit=crop",
    coverImageAlt: "Airplane wing above clouds during a flight",
    reactionCount: 187,
    postedDate: "2026-06-14",
    status: "approved",
  },
  {
    id: "shovon-f1-rejected-then-approved",
    authorName: "Shovon Rahman",
    authorAvatarSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop&facepad=2",
    authorAvatarAlt: "Portrait of a young man smiling outdoors",
    destinationCountry: "USA",
    visaType: "F-1 Student Visa",
    outcome: "Approved",
    university: "Arizona State University",
    title: "Rejected under 214(b) once — approved the second time with the same documents",
    snippet:
      "My first F-1 interview ended in a 214(b) refusal slip. I changed almost nothing about my paperwork and got approved five weeks later. Here's what actually changed.",
    body: [
      "My first interview was a disaster of nerves. The officer asked why I wasn't studying the same field in Bangladesh, and I froze, rambled, and contradicted myself. I walked out with a 214(b) refusal — 'failed to demonstrate strong ties to home country.'",
      "I didn't change my financial documents or my admission letter at all for round two. What I changed was how I talked about going back: I built a specific, honest answer about joining my family's business and the local industry gap my degree would fill.",
      "I also practiced out loud with a mentor for a full week, timing my answers so they stayed under 30 seconds each. Rambling reads as uncertainty, even when your case is strong.",
      "Second interview, five weeks later: approved in under three minutes. A 214(b) refusal isn't permanent and it isn't shameful — it usually means your answers, not your paperwork, need work.",
    ],
    waitTimeWeeks: 5,
    reactionCount: 241,
    postedDate: "2026-05-29",
    status: "approved",
  },
  {
    id: "nusrat-uk-approved",
    authorName: "Nusrat Jahan",
    authorAvatarSrc:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop&facepad=2",
    authorAvatarAlt: "Portrait of a smiling young woman with glasses",
    destinationCountry: "UK",
    visaType: "Student Route Visa",
    outcome: "Approved",
    university: "University of Manchester",
    title: "No interview, but the online application nearly tripped me up",
    snippet:
      "The UK Student Route usually skips the in-person interview entirely — but one mismatched date on my CAS letter almost delayed everything.",
    body: [
      "Most Bangladeshi applicants for the UK Student Route don't get an in-person interview at all — it's a document-based online application through the UKVI portal, plus biometrics at a visa application centre.",
      "The near-miss: my CAS (Confirmation of Acceptance for Studies) letter listed a course start date that didn't match what I'd entered on the online form, because the university had updated it after I'd already started my application.",
      "I caught it three days before my biometrics appointment by triple-checking every date across my CAS, offer letter, and application form against each other — they all have to match exactly.",
      "If you're applying for the UK: cross-check every date and reference number across your CAS and application form before submitting. A single mismatch can trigger unnecessary follow-up requests.",
    ],
    waitTimeWeeks: 3,
    reactionCount: 132,
    postedDate: "2026-05-11",
    status: "approved",
  },
  {
    id: "farhan-canada-approved",
    authorName: "Farhan Islam",
    authorAvatarSrc:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80&auto=format&fit=crop&facepad=2",
    authorAvatarAlt: "Portrait of a young man in a collared shirt",
    destinationCountry: "Canada",
    visaType: "Study Permit",
    outcome: "Approved",
    university: "University of British Columbia",
    title: "GIC vs. regular bank balance — what actually satisfied IRCC",
    snippet:
      "I wasted three weeks trying to prove funds with a regular savings account before switching to a Guaranteed Investment Certificate. Here's the difference that mattered.",
    body: [
      "IRCC's proof-of-funds requirement felt vague until I understood the real distinction: a regular bank statement invites questions about how long the money's been there and where it came from, while a GIC from a participating Canadian bank sidesteps that scrutiny almost entirely.",
      "I opened a GIC for roughly CAD $20,635 (the amount required at the time on top of tuition) through a bank that offers the international student program, which locks the funds and releases a portion monthly once you arrive.",
      "My study permit was approved in under four weeks after switching to the GIC route — noticeably faster than friends who submitted regular bank statements and got additional document requests.",
      "If cost and speed both matter, look into whether your target bank's GIC program is worth the setup hassle. It removed the single biggest source of back-and-forth in my application.",
    ],
    waitTimeWeeks: 4,
    coverImageSrc:
      "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?w=800&q=80&auto=format&fit=crop",
    coverImageAlt: "Traveler checking departures board at an airport terminal",
    reactionCount: 118,
    postedDate: "2026-04-22",
    status: "approved",
  },
  {
    id: "mehjabin-germany-approved",
    authorName: "Mehjabin Haque",
    authorAvatarSrc:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80&auto=format&fit=crop&facepad=2",
    authorAvatarAlt: "Portrait of a smiling young woman outdoors",
    destinationCountry: "Germany",
    visaType: "National Visa (Type D)",
    outcome: "Approved",
    university: "RWTH Aachen University",
    title: "The blocked account paperwork took longer than the visa interview itself",
    snippet:
      "Opening a Sperrkonto from Dhaka took six weeks of back-and-forth. The actual embassy interview took ten minutes.",
    body: [
      "The German student visa process is refreshingly interview-light compared to what friends described for the US, but the paperwork sequencing is unforgiving — everything has to be in a specific order before you can even book your appointment.",
      "The blocked account (Sperrkonto) was the real bottleneck. I needed roughly €11,208 locked in a designated account before applying, and opening one from Bangladesh meant weeks of emailing between two banks and waiting for wire transfer confirmations.",
      "Once the blocked account confirmation, health insurance, and university admission letter were all in hand, the actual embassy interview was closer to a document check than a real interview — about ten minutes, mostly confirming details I'd already submitted.",
      "Start the blocked account process the day you get your admission letter, not after. It's the slowest-moving piece and everything else in the application depends on it.",
    ],
    waitTimeWeeks: 8,
    reactionCount: 96,
    postedDate: "2026-04-03",
    status: "approved",
  },
  {
    id: "tanvir-australia-rejected-then-approved",
    authorName: "Tanvir Ahmed",
    authorAvatarSrc:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop&facepad=2",
    authorAvatarAlt: "Portrait of a young man with a beard smiling",
    destinationCountry: "Australia",
    visaType: "Subclass 500 Student Visa",
    outcome: "Approved",
    university: "University of Melbourne",
    title: "My GTE statement got flagged once — a rewrite fixed it",
    snippet:
      "The Genuine Temporary Entrant statement is where most Bangladeshi applications stall. Mine got a request for more information before it was finally approved.",
    body: [
      "My first Subclass 500 submission included a GTE (Genuine Temporary Entrant) statement that read like a generic personal essay — strong on ambition, vague on specifics. I got a request for additional information about my ties to Bangladesh and post-study plans.",
      "I rewrote it around concrete details: my father's manufacturing business, a specific role I'd return to, and named industry contacts I'd already spoken with about post-graduation opportunities.",
      "I also added a clearer breakdown of how my degree connected to that return plan, since the case officer specifically wants to see the abroad degree as a means to an end at home, not an end in itself.",
      "The GTE isn't a formality — it's the single document case officers weigh most heavily for Bangladeshi applicants. Be specific about your return plan, not just enthusiastic about the opportunity.",
    ],
    waitTimeWeeks: 7,
    coverImageSrc:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&auto=format&fit=crop",
    coverImageAlt: "Student boarding a flight with a backpack, walking toward the gate",
    reactionCount: 104,
    postedDate: "2026-03-15",
    status: "approved",
  },
  {
    id: "labonno-f1-refused",
    authorName: "Labonno Sultana",
    authorAvatarSrc:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80&auto=format&fit=crop&facepad=2",
    authorAvatarAlt: "Portrait of a smiling young woman with curly hair",
    destinationCountry: "USA",
    visaType: "F-1 Student Visa",
    outcome: "Rejected",
    university: "University of Illinois Urbana-Champaign",
    title: "Refused under 214(b) — sharing this so the reapplication numbers stay honest",
    snippet:
      "Not every story on this board ends in approval. I'm reapplying next cycle, and I'd rather post the refusal now than pretend it didn't happen.",
    body: [
      "I was refused at my first F-1 interview under 214(b). The officer's stated reason was that I hadn't sufficiently demonstrated intent to return to Bangladesh after my studies, despite bringing a full folder of financial and family documents.",
      "Looking back, I think I leaned too hard on the documents and not enough on a clear spoken answer. When asked about my post-graduation plans, I gave a vague answer about 'exploring opportunities,' which is close to the worst thing you can say.",
      "I'm not appealing — 214(b) refusals aren't formally appealable — but I am reapplying next cycle with a specific, rehearsed answer about the role I'd return to at my current employer.",
      "I'm posting this because most visa boards only show success stories, which makes one refusal feel like a personal failure instead of a data point. It's common, and it's not the end of the process.",
    ],
    waitTimeWeeks: 2,
    reactionCount: 89,
    postedDate: "2026-02-20",
    status: "approved",
  },
];
