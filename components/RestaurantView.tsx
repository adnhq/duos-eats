import { getRestaurant, getRestaurantMenu } from "@/lib/actions";
import RestaurantMenu from "./RestaurantMenu";

// Option 1: Use ISR
export const revalidate = 300; // revalidating every 5 minutes

export default async function RestaurantView({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const restaurants = await getRestaurant(restaurantId);
  if (restaurants.length === 0)
    return (
      <p className="mt-16 text-center font-semibold text-xl">
        No Restaurant found
      </p>
    );

  const menuItems = await getRestaurantMenu(restaurants[0].id);

  return (
    <RestaurantMenu restaurantData={restaurants[0]} menuItems={menuItems} />
  );
}
