import { getSession } from "@/lib/actions";
import { JWTPayload } from "jose";
import FooterClient from "./FooterClient";

export default async function Footer() {
  const session = await getSession();

  return <FooterClient session={session as JWTPayload} />;
}
