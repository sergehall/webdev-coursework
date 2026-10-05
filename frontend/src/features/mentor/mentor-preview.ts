// P1 is a development-only, in-memory prototype. No provider credentials or API.
export const MENTOR_PATH = "/web-developer-path/mentor";
export const mentorPreviewEnabled = import.meta.env.DEV;
const returnKey = "mentor-preview-return";

export function rememberMentorReturn() {
  if (!mentorPreviewEnabled) return;
  try {
    sessionStorage.setItem(returnKey, String(Date.now()));
  } catch {
    /* Navigation still works when storage is unavailable. */
  }
}

export function hasMentorReturn() {
  if (!mentorPreviewEnabled) return false;
  try {
    const timestamp = Number(sessionStorage.getItem(returnKey));
    const age = Date.now() - timestamp;
    return timestamp > 0 && age >= 0 && age < 30 * 60 * 1000;
  } catch {
    return false;
  }
}

export function clearMentorReturn() {
  try {
    sessionStorage.removeItem(returnKey);
  } catch {
    /* Optional navigation hint. */
  }
}
