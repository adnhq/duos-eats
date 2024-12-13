"use client";
import { OrderType } from "@/lib/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { JWTPayload } from "jose";
import { BellRing } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "./ui/button";

export default function MobileNavNotification({
  session,
  notifications,
  handleRedirect,
}: {
  session: JWTPayload;
  notifications: OrderType[];
  handleRedirect: (link: string) => void;
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

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
      <Button
        variant={"ghost"}
        onClick={() => handleRedirect("/restaurant/notifications")}
        className={"flex items-center"}
      >
        <BellRing />
        <span>Notifications</span>

        {notifications.length > 0 && (
          <p className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
            {notifications.length}
          </p>
        )}
      </Button>
    </>
  );
}
