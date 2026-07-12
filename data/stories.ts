import { COUNTRIES, MAJORS, type Major } from "@/data/universities";

export { COUNTRIES, MAJORS };
export type { Major };

export type Story = {
  id: string;
  authorName: string;
  authorAvatarSrc: string;
  authorAvatarAlt: string;
  destinationCountry: (typeof COUNTRIES)[number];
  destinationUniversity: string;
  field: Major;
  title: string;
  snippet: string;
  body: string[];
  coverImageSrc?: string;
  coverImageAlt?: string;
  reactionCount: number;
  postedDate: string;
};

export const STORIES: Story[] = [
  {
    id: "rafid-mit",
    authorName: "Rafid Hasan",
    authorAvatarSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop&facepad=2",
    authorAvatarAlt: "Portrait of a young man smiling outdoors",
    destinationCountry: "USA",
    destinationUniversity: "MIT",
    field: "Computer Science",
    title: "From a coaching center in Dhanmondi to MIT's CS PhD program",
    snippet:
      "Three rejected applications, one rebuilt SOP, and a cold email that actually landed a reply — here's what changed between cycle one and cycle two.",
    body: [
      "I applied to nine PhD programs in my first cycle and got rejected everywhere. No interviews, no waitlists, just silence. It was the lowest point of my undergrad life, and for a while I genuinely considered giving up on research altogether.",
      "What changed wasn't my CGPA or my test scores — it was my SOP. My first draft read like a resume in paragraph form. I rewrote it around one specific research question I'd been chewing on since my thesis, and suddenly professors could see exactly where I'd fit in their lab.",
      "I also started cold-emailing PhD students (not professors) at labs I was interested in. They were far more likely to reply, and their answers about lab culture and funding were more honest than anything on a department website.",
      "Second cycle: five applications, three interviews, one offer from MIT. If you're reading this after a rough first cycle, it's not over. Rebuild the story, not just the resume.",
    ],
    coverImageSrc:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80&auto=format&fit=crop",
    coverImageAlt: "Aerial view of a university campus with autumn trees",
    reactionCount: 214,
    postedDate: "2026-06-02",
  },
  {
    id: "nabila-toronto",
    authorName: "Nabila Chowdhury",
    authorAvatarSrc:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop&facepad=2",
    authorAvatarAlt: "Portrait of a smiling young woman with glasses",
    destinationCountry: "Canada",
    destinationUniversity: "University of Toronto",
    field: "Public Health",
    title: "Landing a fully-funded MPH without a scholarship agent",
    snippet:
      "Everyone told me I needed to pay an agent to find funding. I didn't — here's the exact list of scholarships I applied to and the ones that actually paid off.",
    body: [
      "When I started my MPH search, every senior I talked to recommended paying an agent 40-50 thousand taka to 'handle the funding search.' I couldn't afford that, so I built a spreadsheet instead — every scholarship, every deadline, every eligibility rule, all in one place.",
      "I applied to eleven external scholarships alongside my university applications. Most rejected me. But the Ontario Graduate Scholarship and a departmental research assistantship together covered my full tuition plus a modest stipend.",
      "The part nobody tells you: departmental RA and TA positions are often more reliable than flashy named scholarships, and professors post them quietly on lab websites months before the general application deadline.",
      "If you're staring down funding gaps, don't assume you need to pay someone. Start the spreadsheet in your second year of undergrad, not your final semester.",
    ],
    coverImageSrc:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80&auto=format&fit=crop",
    coverImageAlt: "Students walking across a snowy Canadian university campus",
    reactionCount: 156,
    postedDate: "2026-05-18",
  },
  {
    id: "tanzim-oxford",
    authorName: "Tanzim Ahmed",
    authorAvatarSrc:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80&auto=format&fit=crop&facepad=2",
    authorAvatarAlt: "Portrait of a young man in a collared shirt",
    destinationCountry: "UK",
    destinationUniversity: "University of Oxford",
    field: "Economics",
    title: "Two Clarendon rejections before the offer that changed everything",
    snippet:
      "I was rejected for the Clarendon Scholarship twice before my third application finally succeeded. The essay that got me in wasn't the one I was proudest of.",
    body: [
      "My first Clarendon application was, honestly, generic. I wrote about wanting to 'contribute to development economics' without saying anything specific. Rejected, no feedback given, which is standard for Clarendon.",
      "My second attempt was more technical — I leaned hard into my thesis methodology. Still rejected. It took a mentor pointing out that I was writing for professors, not for a funding committee, to realize my mistake.",
      "The essay that finally worked was the most personal one I wrote: why remittance economics mattered to my own family, tied directly to a specific research gap in the literature. Specific and personal beat technical and impressive.",
      "Self-funding wasn't an option for my family, so this scholarship was the only path to Oxford. If your first attempt gets rejected, that's data, not a verdict.",
    ],
    coverImageSrc:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80&auto=format&fit=crop",
    coverImageAlt: "Historic university building with spires against a blue sky",
    reactionCount: 189,
    postedDate: "2026-04-27",
  },
  {
    id: "meherun-tum",
    authorName: "Meherun Nesa",
    authorAvatarSrc:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80&auto=format&fit=crop&facepad=2",
    authorAvatarAlt: "Portrait of a smiling young woman outdoors",
    destinationCountry: "Germany",
    destinationUniversity: "Technical University of Munich",
    field: "Environmental Science",
    title: "Moving to Munich on zero tuition and a public stipend",
    snippet:
      "Germany's public universities charge no tuition even for international students — here's how I navigated the visa, blocked account, and German language requirement.",
    body: [
      "The biggest myth I had to unlearn: 'studying in Germany is basically free but impossible for international students.' It's genuinely tuition-free at public universities, but the process has real friction points nobody warns you about.",
      "The blocked account (Sperrkonto) tripped me up the most. You need roughly €11,000 locked in a German bank account before your visa is approved, and opening that account from Bangladesh takes weeks of back-and-forth with paperwork.",
      "My program was taught in English, so I didn't need fluent German for coursework, but I still took an intensive A2 course before arriving. It made apartment hunting and daily life dramatically easier.",
      "Sixteen months in, my stipend covers rent, food, and health insurance comfortably in Munich. If cost is your biggest obstacle to studying abroad, Germany deserves a serious look.",
    ],
    coverImageSrc:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80&auto=format&fit=crop",
    coverImageAlt: "European city architecture with a river and old bridge",
    reactionCount: 132,
    postedDate: "2026-04-09",
  },
  {
    id: "arefin-melbourne",
    authorName: "Arefin Kabir",
    authorAvatarSrc:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop&facepad=2",
    authorAvatarAlt: "Portrait of a young man with a beard smiling",
    destinationCountry: "Australia",
    destinationUniversity: "University of Melbourne",
    field: "Data Science",
    title: "Switching from a BBA to a Data Science master's in Australia",
    snippet:
      "My undergrad was business, not CS. Universities kept rejecting my applications until I found the one prerequisite that made all the difference.",
    body: [
      "I graduated with a BBA and a self-taught portfolio of data projects, but almost every data science master's program I applied to rejected me outright for lacking a quantitative degree.",
      "The University of Melbourne was one of the few that offered a formal bridging pathway — a graduate certificate that covers the missing math and programming prerequisites before you're admitted into the full master's.",
      "It added a semester to my timeline and a real dent to my savings, but it also meant I started the actual master's with confidence instead of playing catch-up the entire time.",
      "If your undergrad doesn't match your target field, look specifically for bridging or graduate certificate pathways before assuming a career switch abroad is impossible.",
    ],
    coverImageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format&fit=crop",
    coverImageAlt: "City skyline of Melbourne at sunset with a river in the foreground",
    reactionCount: 98,
    postedDate: "2026-03-22",
  },
  {
    id: "sadia-waterloo",
    authorName: "Sadia Islam",
    authorAvatarSrc:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80&auto=format&fit=crop&facepad=2",
    authorAvatarAlt: "Portrait of a smiling young woman with curly hair",
    destinationCountry: "Canada",
    destinationUniversity: "University of Waterloo",
    field: "Mechanical Engineering",
    title: "Co-op terms paid off my entire Waterloo tuition",
    snippet:
      "I chose Waterloo specifically for its co-op program, not its ranking. Four work terms later, my international student loan is already half paid off.",
    body: [
      "Everyone in my family assumed I'd chase the most 'prestigious' name on the list, but I picked Waterloo because of its mandatory co-op structure — six work terms alternating with academic terms over five years.",
      "My first co-op paid CAD $4,200/month at a manufacturing firm in Kitchener. That single term covered nearly two semesters of living expenses, something I hadn't budgeted for when I first calculated my abroad costs.",
      "The catch is that co-op competition is real — international students need to apply to far more postings than domestic students to land the same offer. I applied to 60+ roles in my first cycle and got two interviews.",
      "Four work terms in, tuition and living costs are no longer the terrifying number they were in first year. If your budget is tight, look hard at co-op and sandwich programs, not just rankings.",
    ],
    coverImageSrc:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80&auto=format&fit=crop",
    coverImageAlt: "Engineering students working with equipment in a workshop",
    reactionCount: 121,
    postedDate: "2026-03-05",
  },
  {
    id: "imran-stanford",
    authorName: "Imran Kader",
    authorAvatarSrc:
      "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=400&q=80&auto=format&fit=crop&facepad=2",
    authorAvatarAlt: "Portrait of a young man in a casual jacket",
    destinationCountry: "USA",
    destinationUniversity: "Stanford University",
    field: "Electrical Engineering",
    title: "GRE optional didn't mean GRE didn't matter",
    snippet:
      "My target program dropped the GRE requirement the year I applied. I submitted a score anyway — here's why that decision mattered more than I expected.",
    body: [
      "When Stanford EE went GRE-optional, half the students in my circle celebrated skipping months of prep. I decided to take it anyway, mostly because my undergrad university wasn't well known internationally.",
      "A professor I'd cold-emailed told me directly, off the record, that a strong GRE quant score still functions as a tiebreaker signal for applicants from less-recognized institutions — even on paper that says 'optional.'",
      "I scored well, submitted it, and got an interview. I'll never know for certain if it moved the needle, but I'd rather have submitted a strength than left a gap for the committee to fill in with assumptions.",
      "'Optional' rarely means 'irrelevant.' If a score can only help your specific profile, it's worth the extra few months of prep.",
    ],
    reactionCount: 175,
    postedDate: "2026-02-11",
  },
  {
    id: "farzana-imperial",
    authorName: "Farzana Yasmin",
    authorAvatarSrc:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80&auto=format&fit=crop&facepad=2",
    authorAvatarAlt: "Portrait of a smiling young woman with short hair",
    destinationCountry: "UK",
    destinationUniversity: "Imperial College London",
    field: "Physics",
    title: "A quantum computing internship led to a fully funded PhD offer",
    snippet:
      "I never planned to do a PhD. A summer research internship at Imperial changed my entire five-year plan.",
    body: [
      "I applied for a ten-week summer research internship at Imperial mostly to pad my CV before job hunting. I had zero intention of pursuing a PhD — research felt too uncertain compared to industry.",
      "The lab I landed in was working on quantum error correction, and within two weeks I was more engaged with the problem set than I'd been with any coursework in three years of undergrad.",
      "My supervisor offered me a funded PhD position before the internship even ended, based on the work I'd done in those ten weeks. I said yes within a week, which felt reckless and right at the same time.",
      "If you're unsure about research as a path, a short internship tells you more in ten weeks than any amount of overthinking will. Say yes to the internship before you say no to the PhD.",
    ],
    coverImageSrc:
      "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&q=80&auto=format&fit=crop",
    coverImageAlt: "Physics laboratory with optical equipment and lasers",
    reactionCount: 143,
    postedDate: "2026-01-30",
  },
];
