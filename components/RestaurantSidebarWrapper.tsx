import { getSession } from "@/lib/actions";
import { JWTPayload } from "jose";
import Image from "next/image";
import duosLogo from "../duos-lg.png";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./ui/sidebar";
import RestaurantSidebarContent from "./RestaurantSidebarContent";

export default async function RestaurantSidebarWrapper() {
  const session = await getSession();

  if (!session) return null;
  return (
    <Sidebar>
      <SidebarHeader className="mb-10">
        <div className="flex justify-center">
          <Image src={duosLogo} alt="DUOS Logo" width={128} height={56} />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <RestaurantSidebarContent />
      </SidebarContent>

      <SidebarFooter>
        <NavUser session={session as JWTPayload} />
      </SidebarFooter>
    </Sidebar>
  );
}
