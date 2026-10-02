import { createHmac, timingSafeEqual } from "crypto";
import { HttpException } from "@nestjs/common";
import { urlencoded, type Request, type Response } from "express";
import type { TurnstileService } from "../../security/turnstile/turnstile.service";

import {
  swaggerTurnstilePage,
  swaggerTurnstileScript,
} from "./swagger-turnstile.view";

/** Documentation-only access gate, called after Basic Auth and request throttling. */
export function swaggerTurnstileGate(
  turnstile: TurnstileService,
  credentials: Buffer | null
) {
  const production = process.env.NODE_ENV === "production";
  const cookieName = production
    ? "__Host-webdev_docs_verified"
    : "webdev_docs_verified";
  const parser = urlencoded({ extended: false, limit: "4kb" });
  // Bind clearance to documentation, current Basic credentials and the API host.
  // Secret/credential rotation invalidates existing cookies across every replica.
  const sign = (expires: string, req: Request) =>
    createHmac("sha256", process.env.TURNSTILE_SECRET_KEY ?? "")
      .update(
        `api-docs:${expires}:${credentials?.toString("hex") ?? ""}:${req.get("host")}`
      )
      .digest("base64url");
  function verified(req: Request): boolean {
    if (!process.env.TURNSTILE_SECRET_KEY) return false;
    const cookie = (req.get("cookie") ?? "")
      .split(";")
      .map((value) => value.trim())
      .find((value) => value.startsWith(`${cookieName}=`))
      ?.slice(cookieName.length + 1);
    // Validate shape/expiry before comparing fixed-length signatures in constant time.
    const match = /^(\d{13})\.([A-Za-z0-9_-]{43})$/.exec(cookie ?? "");
    if (!match) return false;
    const expiry = Number(match[1]);
    if (expiry <= Date.now() || expiry > Date.now() + 600000) return false;
    return timingSafeEqual(
      Buffer.from(match[2]),
      Buffer.from(sign(match[1], req))
    );
  }
  return async (req: Request, res: Response): Promise<boolean> => {
    const { turnstileRequired, turnstileSiteKey } = turnstile.publicOptions();
    if (!turnstileRequired) return false;
    // Serve only the gate's script before clearance; Swagger assets/schemas stay protected.
    if (req.path === "/docs/turnstile.js" && req.method === "GET") {
      res.type("application/javascript").send(swaggerTurnstileScript);
      return true;
    }
    if (req.path === "/docs/turnstile-verify" && req.method === "POST") {
      if (req.get("origin") !== `${req.protocol}://${req.get("host")}`) {
        res.status(403).json({
          code: "TURNSTILE_REJECTED",
          message: "Trusted documentation origin required",
        });
        return true;
      }
      // Parse a bounded body and redeem only same-origin tokens; never accept tokens in URLs.
      await new Promise<void>((resolve) =>
        parser(req, res, async (error) => {
          if (error) {
            res.status(400).json({ message: "Invalid verification request" });
            resolve();
            return;
          }
          try {
            await turnstile.verify(req.body?.token, "api_docs");
            const expires = String(Date.now() + 600000);
            // Path=/ covers /docs and /openapi.*; __Host- requires Secure and no Domain.
            res.cookie(cookieName, `${expires}.${sign(expires, req)}`, {
              httpOnly: true,
              secure: production,
              sameSite: "strict",
              path: "/",
              maxAge: 600000,
            });
            res.status(200).json({ verified: true });
          } catch (failure) {
            if (failure instanceof HttpException)
              res.status(failure.getStatus()).json(failure.getResponse());
            else
              res
                .status(503)
                .json({ message: "Human verification is unavailable" });
          }
          resolve();
        })
      );
      return true;
    }
    if (verified(req)) return false;
    if (
      (req.path === "/docs" || req.path === "/docs/") &&
      req.method === "GET"
    ) {
      res.type("html").send(swaggerTurnstilePage(turnstileSiteKey));
      return true;
    }
    res.status(403).json({
      code: "TURNSTILE_REQUIRED",
      message: "Open /docs and complete human verification first",
    });
    return true;
  };
}
