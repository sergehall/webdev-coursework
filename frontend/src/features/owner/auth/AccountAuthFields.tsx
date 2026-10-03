import { Link } from "react-router-dom";

export type AuthMode =
  | "login"
  | "reauthenticate"
  | "register"
  | "verify-email"
  | "forgot-password"
  | "reset-password"
  | "resend-verification";

type Props = {
  mode: AuthMode;
  identity: string;
  setIdentity: (value: string) => void;
  username: string;
  setUsername: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmation: string;
  setConfirmation: (value: string) => void;
  show: boolean;
  setShow: (value: boolean) => void;
  token: string;
  requiresTurnstile: boolean;
  turnstileSiteKeyAvailable: boolean;
  protectedForm: boolean;
  optionsError: boolean;
  onRetryOptions: () => void;
};

export default function AccountAuthFields({
  mode,
  identity,
  setIdentity,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  confirmation,
  setConfirmation,
  show,
  setShow,
  token,
  requiresTurnstile,
  turnstileSiteKeyAvailable,
  protectedForm,
  optionsError,
  onRetryOptions,
}: Props) {
  const isLogin = mode === "login" || mode === "reauthenticate";
  const hasPassword = [
    "login",
    "reauthenticate",
    "register",
    "reset-password",
  ].includes(mode);
  return (
    <>
      {isLogin && (
        <label>
          Username or email
          <input
            required
            autoComplete="username"
            maxLength={254}
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
          />
        </label>
      )}
      {mode === "register" && (
        <>
          <label>
            Username
            <input
              required
              autoComplete="username"
              aria-describedby="account-username-help"
              minLength={3}
              maxLength={40}
              pattern="[a-zA-Z0-9_\-]{3,40}"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <small id="account-username-help">
            3–40 letters, numbers, underscores or hyphens.
          </small>
        </>
      )}
      {["register", "forgot-password", "resend-verification"].includes(
        mode
      ) && (
        <label>
          Email
          <input
            required
            type="email"
            autoComplete="email"
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      )}
      {hasPassword && (
        <>
          <div className="owner-password-heading">
            <label htmlFor="account-password">
              {mode === "reset-password" ? "New password" : "Password"}
            </label>
            {isLogin && (
              <Link
                className="owner-text-link owner-password-help"
                to="/account/forgot-password"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <div className="owner-password-field">
            <input
              id="account-password"
              required
              type={show ? "text" : "password"}
              autoComplete={isLogin ? "current-password" : "new-password"}
              minLength={12}
              maxLength={128}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              aria-controls="account-password"
              aria-label={show ? "Hide password" : "Show password"}
              onClick={() => setShow(!show)}
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </>
      )}
      {hasPassword && !isLogin && (
        <>
          <label>
            Confirm password
            <input
              required
              type="password"
              autoComplete="new-password"
              minLength={12}
              maxLength={128}
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
            />
          </label>
          <small>Use a unique password with at least 12 characters.</small>
        </>
      )}
      {(mode === "verify-email" || mode === "reset-password") && !token && (
        <p role="alert">Open the link from your email to continue.</p>
      )}
      {requiresTurnstile && !turnstileSiteKeyAvailable && (
        <p role="alert">
          Human verification is unavailable. Please try again later.
        </p>
      )}
      {protectedForm && optionsError && (
        <p role="alert">
          Sign-in options could not load.{" "}
          <button
            type="button"
            className="owner-text-link"
            onClick={onRetryOptions}
          >
            Try again
          </button>
        </p>
      )}
    </>
  );
}
