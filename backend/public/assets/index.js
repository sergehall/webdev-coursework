/* global clearInterval, document, fetch, setInterval, window */

(() => {
  const statusLedNode = document.getElementById("status-led-value");
  const statusLabelNode = document.getElementById("status-label-value");
  const statusChipNode = document.getElementById("status-chip-value");
  const lastCheckedNode = document.getElementById("last-checked-value");
  const uptimeNode = document.getElementById("uptime-meta-value");
  const releaseNode = document.getElementById("release-meta-value");
  const swaggerLinkNode = document.getElementById("swagger-link-value");

  if (
    !statusLedNode ||
    !statusLabelNode ||
    !statusChipNode ||
    !lastCheckedNode ||
    !uptimeNode ||
    !releaseNode ||
    !swaggerLinkNode
  ) {
    return;
  }

  const POLL_INTERVAL_MS = 15000;
  const FALLBACK = "unavailable";

  const fetchJson = async (url) => {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
  };

  const formatUptime = (secondsValue) => {
    if (!Number.isFinite(secondsValue) || secondsValue < 0) return FALLBACK;
    const totalSeconds = Math.floor(secondsValue);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const formatCheckedAt = (date) => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(date);
    } catch {
      return date.toLocaleTimeString();
    }
  };

  const setStatus = (state, label) => {
    statusLabelNode.textContent = label;
    statusLedNode.classList.remove("is-checking", "is-down");
    statusChipNode.classList.remove("is-checking", "is-down");

    if (state === "up") {
      statusChipNode.textContent = "UP";
      return;
    }
    if (state === "down") {
      statusLedNode.classList.add("is-down");
      statusChipNode.classList.add("is-down");
      statusChipNode.textContent = "DOWN";
      return;
    }
    statusLedNode.classList.add("is-checking");
    statusChipNode.classList.add("is-checking");
    statusChipNode.textContent = "CHECK";
  };

  const setSwaggerLink = (infoValue) => {
    const docsPath =
      infoValue &&
      typeof infoValue === "object" &&
      infoValue.endpoints &&
      typeof infoValue.endpoints === "object" &&
      typeof infoValue.endpoints.docs === "string"
        ? infoValue.endpoints.docs
        : "/docs";

    swaggerLinkNode.setAttribute("href", docsPath);
  };

  const poll = async () => {
    setStatus("checking", "Checking server");
    const checkedAt = new Date();

    const [healthResult, infoResult] = await Promise.allSettled([
      fetchJson("/health"),
      fetchJson("/info"),
    ]);

    lastCheckedNode.textContent = formatCheckedAt(checkedAt);

    if (infoResult.status === "fulfilled") {
      const release = infoResult.value?.release;
      releaseNode.textContent = typeof release === "string" ? release : FALLBACK;
      setSwaggerLink(infoResult.value);
    } else {
      releaseNode.textContent = FALLBACK;
      setSwaggerLink(null);
    }

    if (
      healthResult.status === "fulfilled" &&
      healthResult.value &&
      healthResult.value.status === "ok"
    ) {
      uptimeNode.textContent = formatUptime(Number(healthResult.value.uptime));
      setStatus("up", "Server is up");
      return;
    }

    uptimeNode.textContent = FALLBACK;
    setStatus("down", "Server is down");
  };

  poll();
  const intervalId = setInterval(poll, POLL_INTERVAL_MS);

  window.addEventListener(
    "beforeunload",
    () => {
      clearInterval(intervalId);
    },
    { once: true }
  );
})();
