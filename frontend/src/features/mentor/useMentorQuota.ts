import { useCallback, useEffect, useRef, useState } from "react";

import { MentorApiError, type MentorLimits } from "./mentor-api";

function nextMinute() {
  return Math.floor(Date.now() / 60_000) * 60_000 + 60_000;
}

export function useMentorQuota(onDailyReset?: () => void) {
  const dailyReset = useRef(onDailyReset);
  dailyReset.current = onDailyReset;
  const [limits, setLimits] = useState<MentorLimits | null>(null);
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null);
  const [blockReason, setBlockReason] = useState<"daily" | "minute" | null>(
    null
  );
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!blockedUntil || blockedUntil <= Date.now()) return;
    const timer = window.setTimeout(() => {
      setNow(Date.now());
      setBlockedUntil(null);
      setBlockReason(null);
      setLimits((current) =>
        blockReason === "daily"
          ? null
          : current
            ? { ...current, minuteRemaining: 5 }
            : current
      );
      if (blockReason === "daily") dailyReset.current?.();
    }, blockedUntil - Date.now());
    return () => window.clearTimeout(timer);
  }, [blockedUntil, blockReason]);

  const load = useCallback((value: MentorLimits | undefined) => {
    if (!value) return;
    setLimits(value);
    setNow(Date.now());
    if (value.dailyRemaining <= 0) {
      setBlockReason("daily");
      setBlockedUntil(Date.parse(value.resetAt));
    } else if (value.minuteRemaining <= 0) {
      setBlockReason("minute");
      setBlockedUntil(nextMinute());
    } else {
      setBlockReason(null);
      setBlockedUntil(null);
    }
  }, []);
  const accepted = () => {
    if (limits?.dailyRemaining === 1) {
      setBlockReason("daily");
      setBlockedUntil(Date.parse(limits.resetAt));
    } else if (limits?.minuteRemaining === 1) {
      setBlockReason("minute");
      setBlockedUntil(nextMinute());
    }
    setLimits((current) =>
      current
        ? {
            ...current,
            dailyRemaining: Math.max(0, current.dailyRemaining - 1),
            minuteRemaining: Math.max(0, current.minuteRemaining - 1),
          }
        : current
    );
  };
  const completed = (remaining: number) => {
    setLimits((current) =>
      current ? { ...current, dailyRemaining: remaining } : current
    );
  };
  const failed = (error: unknown) => {
    if (!(error instanceof MentorApiError) || error.status !== 429) return;
    if (error.retryAfterSeconds === null) return;
    const seconds = error.retryAfterSeconds;
    const daily = seconds > 60 || limits?.dailyRemaining === 0;
    setBlockReason(daily ? "daily" : "minute");
    setBlockedUntil(Date.now() + seconds * 1000);
    if (daily)
      setLimits((current) =>
        current ? { ...current, dailyRemaining: 0 } : current
      );
  };
  const blocked = blockedUntil !== null && blockedUntil > now;
  const resetLabel =
    blocked && blockedUntil
      ? new Date(blockedUntil).toLocaleString(undefined, {
          dateStyle: blockReason === "daily" ? "medium" : undefined,
          timeStyle: "short",
        })
      : null;
  return {
    limits,
    blocked,
    resetLabel,
    blockReason,
    load,
    accepted,
    completed,
    failed,
  };
}
