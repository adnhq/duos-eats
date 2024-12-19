"use client";
import { updateOrderSeenStatus } from "@/lib/actions";
import { OrderType } from "@/lib/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { format } from "date-fns";
import { JWTPayload } from "jose";
import { Check, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader } from "./ui/card";

export default function DashboardNotifications({
  session,
  notifications,
}: {
  session: JWTPayload;
  notifications: OrderType[];
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

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
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="font-bold text-2xl">Notifications</h2>
          <p className="text-sm text-muted-foreground">
            You have {notifications.length} unread messages
          </p>
        </div>

        <Button onClick={handleAllSeenStatus} disabled={isLoading}>
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
      </div>

      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <p className="font-semibold text-base">
                  You have a new order! Order ID: #{notification.id}
                </p>
                <CardDescription>
                  {format(
                    new Date(notification.created_at),
                    "MMM d, yyyy 'at' h:mm a"
                  )}
                </CardDescription>
              </div>

              <button
                className="ml-4 text-red-400 hover:text-red-500 transition-all"
                onClick={() => handleSeenStatus(notification.id)}
              >
                <X className="h-4 w-4" />
              </button>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
