import type { DeviceDescriptor } from "../security/device";

export const QR_CAMPAIGN = "esl10g-presentation-1";

export type QrEvent = DeviceDescriptor & {
  eventId: string;
  campaign: typeof QR_CAMPAIGN;
  occurredAt: string;
};

export type AccessAudit = {
  eventId: string;
  occurredAt: string;
  actor: "site-owner" | "anonymous";
  action: string;
  allowed: boolean;
};
