import { Link, Navigate, useLocation } from "react-router-dom";
import { Bot, LayoutDashboard, QrCode, ShieldCheck, Users } from "lucide-react";

import AccountRolesPanel from "../AccountRolesPanel";
import MentorUsagePanel from "../admin/MentorUsagePanel";
import { PageHeader } from "../OwnerPageElements";
import SecurityActivityPanel from "../SecurityActivityPanel";
import type { OwnerProfile } from "../owner-api";
import { useOwner } from "../owner-context";

import AdministrationOverview from "./AdministrationOverview";
import QrReportPanel from "./QrReportPanel";
import "../admin/administration.css";

const sections = [
  {
    id: "overview",
    icon: LayoutDashboard,
    label: "Overview",
    title: "Overview",
    description: "Choose an administration report or account control.",
    primaryOnly: false,
  },
  {
    id: "ai-mentor",
    icon: Bot,
    label: "AI Mentor",
    title: "AI Pathway Mentor",
    description: "Review usage, reported tokens, and per-account AI access.",
    primaryOnly: true,
  },
  {
    id: "qr-report",
    icon: QrCode,
    label: "QR report",
    title: "About this QR report",
    description: "Explore QR-link visits, devices, and report details.",
    primaryOnly: false,
  },
  {
    id: "security-activity",
    icon: ShieldCheck,
    label: "Security activity",
    title: "Security activity",
    description: "Review account actions and analytics access.",
    primaryOnly: false,
  },
  {
    id: "account-roles",
    icon: Users,
    label: "Account roles",
    title: "Clients and administrators",
    description: "Review accounts and manage their roles.",
    primaryOnly: true,
  },
] as const;

const sectionPath = (id: string) =>
  `/account/administration${id === "overview" ? "" : `/${id}`}`;

export function StatisticsPanel({ profile }: { profile: OwnerProfile }) {
  const location = useLocation();
  const canManageRoles = useOwner()?.session?.canManageRoles === true;
  const parts = location.pathname.split("/").filter(Boolean);
  const activeId = parts[2] ?? "overview";
  const available = sections.filter(
    (section) => !section.primaryOnly || canManageRoles
  );

  if (parts.length > 3 || !available.some((section) => section.id === activeId))
    return <Navigate to={sectionPath("overview")} replace />;

  return (
    <div className="owner-administration">
      <PageHeader
        title="Administration"
        description="Usage reports, security monitoring, and account access."
      />
      <nav
        aria-label="Administration sections"
        className="owner-tabs owner-admin-tabs"
      >
        {available.map((section) => (
          <Link
            key={section.id}
            className="owner-tab"
            to={sectionPath(section.id)}
            aria-current={section.id === activeId ? "page" : undefined}
          >
            <section.icon size={15} aria-hidden="true" />
            {section.label}
          </Link>
        ))}
      </nav>
      {activeId === "overview" ? (
        <AdministrationOverview
          sections={available.slice(1)}
          profile={profile}
        />
      ) : activeId === "ai-mentor" ? (
        <MentorUsagePanel profile={profile} />
      ) : activeId === "qr-report" ? (
        <QrReportPanel profile={profile} />
      ) : activeId === "security-activity" ? (
        <SecurityActivityPanel />
      ) : (
        <AccountRolesPanel />
      )}
    </div>
  );
}
