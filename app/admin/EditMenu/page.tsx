import AdminEditMenu from "@/components/AdminEditMenu";
import RestaurantSelectorWrapper from "@/components/RestaurantSelectorWrapper";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<{
    restaurantId?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { restaurantId } = await searchParams;

  return (
    <div>
      <RestaurantSelectorWrapper />

      <Suspense fallback={<Spinner />} key={restaurantId}>
        {restaurantId ? (
          <AdminEditMenu restaurantId={restaurantId} key={restaurantId} />
        ) : (
          <p className="text-center mt-4 text-sm text-muted-foreground">
            Please select a restaurant to edit the menu items
          </p>
        )}
      </Suspense>
    </div>
  );
}
