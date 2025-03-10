"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Restaurant } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function RestaurantSelector({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  const [selectedRestaurantId, setSelectedRestaurantId] = React.useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get("restaurantId") ?? "";
  console.log("restaurantId", restaurantId);

  function handleRestaurantChange(restaurantId: string) {
    setSelectedRestaurantId(restaurantId);
    router.push(`${pathname}?restaurantId=${restaurantId}`);
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-md font-semibold">Select a Restaurant</h2>

      <Select
        value={selectedRestaurantId}
        onValueChange={handleRestaurantChange}
      >
        <SelectTrigger className="mb-4 md:w-72">
          <SelectValue placeholder="Select a Restaurant" />
        </SelectTrigger>
        <SelectContent>
          {restaurants.length > 0 && (
            <>
              {restaurants.map((restaurant: Restaurant, idx: number) => (
                <SelectItem key={idx} value={`${restaurant.id}`}>
                  {restaurant.name}
                </SelectItem>
              ))}
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
