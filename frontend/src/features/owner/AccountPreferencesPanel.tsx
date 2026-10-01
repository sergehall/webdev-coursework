import { useMemo, useState, type FormEvent } from "react";

import { formatAccountTime } from "./account-time";
import { ownerRequest, OwnerApiError, type OwnerProfile } from "./owner-api";
import { useOwner } from "./owner-context";

function values(profile: OwnerProfile) {
  return {
    theme: profile.theme,
    timeZone: profile.timeZone,
    reportDays: profile.reportDays,
    dateFormat: profile.dateFormat ?? "medium",
    clockFormat: profile.clockFormat ?? "12h",
    activityDays: profile.activityDays ?? 7,
    activityPageSize: profile.activityPageSize ?? 10,
  };
}

export default function AccountPreferencesPanel({
  profile,
}: {
  profile: OwnerProfile;
}) {
  const owner = useOwner()!;
  const admin = owner.session?.role === "admin";
  const [form, setForm] = useState(() => values(profile));
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [previewDate] = useState(() => new Date());
  const changed = JSON.stringify(form) !== JSON.stringify(values(profile));
  const zones = useMemo(() => {
    const list =
      typeof Intl.supportedValuesOf === "function"
        ? Intl.supportedValuesOf("timeZone")
        : [];
    return [
      ...new Set([
        "UTC",
        profile.timeZone,
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...list,
      ]),
    ].sort();
  }, [profile.timeZone]);
  function change<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((old) => ({ ...old, [key]: value }));
    setMessage("");
    setError("");
  }
  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const personal = {
        theme: form.theme,
        timeZone: form.timeZone,
        reportDays: form.reportDays,
        dateFormat: form.dateFormat,
        clockFormat: form.clockFormat,
      };
      await ownerRequest("preferences", {
        method: "PUT",
        body: admin ? form : personal,
      });
      await owner.refresh();
      setMessage("Preferences saved.");
    } catch (err) {
      if (err instanceof OwnerApiError && err.status === 401) owner.clear();
      else
        setError(
          err instanceof Error ? err.message : "Unable to save preferences."
        );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form
      className="owner-form owner-preferences"
      onSubmit={(e) => void save(e)}
    >
      <fieldset disabled={busy} className="owner-grid owner-preferences-grid">
        <section className="owner-card" aria-labelledby="appearance-title">
          <h2 id="appearance-title">Appearance</h2>
          <p className="owner-muted">
            Choose the theme used when you open your account.
          </p>
          <label>
            Account theme
            <select
              value={form.theme}
              onChange={(e) =>
                change("theme", e.target.value as typeof form.theme)
              }
            >
              <option value="system">Use portfolio theme</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <p className="owner-muted">
            Your choice applies after saving. The header button can switch the
            theme during your current visit.
          </p>
        </section>
        <section className="owner-card" aria-labelledby="time-title">
          <h2 id="time-title">Date &amp; time</h2>
          <p className="owner-muted">
            Used for session, security activity, and report update timestamps.
          </p>
          <label>
            Time zone
            <select
              value={form.timeZone}
              onChange={(e) => change("timeZone", e.target.value)}
            >
              {zones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="owner-button"
            onClick={() =>
              change(
                "timeZone",
                Intl.DateTimeFormat().resolvedOptions().timeZone
              )
            }
          >
            Use device time zone
          </button>
          <div className="owner-profile-fields">
            <label>
              Date format
              <select
                value={form.dateFormat}
                onChange={(e) =>
                  change("dateFormat", e.target.value as typeof form.dateFormat)
                }
              >
                <option value="medium">Oct 1, 2026</option>
                <option value="day-first">01/10/2026 (day/month/year)</option>
                <option value="iso">2026-10-01 (year-month-day)</option>
              </select>
            </label>
            <label>
              Clock format
              <select
                value={form.clockFormat}
                onChange={(e) =>
                  change(
                    "clockFormat",
                    e.target.value as typeof form.clockFormat
                  )
                }
              >
                <option value="12h">12-hour · 02:30 PM</option>
                <option value="24h">24-hour · 14:30</option>
              </select>
            </label>
          </div>
          <p className="owner-time-preview">
            <span className="owner-muted">Preview</span>
            <output aria-label="Date and time preview">
              {formatAccountTime(previewDate, { ...profile, ...form })}
            </output>
          </p>
          <p className="owner-muted">
            Daily visit counts remain grouped in UTC.
          </p>
        </section>
        {admin && (
          <>
            <section className="owner-card" aria-labelledby="report-title">
              <h2 id="report-title">QR analytics</h2>
              <p className="owner-muted">
                The initial period when you open Overview or Administration.
              </p>
              <label>
                Default report period
                <select
                  value={form.reportDays}
                  onChange={(e) => change("reportDays", Number(e.target.value))}
                >
                  {[7, 30, 90].map((days) => (
                    <option key={days} value={days}>
                      Last {days} days
                    </option>
                  ))}
                </select>
              </label>
            </section>
            <section
              className="owner-card"
              aria-labelledby="activity-defaults-title"
            >
              <h2 id="activity-defaults-title">Security activity defaults</h2>
              <p className="owner-muted">
                The initial filters in Administration. Only one page is loaded
                at a time.
              </p>
              <div className="owner-profile-fields">
                <label>
                  Default activity period
                  <select
                    value={form.activityDays}
                    onChange={(e) =>
                      change("activityDays", Number(e.target.value))
                    }
                  >
                    {[
                      [1, "Last 24 hours"],
                      [7, "Last 7 days"],
                      [30, "Last 30 days"],
                      [365, "Last year"],
                    ].map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Default records per page
                  <select
                    value={form.activityPageSize}
                    onChange={(e) =>
                      change("activityPageSize", Number(e.target.value))
                    }
                  >
                    {[10, 25, 50].map((size) => (
                      <option key={size} value={size}>
                        {size} records
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <p className="owner-muted">
                You can still change filters for each report without changing
                these defaults.
              </p>
            </section>
          </>
        )}
      </fieldset>
      <div className="owner-preferences-actions">
        <button
          className="owner-button owner-button--primary"
          disabled={busy || !changed}
          type="submit"
        >
          {busy ? "Saving…" : "Save preferences"}
        </button>
        <button
          className="owner-button"
          disabled={busy || !changed}
          type="button"
          onClick={() => {
            setForm(values(profile));
            setError("");
            setMessage("");
          }}
        >
          Discard changes
        </button>
        <span className="owner-muted">
          {changed ? "Unsaved changes" : "Settings saved to your account"}
        </span>
      </div>
      {message && (
        <p role="status" className="owner-message">
          {message}
        </p>
      )}
      {error && (
        <p role="alert" className="owner-message owner-message--error">
          {error}
        </p>
      )}
    </form>
  );
}
