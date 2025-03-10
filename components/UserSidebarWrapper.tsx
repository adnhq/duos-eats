// import { getSession, getUserName } from "@/lib/actions";
// import { JWTPayload } from "jose";
// import { redirect } from "next/navigation";
// import UserSidebar from "./UserSidebar";

// export default async function UserSidebarWrapper() {
//   const session = await getSession();
//   if (!session || (session as JWTPayload).role !== "user") return redirect("/");

//   const username = await getUserName((session as JWTPayload).id);

//   return <UserSidebar username={username.split(" ")[0]} />;
// }

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
import UserSidebarContent from "./UserSidebarContent";

export default async function UserSidebarWrapper() {
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
        <UserSidebarContent />
      </SidebarContent>

      <SidebarFooter>
        <NavUser session={session as JWTPayload} />
      </SidebarFooter>
    </Sidebar>
  );
}
