import { redirect } from "next/navigation";

export default function LegacySignupRedirect() {
  redirect("/create-account");
}
