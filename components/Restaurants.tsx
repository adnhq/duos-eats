import { getAllRestaurants } from "@/lib/actions";
import RestaurantsClient from "./RestaurantsClient";

export default async function Restaurants() {
  const restaurants = await getAllRestaurants();

  return <RestaurantsClient initialRestaurants={restaurants} />;
} 