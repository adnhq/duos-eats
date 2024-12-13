"use client";
import {
  BellRing,
  ChefHat,
  Cog,
  Home,
  Info,
  PencilRuler,
  Utensils,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { OrderType } from "@/lib/types";
import { JWTPayload } from "jose";
import SidebarNotification from "./SidebarNotification";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
  {
    title: "Orders",
    url: "/restaurant/OrderStats",
    icon: Utensils,
  },
  {
    title: "Add to Menu",
    url: "/restaurant/AddMenu",
    icon: ChefHat,
  },
  {
    title: "Edit your Menu",
    url: "/restaurant/EditMenu",
    icon: PencilRuler,
  },
  {
    title: "Notifications",
    url: "/restaurant/notifications",
    icon: BellRing,
  },
  {
    title: "Settings",
    url: "/restaurant/Settings",
    icon: Cog,
  },
];

export default function RestaurantSidebarContent({
  session,
  unseenOrders,
}: {
  session: JWTPayload;
  unseenOrders: OrderType[];
}) {
  const router = useRouter();
  const { isMobile, toggleSidebar } = useSidebar();

  function handleClick(href: string) {
    router.push(href);
    if (isMobile) {
      toggleSidebar();
    }
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.title === "Notifications" ? (
                <SidebarNotification
                  session={session}
                  notifications={unseenOrders}
                />
              ) : (
                <SidebarMenuButton
                  onClick={() => handleClick(item.url)}
                  className={
                    "flex items-center w-full space-x-2 pl-4 py-2 rounded-lg mb-1 transition-colors text-sm font-semibold"
                  }
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
