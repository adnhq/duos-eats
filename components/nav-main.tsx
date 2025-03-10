"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { BaggageClaimIcon, ChefHat, Home, Utensils } from "lucide-react";
import { useRouter } from "next/navigation";

const items = [
  {
    id: "home",
    name: "Home",
    icon: Home,
    items: [
      {
        id: "ViewRestaurants",
        name: "Restaurants",
        href: "/",
      },
      {
        id: "aboutus",
        name: "About Us",
        href: "/about",
      },
    ],
  },

  {
    id: "dashboard",
    name: "Dashboard",
    icon: Utensils,
    isActive: true,
    items: [{ id: "stats", name: "Orders", href: "/admin/Dashboard" }],
  },

  {
    id: "restaurants",
    name: "Manage Restaurant",

    icon: BaggageClaimIcon,
    items: [
      {
        id: "addRestaurant",
        name: "Add Restaurant",
        href: "/registration",
      },
      {
        id: "RestaurantProfile",
        name: "Edit Restaurant",
        href: "/admin/RestaurantInfo",
      },
      {
        id: "orders",
        name: "Restaurant Orders",
        href: "/admin/restaurants/orders",
      },
    ],
  },
  {
    id: "menu",
    name: "Menu",
    icon: ChefHat,
    items: [
      {
        id: "addMenu",
        name: "Add Menu",
        href: "/admin/AddMenu",
      },
      {
        id: "editMenu",
        name: "Edit Menu",
        href: "/admin/EditMenu",
      },
    ],
  },
  // {
  //   id: "settings",
  //   name: "Settings",
  //   href: "/admin/settings",
  //   icon: Cog,
  // },
];

export function NavMain() {
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
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.name}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className="font-semibold cursor-pointer"
                  tooltip={item.name}
                >
                  {item.icon && <item.icon />}
                  <span>{item.name}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.name}>
                      <SidebarMenuSubButton
                        className="font-semibold cursor-pointer"
                        onClick={() => handleClick(subItem.href)}
                      >
                        {/* <Link href={subItem.href}> */}
                        {subItem.name}
                        {/* </Link> */}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
