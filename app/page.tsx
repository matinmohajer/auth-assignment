import { redirect } from "next/navigation";
import { ROUTES } from "./constants/routes";
import { isAuthenticatedByCookie } from "./utils/authCookie";

export default async function Home() {
  const isAuthed = await isAuthenticatedByCookie();

  if (isAuthed) {
    redirect(ROUTES.DASHBOARD);
  } else {
    redirect(ROUTES.AUTH);
  }
}
