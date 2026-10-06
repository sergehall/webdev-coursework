import { ArrowRight, Check, Compass } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";

import { goalLabels, type LearnerProfile } from "./mentor-demo";

const profileSchema = z.object({
  goal: z.enum(["frontend", "backend", "full-stack", "explore"]),
  level: z.enum(["beginner", "foundations", "building-projects"]),
  hours: z.coerce.number().int().min(1).max(40),
  outcome: z.string().trim().max(500),
});
const goals = ["frontend", "backend", "full-stack", "explore"] as const;
const descriptions = {
  frontend: "Interfaces people enjoy using",
  backend: "APIs, data, and reliable services",
  "full-stack": "Connect the interface to the server",
  explore: "Find the direction that fits you",
};

export default function LearnerOnboarding({
  initial,
  onComplete,
  onCancel,
  persistent = false,
}: {
  initial: LearnerProfile | null;
  onComplete: (profile: LearnerProfile) => void | Promise<void>;
  persistent?: boolean;
  onCancel?: () => void;
}) {
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = profileSchema.safeParse(
      Object.fromEntries(new FormData(event.currentTarget))
    );
    if (!result.success) {
      setError(
        "Choose a direction and level, and enter 1–40 whole hours per week."
      );
      return;
    }
    setSaving(true);
    try {
      await onComplete(result.data);
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Could not save profile."
      );
    } finally {
      setSaving(false);
    }
  }
  return (
    <section
      className="mentor-onboarding mentor-panel"
      aria-labelledby="onboarding-title"
    >
      <div className="mentor-icon">
        <Compass size={26} aria-hidden="true" />
      </div>
      <p className="mentor-eyebrow">Your starting point</p>
      <h2 id="onboarding-title">
        A little about you.
        <br />A better path ahead.
      </h2>
      <p className="mentor-muted">
        Start where you are. Your plan can change as you learn.
      </p>
      <form onSubmit={submit} className="mentor-profile-form">
        <fieldset>
          <legend>What would you like to work toward?</legend>
          <div className="mentor-goals">
            {goals.map((goal) => (
              <label className="mentor-goal" key={goal}>
                <input
                  type="radio"
                  name="goal"
                  value={goal}
                  defaultChecked={goal === (initial?.goal ?? "frontend")}
                  required
                />
                <span>
                  <strong>{goalLabels[goal]}</strong>
                  <small>{descriptions[goal]}</small>
                </span>
                <Check size={16} aria-hidden="true" />
              </label>
            ))}
          </div>
        </fieldset>
        <div className="mentor-form-row">
          <label>
            Where are you starting?
            <select name="level" defaultValue={initial?.level ?? "beginner"}>
              <option value="beginner">I'm new / not sure yet</option>
              <option value="foundations">
                I know some HTML, CSS, and JavaScript
              </option>
              <option value="building-projects">
                I'm already building projects
              </option>
            </select>
          </label>
          <label>
            Hours per week
            <input
              name="hours"
              type="number"
              min="1"
              max="40"
              step="1"
              required
              defaultValue={initial?.hours ?? 4}
            />
          </label>
        </div>
        <label>
          What would you like to build?{" "}
          <span className="mentor-muted">(optional)</span>
          <textarea
            name="outcome"
            maxLength={500}
            rows={2}
            defaultValue={initial?.outcome ?? ""}
            placeholder="A personal website, a useful little app, or something you're curious about…"
          />
        </label>
        <p className="mentor-muted mentor-small">
          English · Skills are self-reported ·{" "}
          {persistent
            ? "Your profile is saved to your account."
            : "This example resets when you leave or reload."}
        </p>
        {error && (
          <p role="alert" className="mentor-error">
            {error}
          </p>
        )}
        <div className="mentor-actions">
          <button
            className="mentor-button mentor-primary"
            type="submit"
            disabled={saving}
          >
            {initial ? "Update my profile" : "Find my starting point"}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
          {onCancel && (
            <button type="button" className="mentor-button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
