import DashboardNotifications from "@/components/DashboardNotifications";
import { getOrdersByRestaurant, getSession } from "@/lib/actions";
import { JWTPayload } from "jose";
import React from "react";

export default async function Page() {
  const session = await getSession();
  let unseenOrders = [];

  if (session && session.role === "restaurant") {
    unseenOrders = await getOrdersByRestaurant(session.id);
    unseenOrders = unseenOrders.filter((order) => !order.seen);
  }
  return (
    <DashboardNotifications
      session={session as JWTPayload}
      notifications={unseenOrders}
    />
  );
}
