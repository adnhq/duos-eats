import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { getSession } from "@/lib/actions";
import { JWTPayload } from "jose";

import Image from "next/image";
import duosLogo from "../duos-lg.png";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

export default async function AdminSidebarWrapper() {
  const session = await getSession();

  if (!session) return null;

  return (
    <Sidebar>
      <SidebarHeader className="mb-10">
        <div className="flex justify-center">
          <Image
            src={duosLogo}
            alt="DUOS Logo"
            width={128}
            height={64}
            priority
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain />
      </SidebarContent>

      <SidebarFooter>
        <NavUser session={session as JWTPayload} />
      </SidebarFooter>
    </Sidebar>
  );
}
