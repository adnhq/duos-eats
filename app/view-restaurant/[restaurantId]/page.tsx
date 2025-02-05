import RestaurantView from "@/components/RestaurantView";
import Spinner from "@/components/Spinner";
import { getAllRestaurants } from "@/lib/actions";
import { Suspense } from "react";

export async function generateStaticParams() {
  const restaurants = await getAllRestaurants();

  return restaurants.map((restaurant) => ({
    restaurantId: String(restaurant.id),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ restaurantId: string }>;
}) {
  const { restaurantId } = await params;

  return (
    <main className="max-w-7xl min-h-screen mx-auto pt-24">
      <Suspense fallback={<Spinner />}>
        <RestaurantView restaurantId={restaurantId} />
      </Suspense>
    </main>
  );
}
