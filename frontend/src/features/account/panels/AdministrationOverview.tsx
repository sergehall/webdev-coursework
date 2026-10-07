import { useEffect, useState } from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { formatAccountTime } from "../account-time";
import { ownerRequest, OwnerApiError, type OwnerProfile } from "../owner-api";
import { useOwner } from "../owner-context";
import {
  parseAccounts,
  parseAuditPage,
  parseQrStatistics,
} from "../owner-contracts";
import { parseMentorUsage } from "../admin/mentor-usage";

import { mentorRequest, MentorApiError } from "@/features/mentor/mentor-api";

type Section = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

type Summary = { value: string; detail: string };

async function loadSummary(
  id: string,
  profile: OwnerProfile
): Promise<Summary> {
  if (id === "ai-mentor") {
    const report = parseMentorUsage(
      await mentorRequest<unknown>("admin/usage?days=30&page=1")
    );
    return {
      value: `${report.totals.requestCount.toLocaleString()} AI requests`,
      detail: `${report.totals.activeAccounts.toLocaleString()} active accounts · ${report.totals.accountedNeurons.toLocaleString()} accounted Neurons · last 30 days`,
    };
  }
  if (id === "qr-report") {
    const report = await ownerRequest(`analytics?days=${profile.reportDays}`, {
      parseResponse: parseQrStatistics,
    });
    return {
      value: `${report.total.toLocaleString()} QR-link visits`,
      detail: `Anonymous visits · last ${profile.reportDays} days`,
    };
  }
  if (id === "security-activity") {
    const page = await ownerRequest(
      "audit?days=7&limit=10&result=denied&group=all",
      { parseResponse: parseAuditPage }
    );
    const latest = page.entries[0];
    return latest
      ? {
          value: "Denied activity recorded",
          detail: `Most recent: ${formatAccountTime(latest.occurredAt, profile)} · last 7 days`,
        }
      : { value: "No denied activity", detail: "Last 7 days" };
  }
  if (id === "account-roles") {
    const accounts = await ownerRequest("accounts", {
      parseResponse: parseAccounts,
    });
    const clients = accounts.filter((entry) => entry.role === "client").length;
    const admins = accounts.length - clients;
    return {
      value: `${clients.toLocaleString()} ${clients === 1 ? "client" : "clients"} · ${admins.toLocaleString()} ${admins === 1 ? "admin" : "admins"}`,
      detail: `Among the latest ${accounts.length.toLocaleString()} accounts shown`,
    };
  }
  throw new Error("Unknown administration section");
}

function OverviewCard({
  section,
  profile,
}: {
  section: Section;
  profile: OwnerProfile;
}) {
  const clear = useOwner()?.clear;
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setSummary(null);
    setError(false);
    void loadSummary(section.id, profile)
      .then((value) => {
        if (active) setSummary(value);
      })
      .catch((reason: unknown) => {
        if (!active) return;
        if (
          (reason instanceof OwnerApiError ||
            reason instanceof MentorApiError) &&
          reason.status === 401
        )
          clear?.();
        else setError(true);
      });
    return () => {
      active = false;
    };
  }, [section.id, profile, clear]);

  return (
    <Link
      className="owner-card owner-admin-link"
      to={`/account/administration/${section.id}`}
    >
      <span className="owner-admin-link-content">
        <span className="owner-admin-card-icon">
          <section.icon size={18} aria-hidden="true" />
        </span>
        <strong>{section.title}</strong>
        <span className="owner-muted">{section.description}</span>
        <span className="owner-admin-summary" aria-live="polite">
          <span className="owner-admin-summary-value">
            {summary?.value ??
              (error ? "Summary unavailable" : "Loading summary…")}
          </span>
          {summary && <span className="owner-muted">{summary.detail}</span>}
        </span>
      </span>
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}

export default function AdministrationOverview({
  sections,
  profile,
}: {
  sections: readonly Section[];
  profile: OwnerProfile;
}) {
  return (
    <section aria-label="Administration overview">
      <div className="owner-grid owner-admin-overview">
        {sections.map((section) => (
          <OverviewCard key={section.id} section={section} profile={profile} />
        ))}
      </div>
    </section>
  );
}
