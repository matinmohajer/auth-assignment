import { redirect } from "next/navigation";
import { ROUTES } from "../constants/routes";
import { isAuthenticatedByCookie } from "../utils/authCookie";
import AuthClient from "./pageClient";

export default async function AuthPage() {
  const isAuthed = await isAuthenticatedByCookie();
  if (isAuthed) {
    redirect(ROUTES.DASHBOARD);
  }
  return <AuthClient />;
}
