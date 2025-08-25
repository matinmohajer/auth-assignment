import { redirect } from "next/navigation";
import { ROUTES } from "../constants/routes";
import DashboardClient from "./pageClient";
import { isAuthenticatedByCookie } from "../utils/authCookie";

export default async function DashboardPage() {
  const isAuthed = await isAuthenticatedByCookie();

  if (!isAuthed) {
    redirect(ROUTES.AUTH);
  }

  return <DashboardClient />;
}
