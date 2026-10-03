import { useState, type FormEvent } from "react";
import { FaGithub } from "react-icons/fa";

import { OwnerApiError, ownerRequest, type OwnerProfile } from "../owner-api";
import { useOwner } from "../owner-context";
import { Message, PageHeader } from "../OwnerPageElements";

export function ProfilePanel({ profile }: { profile: OwnerProfile }) {
  const owner = useOwner()!;
  const [name, setName] = useState(profile.displayName);
  const [username, setUsername] = useState(profile.username ?? "");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await ownerRequest("profile", {
        method: "PUT",
        body: { displayName: name.trim(), username: username.trim() },
      });
      await owner.refresh();
      setMessage("Profile saved.");
    } catch (err) {
      setError(
        err instanceof OwnerApiError && err.status === 409
          ? "This username is already in use. Choose another username."
          : err instanceof Error
            ? err.message
            : "Unable to save profile."
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <PageHeader
        title="Profile"
        description="Manage your display name and site username."
      />
      <section className="owner-card">
        <form className="owner-form" onSubmit={(e) => void save(e)}>
          <div className="owner-profile-layout">
            <div className="owner-profile-main">
              <div className="owner-profile-fields">
                <label>
                  Display name
                  <input
                    required
                    minLength={1}
                    maxLength={80}
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-describedby="profile-name-help"
                  />
                </label>
                <label>
                  Username
                  <input
                    required
                    minLength={3}
                    maxLength={40}
                    pattern="[a-zA-Z0-9_-]{3,40}"
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    aria-describedby="profile-username-help"
                  />
                </label>
              </div>
              <p id="profile-name-help" className="owner-muted">
                Display name appears in your account menu.
              </p>
              <p id="profile-username-help" className="owner-muted">
                Username is your login on this site: 3–40 letters, numbers,
                underscores or hyphens. Changing it does not change your GitHub
                username.
              </p>
              {!profile.email && profile.githubLinked ? (
                <div className="owner-profile-signin">
                  <span className="owner-profile-signin-label">
                    Sign-in method
                  </span>
                  <div className="owner-profile-provider">
                    <FaGithub aria-hidden="true" />
                    <strong>GitHub</strong>
                    <span className="owner-profile-provider-status">
                      Connected
                    </span>
                  </div>
                  <p className="owner-muted">
                    Use your GitHub account to sign in. No email address is
                    linked to this site account.
                  </p>
                </div>
              ) : (
                <>
                  <label>
                    Email (cannot be changed)
                    <input
                      readOnly
                      value={profile.email ?? "No email stored on this account"}
                      aria-describedby="profile-email-help"
                    />
                  </label>
                  <p id="profile-email-help" className="owner-muted">
                    {profile.email
                      ? `Your registration email is permanent. ${profile.emailVerified ? "Email confirmed." : "Email not confirmed."}`
                      : "No email address is linked to this account."}
                  </p>
                </>
              )}
            </div>
            <section
              className="owner-profile-identity"
              aria-labelledby="profile-identity-title"
            >
              <h2 id="profile-identity-title">Account identity</h2>
              <dl className="owner-details">
                <div>
                  <dt>Registration</dt>
                  <dd>
                    {profile.registrationMethod === "administrator"
                      ? "Site administrator account"
                      : profile.registrationMethod === "github" ||
                          (profile.githubLinked &&
                            !profile.email &&
                            !profile.passwordEnabled)
                        ? "GitHub · Social sign-up"
                        : "Email and password"}
                  </dd>
                </div>
                <div>
                  <dt>GitHub sign-in</dt>
                  <dd>
                    {profile.githubLinked ? "Connected" : "Not connected"}
                  </dd>
                </div>
                <div>
                  <dt>Username and password sign-in</dt>
                  <dd>{profile.passwordEnabled ? "Enabled" : "Not enabled"}</dd>
                </div>
              </dl>
            </section>
          </div>
          <div className="owner-profile-footer">
            {message && <Message>{message}</Message>}
            {error && <Message error>{error}</Message>}
            <button
              className="owner-button owner-button--primary"
              disabled={busy}
              type="submit"
            >
              {busy ? "Saving…" : "Save profile"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
