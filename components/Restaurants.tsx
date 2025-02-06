import { getAllRestaurants } from "@/lib/actions";
import RestaurantsClient from "./RestaurantsClient";

export default async function Restaurants() {
  //
  // const response = await fetch("https://duoseats.com/api/restaurants", {
  //   cache: "force-cache",
  //   next: {
  //     revalidate: 3600,
  //   },
  // });
  // const restaurants = await response.json();
  const restaurants = await getAllRestaurants();

  return <RestaurantsClient initialRestaurants={restaurants} />;
}
