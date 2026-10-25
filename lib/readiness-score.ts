import {
  AREA_MAX,
  READINESS_QUESTIONS,
  type Priority,
  type ReadinessArea,
  type Todo,
} from "@/data/readiness";

// Single-choice areas store one option id; the documents checklist stores many.
export type ReadinessAnswers = Partial<Record<ReadinessArea, string[]>>;

export type AreaResult = {
  area: ReadinessArea;
  label: string;
  points: number;
};

export type RankedTodo = Todo & { areaLabel: string };

export type ReadinessTier = {
  label: string;
  summary: string;
};

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

export function isAnswered(
  answers: ReadinessAnswers,
  index: number
): boolean {
  const q = READINESS_QUESTIONS[index];
  // A checklist with nothing ticked is still a valid answer.
  if (q.kind === "checklist") return true;
  return (answers[q.area]?.length ?? 0) > 0;
}

export function scoreAnswers(answers: ReadinessAnswers) {
  const areas: AreaResult[] = [];
  const todos: RankedTodo[] = [];

  for (const q of READINESS_QUESTIONS) {
    const picked = new Set(answers[q.area] ?? []);
    let points = 0;

    for (const option of q.options) {
      const chosen = picked.has(option.id);
      if (chosen) points += option.points;

      // Single choice: the chosen answer carries the to-do.
      // Checklist: every unticked item becomes a to-do.
      const todoApplies = q.kind === "single" ? chosen : !chosen;
      if (todoApplies && option.todo) {
        todos.push({ ...option.todo, areaLabel: q.areaLabel });
      }
    }

    areas.push({ area: q.area, label: q.areaLabel, points: Math.min(points, AREA_MAX) });
  }

  todos.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);

  const total = areas.reduce((sum, a) => sum + a.points, 0);
  return { total, areas, todos, tier: tierFor(total) };
}

export function tierFor(total: number): ReadinessTier {
  if (total >= 80) {
    return {
      label: "Ready for takeoff",
      summary: "Your profile is strong. Finalise your shortlist and start applying.",
    };
  }
  if (total >= 60) {
    return {
      label: "Almost boarding",
      summary: "You're close. Clear the high-priority items below and you're ready to apply.",
    };
  }
  if (total >= 40) {
    return {
      label: "Checking in",
      summary: "You have a solid base. Give yourself 6–12 months to close the gaps below.",
    };
  }
  return {
    label: "Planning your trip",
    summary: "You're at the start — that's fine. Work through the list below one step at a time.",
  };
}
