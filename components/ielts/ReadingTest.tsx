"use client";

import { useMemo, useState } from "react";
import type { ReadingPassage } from "@/data/ielts";

export function ReadingTest({ passage }: { passage: ReadingPassage }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    return passage.questions.reduce(
      (total, q) => (answers[q.id] === q.correctIndex ? total + 1 : total),
      0
    );
  }, [passage.questions, answers]);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === passage.questions.length;

  function selectAnswer(questionId: string, optionIndex: number) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  function retake() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div>
      <h3 className="font-display text-base font-bold text-ink">{passage.title}</h3>
      <p className="mt-3 whitespace-pre-line font-body text-[13.5px] leading-relaxed text-sub">
        {passage.text}
      </p>

      <div className="mt-6 flex flex-col gap-5 border-t border-line pt-6">
        {passage.questions.map((question, qIndex) => {
          const selected = answers[question.id];
          return (
            <div key={question.id}>
              <p className="font-body text-sm font-semibold text-ink">
                {qIndex + 1}. {question.prompt}
              </p>
              <div className="mt-2.5 flex flex-col gap-2">
                {question.options.map((option, optIndex) => {
                  const isSelected = selected === optIndex;
                  const isCorrect = optIndex === question.correctIndex;

                  let stateClass = "border-line text-ink";
                  if (submitted && isCorrect) {
                    stateClass = "border-blue bg-blue/5 text-blue";
                  } else if (submitted && isSelected && !isCorrect) {
                    stateClass = "border-red bg-red/5 text-red";
                  } else if (!submitted && isSelected) {
                    stateClass = "border-blue bg-blue/5 text-blue";
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      disabled={submitted}
                      onClick={() => selectAnswer(question.id, optIndex)}
                      className={`rounded-button border-[1.5px] px-4 py-2.5 text-left font-body text-sm font-medium transition-colors disabled:cursor-default ${stateClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {submitted ? (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-soft px-4 py-3.5">
          <div>
            <p className="font-body text-sm font-medium text-ink">Your score</p>
            <p className="font-display text-lg font-bold text-ink">
              {score} / {passage.questions.length}
            </p>
          </div>
          <button
            type="button"
            onClick={retake}
            className="rounded-button border-[1.5px] border-line px-4 py-2.5 font-body text-sm font-semibold text-ink transition-colors hover:border-blue hover:text-blue"
          >
            Retake test
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={!allAnswered}
          onClick={() => setSubmitted(true)}
          className="mt-6 w-full rounded-button bg-blue px-5 py-3 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          {allAnswered
            ? "Submit answers"
            : `Answer all questions to submit (${answeredCount}/${passage.questions.length})`}
        </button>
      )}
    </div>
  );
}
