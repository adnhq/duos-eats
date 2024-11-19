import AdminResEditInfoWrapper from "@/components/AdminResEditInfoWrapper";
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
          <AdminResEditInfoWrapper restaurantId={restaurantId} />
        ) : (
          <p className="text-center mt-4 text-sm text-muted-foreground">
            Please select a restaurant to edit a restaurant information
          </p>
        )}
      </Suspense>
    </div>
  );
}
