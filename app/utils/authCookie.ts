import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "auth";
const DEFAULT_SECRET = "dev-secret-change-me";

function getSecret(): string {
  return process.env.AUTH_COOKIE_SECRET || DEFAULT_SECRET;
}

function hmac(data: string): string {
  return crypto.createHmac("sha256", getSecret()).update(data).digest("hex");
}

export function createSignedValue(value: string): string {
  const sig = hmac(value);
  return `${value}.${sig}`;
}

export function verifySignedValue(signed: string | undefined): boolean {
  if (!signed) return false;
  const idx = signed.lastIndexOf(".");
  if (idx === -1) return false;
  const value = signed.slice(0, idx);
  const sig = signed.slice(idx + 1);
  const expected = hmac(value);
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export function setAuthCookie(res: NextResponse): void {
  const signed = createSignedValue("1");
  res.cookies.set(COOKIE_NAME, signed, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
}

export function clearAuthCookie(res: NextResponse): void {
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function isAuthenticatedByCookie(): Promise<boolean> {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  return verifySignedValue(raw);
}
