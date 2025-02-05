import RestaurantsClient from "./RestaurantsClient";

export default async function Restaurants() {
  //
  const response = await fetch("https://duoseats.com/api/restaurants", {
    cache: "force-cache",
    next: {
      revalidate: 3600,
    },
  });
  const restaurants = await response.json();

  return <RestaurantsClient initialRestaurants={restaurants} />;
}
