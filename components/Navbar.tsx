"use client";

import { JWTPayload } from "jose";
import Image from "next/image";
import Link from "next/link";
import duosLogo from "../duos-lg.png";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { usePathname } from "next/navigation";
import { OrderType } from "@/lib/types";

export default function Navbar({
  session,
  unseenOrders,
}: {
  session: JWTPayload;
  unseenOrders: OrderType[];
}) {
  const pathname = usePathname();

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/restaurant") ||
    pathname.startsWith("/users/Dashboard")
  )
    return null;

  return (
    <nav className={`relative max-w-7xl mx-auto`}>
      <div className="absolute z-10 w-full px-4 sm:px-6 lg:px-8 py-4 ">
        <div className="flex justify-between items-center">
          <Link href="/" className="cursor-pointer">
            <Image src={duosLogo} alt="DUOS Logo" width={128} height={56} />
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavbar
            session={session as JWTPayload}
            unseenOrders={unseenOrders}
          />

          {/* Mobile Menu Button */}
          <MobileNavbar
            session={session as JWTPayload}
            unseenOrders={unseenOrders}
          />
        </div>
      </div>
    </nav>
  );
}
