import { Link, Navigate, useLocation } from "react-router-dom";
import {
  BarChart3,
  LockKeyhole,
  Settings2,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import AccountAuthPage, { authPages } from "./AccountAuthPage";
import AccountOverviewPanel from "./AccountOverviewPanel";
import AccountPreferencesPanel from "./AccountPreferencesPanel";
import MfaChallengePage from "./MfaChallengePage";
import { PageHeader } from "./OwnerPageElements";
import type { OwnerProfile } from "./owner-api";
import { useOwner } from "./owner-context";
import { ProfilePanel } from "./panels/ProfilePanel";
import { SecurityPanel } from "./panels/SecurityPanel";
import { StatisticsPanel } from "./panels/StatisticsPanel";
import "./owner.css";

const sections = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "preferences", label: "Preferences", icon: Settings2 },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "administration", label: "Administration", icon: LockKeyhole },
];

function PreferencesPanel({ profile }: { profile: OwnerProfile }) {
  return (
    <>
      <PageHeader
        title="Preferences"
        description="Set your account appearance, timestamp format, and report defaults."
      />
      <AccountPreferencesPanel profile={profile} />
    </>
  );
}

export default function OwnerPage() {
  const owner = useOwner();
  const location = useLocation();
  const path = location.pathname.split("/")[2] ?? "overview";
  const oldAuthPath =
    path === "login" ? "sign-in" : path === "register" ? "sign-up" : null;
  if (oldAuthPath)
    return (
      <Navigate
        to={{
          pathname: `/account/${oldAuthPath}`,
          search: location.search,
          hash: location.hash,
        }}
        state={location.state}
        replace
      />
    );
  if (
    !owner ||
    owner.status === "idle" ||
    (owner.status === "loading" && !owner.session)
  )
    return (
      <div className="owner-workspace">
        <p role="status">Checking account access…</p>
      </div>
    );
  if (path === "mfa")
    return (
      <div className="owner-workspace">
        <MfaChallengePage />
      </div>
    );
  if (
    authPages.includes(path) &&
    (!owner.session ||
      ["verify-email", "reset-password", "reauthenticate"].includes(path))
  )
    return (
      <div className="owner-workspace">
        <AccountAuthPage
          key={path}
          mode={
            path === "sign-in"
              ? "login"
              : path === "sign-up"
                ? "register"
                : (path as Parameters<typeof AccountAuthPage>[0]["mode"])
          }
        />
      </div>
    );
  if (!owner.session) return <Navigate to="/account/sign-in" replace />;
  const availableSections = sections.filter(
    (s) => s.id !== "administration" || owner.session?.role === "admin"
  );
  if (!availableSections.some((s) => s.id === path))
    return <Navigate to="/account/overview" replace />;
  const { profile } = owner.session;
  return (
    <div className="owner-workspace">
      <nav aria-label="Account sections" className="owner-tabs">
        {availableSections.map((item) => (
          <Link
            className="owner-tab"
            aria-current={path === item.id ? "page" : undefined}
            to={`/account/${item.id}`}
            key={item.id}
          >
            <item.icon size={16} aria-hidden="true" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="owner-content">
        {path === "profile" ? (
          <ProfilePanel profile={profile} />
        ) : path === "preferences" ? (
          <PreferencesPanel profile={profile} />
        ) : path === "security" ? (
          <SecurityPanel session={owner.session} />
        ) : path === "overview" ? (
          <>
            <PageHeader
              title={`Hello, ${profile.displayName}`}
              description="Your profile, sign-in protection, current session and saved preferences at a glance."
            />
            <AccountOverviewPanel session={owner.session} />
          </>
        ) : (
          <StatisticsPanel profile={profile} />
        )}
      </div>
    </div>
  );
}
