import {
  computeAesGcmTokenPair,
  computeVerifyAesGcmTokenPair,
} from "deno_csrf/mod.ts";
import "dotenv/load.ts";


const key = Deno.env.get("CSRF_KEY") || "";

export function createTokenPair() {
  return computeAesGcmTokenPair("key", 5 * 60);
}

export function verifyToken(csrfToken: string, csrfCookieToken: string) {
  return computeVerifyAesGcmTokenPair(
    key,
    csrfToken,
    csrfCookieToken,
  );
}
