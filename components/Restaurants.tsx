import RestaurantsClient from "./RestaurantsClient";

export default async function Restaurants() {
  const response = await fetch("https://duoseats.com/api/allRestaurants", {
    next: {
      revalidate: 3600,
    },
  });
  const restaurants = (await response.json()).data;

  return <RestaurantsClient initialRestaurants={restaurants} />;
}
