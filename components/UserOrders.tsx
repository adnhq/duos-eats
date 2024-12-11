import { getOrdersByUser, getSession } from "@/lib/actions";

import { JWTPayload } from "jose";
import UserOrderCard from "./UserOrderCard";

async function UserOrders() {
  const session = await getSession();
  const restaurantOrders = await getOrdersByUser((session as JWTPayload).id);

  return (
    <div>
      {restaurantOrders.length === 0 ? (
        <div className="text-muted-foreground text-center">
          You haven&apos;t ordered anything yet
        </div>
      ) : (
        <div className="max-w-4xl grid grid-cols-1 gap-4 mt-4">
          {restaurantOrders?.map((restaurantOrder) => (
            <UserOrderCard key={restaurantOrder.id} order={restaurantOrder} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserOrders;
