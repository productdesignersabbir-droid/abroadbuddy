import { UNDECIDED, type ReadinessProfile, type Todo } from "@/data/readiness";
import { SPECIALISATIONS } from "@/data/specialisations";
import type { Major } from "@/data/universities";

// Follow-up questions under the research (or, for school leavers, activities)
// answer. They sharpen the score a little and turn into specific advice.
// Answers are stored next to the main pick as `${followUpId}:${optionId}`.

export type FollowUp = {
  id: string;
  title: string;
  options: { id: string; label: string }[];
  /** Pick several; these are optional, so Next works with none ticked. */
  multi?: boolean;
  /** Picking this option opens a text box to describe it, saved as `${id}-text:…`. */
  other?: { optionId: string; label: string; placeholder: string };
};

const OTHER_TOPIC = "other";

/** "What's it about?" — the student's own field's specialisations. */
function topicFollowUp(profile: ReadinessProfile, title: string): FollowUp[] {
  if (!profile.major || profile.major === UNDECIDED) return [];
  const topics = SPECIALISATIONS[profile.major as Major];
  return [
    {
      id: "rtopic",
      title,
      other: {
        optionId: OTHER_TOPIC,
        label: "Describe your topic",
        placeholder: "e.g. Low-cost flood sensors for rural Bangladesh",
      },
      options: [
        ...topics.map((t, i) => ({ id: `t${i}`, label: t })),
        { id: OTHER_TOPIC, label: "Something else" },
      ],
    },
  ];
}

const LETTER: FollowUp = {
  id: "rletter",
  title: "Can your supervisor write you a strong letter?",
  options: [
    { id: "yes", label: "Yes" },
    { id: "unsure", label: "Not sure yet" },
  ],
};

const ACTIVITY_KINDS: FollowUp = {
  id: "rkind",
  title: "What kind? Pick all that apply",
  multi: true,
  options: [
    { id: "olympiad", label: "Olympiad" },
    { id: "science", label: "Science fair or research" },
    { id: "coding", label: "Coding or robotics" },
    { id: "debate", label: "Debate or MUN" },
    { id: "sports", label: "Sports" },
    { id: "arts", label: "Arts or music" },
    { id: "volunteer", label: "Volunteering" },
  ],
};

export function researchFollowUps(profile: ReadinessProfile, main: string | undefined): FollowUp[] {
  if (!main) return [];

  if (profile.degree === "bachelors") {
    if (main === "res-pub") {
      return [
        {
          id: "rlevel",
          title: "At what level?",
          options: [
            { id: "intl", label: "International" },
            { id: "national", label: "National" },
          ],
        },
        ACTIVITY_KINDS,
      ];
    }
    if (main === "res-review" || main === "res-ongoing") return [ACTIVITY_KINDS];
    return [];
  }

  if (main === "res-pub") {
    return [
      {
        id: "rcount",
        title: "How many papers?",
        options: [
          { id: "1", label: "1" },
          { id: "2", label: "2 – 3" },
          { id: "4", label: "4 or more" },
        ],
      },
      {
        id: "rvenue",
        title: "Where were they published?",
        other: { optionId: "journal", label: "Which journal?", placeholder: "e.g. Journal of Hydrology" },
        options: [
          { id: "q1", label: "Q1 or Q2 journal" },
          { id: "journal", label: "Other journal" },
          { id: "conf", label: "Conference" },
          { id: "mix", label: "A mix" },
        ],
      },
      {
        id: "rrole",
        title: "Your author role",
        options: [
          { id: "first", label: "First author on at least one" },
          { id: "co", label: "Co-author only" },
        ],
      },
      ...topicFollowUp(profile, "What's your main paper about?"),
    ];
  }
  if (main === "res-review") {
    return [
      {
        id: "rstage",
        title: "Which applies?",
        options: [
          { id: "review", label: "Paper under review" },
          { id: "thesis", label: "Thesis completed" },
          { id: "both", label: "Both" },
        ],
      },
      ...topicFollowUp(profile, "What's it about?"),
      LETTER,
    ];
  }
  if (main === "res-ongoing") {
    return [
      {
        id: "rtype",
        title: "What kind of work?",
        options: [
          { id: "thesis", label: "Undergraduate thesis" },
          { id: "ra", label: "Research assistant" },
          { id: "own", label: "Independent project" },
        ],
      },
      {
        id: "rdone",
        title: "When will you finish?",
        options: [
          { id: "3", label: "Within 3 months" },
          { id: "6", label: "In 3 – 6 months" },
          { id: "later", label: "Later than that" },
        ],
      },
      ...topicFollowUp(profile, "What's it about?"),
      LETTER,
    ];
  }
  if (main === "res-course") {
    return [
      {
        id: "rextra",
        title: "Done any of these? Pick all that apply",
        multi: true,
        options: [
          { id: "intern", label: "Research internship" },
          { id: "poster", label: "Conference poster or talk" },
          { id: "comp", label: "Competition or hackathon" },
          { id: "industry", label: "Industry project" },
        ],
      },
    ];
  }
  if (main === "res-none" && profile.degree !== "phd") {
    return [
      {
        id: "rplan",
        title: "Does research matter for your plan?",
        options: [
          { id: "research", label: "Yes, research master's or PhD later" },
          { id: "coursework", label: "No, a coursework master's" },
          { id: "unsure", label: "Not sure" },
        ],
      },
    ];
  }
  return [];
}

