import { setupAnalyticsIntegration } from "../../test/analytics/integration/support/test-environment";
import { registerMfaScenarios } from "../../test/analytics/integration/scenarios/mfa.scenarios";
import { registerActiveSessionScenarios } from "../../test/analytics/integration/scenarios/active-sessions.scenarios";
import { registerProfilePreferenceScenarios } from "../../test/analytics/integration/scenarios/profile-preferences.scenarios";
import { registerQrReportingScenarios } from "../../test/analytics/integration/scenarios/qr-reporting.scenarios";
import { registerRegistrationMailScenarios } from "../../test/analytics/integration/scenarios/registration-mail.scenarios";
import { registerAccessSecurityScenarios } from "../../test/analytics/integration/scenarios/access-security.scenarios";
import { registerAccountProviderScenarios } from "../../test/analytics/integration/scenarios/account-providers.scenarios";

const run =
  process.env.OWNER_INTEGRATION_TEST === "true" ? describe : describe.skip;

run("Owner HTTP and PostgreSQL integration", () => {
  const getContext = setupAnalyticsIntegration();

  // Preserve scenario order: the suite intentionally shares persisted state.
  registerMfaScenarios(getContext);
  registerActiveSessionScenarios(getContext);
  registerProfilePreferenceScenarios(getContext);
  registerQrReportingScenarios(getContext);
  registerRegistrationMailScenarios(getContext);
  registerAccessSecurityScenarios(getContext);
  registerAccountProviderScenarios(getContext);
});
