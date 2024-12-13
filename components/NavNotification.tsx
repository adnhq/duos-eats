"use client";
import { updateOrderSeenStatus } from "@/lib/actions";
import { OrderType } from "@/lib/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { format } from "date-fns";
import { JWTPayload } from "jose";
import { BellRing, Check, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// const DEFAULT_NOTIFICATION_SOUND = "/notification.wav";
// const DEFAULT_TITLE = "Duos Eats";
// const NOTIFICATION_TITLE = "🔔 New Order! - Duos Eats";
// const ANIMATION_INTERVAL = 1000; // 1 second

export default function NavNotification({
  session,
  notifications,
}: {
  session: JWTPayload;
  notifications: OrderType[];
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize refs with default values
  //   const titleInterval = useRef<NodeJS.Timeout | null>(null);
  //   const audioRef = useRef<HTMLAudioElement>(
  //     typeof window !== "undefined" ? new Audio(DEFAULT_NOTIFICATION_SOUND) : null
  //   );

  //   useEffect(() => {
  //     // Initialize audio only on client side
  //     if (typeof window !== "undefined" && !audioRef.current) {
  //       audioRef.current = new Audio(DEFAULT_NOTIFICATION_SOUND);
  //     }

  //     // Cleanup function
  //     return () => {
  //       if (audioRef.current) {
  //         audioRef.current.pause();
  //         audioRef.current = null;
  //       }
  //     };
  //   }, []);

  //   const startTitleAnimation = () => {
  //     let isOriginal = false;

  //     // Clear any existing interval
  //     if (titleInterval.current) {
  //       clearInterval(titleInterval.current);
  //     }

  //     // Start new interval
  //     titleInterval.current = setInterval(() => {
  //       document.title = isOriginal ? DEFAULT_TITLE : NOTIFICATION_TITLE;
  //       isOriginal = !isOriginal;
  //     }, ANIMATION_INTERVAL);

  //     // Play notification sound
  //     if (audioRef.current) {
  //       // Reset the audio to start
  //       audioRef.current.currentTime = 0;
  //       audioRef.current.play().catch((e) => {
  //         console.log("Error playing notification sound:", e);
  //       });
  //     }
  //   };

  //   const stopTitleAnimation = () => {
  //     if (titleInterval.current) {
  //       clearInterval(titleInterval.current);
  //       titleInterval.current = null;
  //       document.title = DEFAULT_TITLE;
  //     }
  //   };

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

  const handleSeenStatus = async (orderId: number) => {
    try {
      setIsLoading(true);
      const res = await updateOrderSeenStatus(orderId);

      if (res.success) router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAllSeenStatus = async () => {
    try {
      setIsLoading(true);
      const results = await Promise.all(
        notifications.map((notification) =>
          updateOrderSeenStatus(notification.id)
        )
      );

      const allSuccessful = results.every((result) => result.success === true);

      if (allSuccessful) {
        console.log("All notifications updated successfully");
        router.refresh();
      } else {
        console.log(
          "Some updates failed:",
          results.filter((r) => !r.success)
        );
      }
    } catch (error) {
      console.log("Error updating notifications:", error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      {session && session.role === "restaurant" && (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger>
            <div className="relative">
              <BellRing className="h-5 w-5" />
              {notifications.length > 0 && (
                <p className="absolute -top-2 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                  {notifications.length}
                </p>
              )}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>
              <h2 className="text-xl">Notifications</h2>
              <p className="text-xs text-muted-foreground">
                You have {notifications.length} unread messages
              </p>
            </DropdownMenuLabel>

            {notifications?.length > 0 && (
              <>
                <DropdownMenuSeparator />

                {notifications.map((notification, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="mb-4 grid grid-cols-[25px_1fr_auto] items-start pb-4 last:mb-0 last:pb-0 "
                  >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        You have a new order! Order ID: #{notification.id}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(
                          new Date(notification.created_at),
                          "MMM d, yyyy 'at' h:mm a"
                        )}
                      </p>
                    </div>

                    <button
                      className="ml-4 text-red-400 hover:text-red-500 transition-all"
                      onClick={() => handleSeenStatus(notification.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <Button
                  className="w-full"
                  onClick={handleAllSeenStatus}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="">Marking as read</span>
                      <span className="animate-spin">
                        <Loader2 className="h-4 w-4" />
                      </span>
                    </>
                  ) : (
                    <>
                      <Check /> Mark all as read
                    </>
                  )}
                </Button>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