const pickOf = (answers: string[], id: string) =>
  answers.filter((a) => a.startsWith(`${id}:`)).map((a) => a.slice(id.length + 1));

/** The text a student typed for an "other" option, if any. */
export const otherText = (answers: string[], fid: string) =>
  answers.find((a) => a.startsWith(`${fid}-text:`))?.slice(fid.length + 6);

/** True while a text box for an "other" option is open, so the quiz waits for Next. */
export function otherTextOpen(profile: ReadinessProfile, answers: string[]) {
  const main = answers.find((a) => a.startsWith("res-"));
  return researchFollowUps(profile, main).some(
    (f) => f.other && pickOf(answers, f.id).includes(f.other.optionId),
  );
}

export function researchAnswered(profile: ReadinessProfile, answers: string[]) {
  const main = answers.find((a) => a.startsWith("res-"));
  if (!main) return false;
  return researchFollowUps(profile, main).every((f) => f.multi || pickOf(answers, f.id).length > 0);
}

/**
 * Adjust the main answer's points with the follow-ups, and add advice they
 * point to. Returns a points delta and extra to-dos.
 */
export function researchExtras(profile: ReadinessProfile, answers: string[]) {
  const main = answers.find((a) => a.startsWith("res-"));
  const one = (id: string) => pickOf(answers, id)[0];
  const todos: Todo[] = [];
  let delta = 0;

  if (profile.degree === "bachelors") {
    if (main === "res-pub" && one("rlevel") === "national") delta -= 2;
    const kinds = pickOf(answers, "rkind").length;
    if ((main === "res-review" || main === "res-ongoing") && kinds >= 2) delta += 2;
    return { delta, todos };
  }

  if (main === "res-pub") {
    if (one("rcount") === "1") delta -= 2;
    if (one("rrole") === "co") {
      delta -= 2;
      if (profile.degree === "phd") {
        todos.push({
          title: "Lead a paper as first author",
          detail:
            "PhD committees look for independent work. Turn part of your current research into a short paper you lead, even a workshop paper.",
          priority: "medium",
        });
      }
    }
  }
  if (main === "res-review" && one("rstage") === "both") delta += 2;
  if (main === "res-ongoing" && one("rdone") === "3") delta += 2;
  if (main === "res-course") delta += Math.min(6, pickOf(answers, "rextra").length * 2);
  if (main === "res-none" && one("rplan") === "coursework" && profile.degree === "masters") delta += 6;

  // Research that sits outside the areas the student picked earlier.
  const topic = one("rtopic");
  const focus = (profile.focus ?? []).filter((f) => f !== UNDECIDED);
  const topics = profile.major && profile.major !== UNDECIDED ? SPECIALISATIONS[profile.major as Major] : [];
  const topicLabel = topic && topic !== OTHER_TOPIC ? topics[Number(topic.slice(1))] : undefined;
  if (topic && topic !== OTHER_TOPIC && focus.length && (!topicLabel || !focus.includes(topicLabel))) {
    todos.push({
      title: `Link your research to ${focus[0].toLowerCase()}`,
      detail:
        "Your research sits outside the area you want to study. Use your SOP to show the skills that carry over, and email professors whose work bridges the two.",
      priority: "low",
    });
  }

  if (one("rletter") === "unsure") {
    todos.push({
      title: "Build a strong letter from your supervisor",
      detail:
        "Meet your supervisor regularly, share your progress and your plans, and ask for the letter at least six weeks before the first deadline.",
      priority: "medium",
    });
  }

  return { delta, todos };
}
