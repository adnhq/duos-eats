"use client";
import { OrderType } from "@/lib/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { JWTPayload } from "jose";
import { BellRing } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SidebarMenuButton, useSidebar } from "./ui/sidebar";

export default function SidebarNotification({
  session,
  notifications,
}: {
  session: JWTPayload;
  notifications: OrderType[];
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const { isMobile, toggleSidebar } = useSidebar();

  function handleClick() {
    router.push("/restaurant/notifications");
    if (isMobile) {
      toggleSidebar();
    }
  }

  useEffect(() => {
    const channel = supabase
      .channel("orders_channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Orders",
        },
        (payload: { new: { restaurantId: string } }) => {
          if (payload.new.restaurantId === session.id) {
            console.log(payload);
            // startTitleAnimation();
          }
          router.refresh();
        }
      )
      .subscribe();

    // Cleanup function
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router, session]);

  return (
    <>
      <SidebarMenuButton
        onClick={handleClick}
        className={
          "flex items-center w-full space-x-2 pl-4 py-2 rounded-lg mb-1 transition-colors text-sm font-semibold"
        }
      >
        <BellRing />
        <span>Notifications</span>

        {notifications.length > 0 && (
          <p className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
            {notifications.length}
          </p>
        )}
      </SidebarMenuButton>
    </>
  );
}
