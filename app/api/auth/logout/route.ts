import { NextResponse } from "next/server";
import { clearAuthCookie } from "../../../utils/authCookie";

export async function POST() {
  const res = NextResponse.json({ success: true });
  clearAuthCookie(res);
  return res;
}
