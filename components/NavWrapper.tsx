import { getOrdersByRestaurant, getSession } from "@/lib/actions";
import { JWTPayload } from "jose";
import Navbar from "./Navbar";

export default async function NavWrapper() {
  const session = await getSession();
  let unseenOrders = [];

  if (session && session.role === "restaurant") {
    unseenOrders = await getOrdersByRestaurant(session.id);
    unseenOrders = unseenOrders.filter((order) => !order.seen);
  }

  return <Navbar session={session as JWTPayload} unseenOrders={unseenOrders} />;
}
