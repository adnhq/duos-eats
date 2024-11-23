"use client";

import { useState } from "react";
import { Restaurant } from "@/lib/types";
import RestaurantCard from "./RestaurantCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface RestaurantsClientProps {
  initialRestaurants: Restaurant[];
}

export default function RestaurantsClient({ initialRestaurants }: RestaurantsClientProps) {
  const [query, setQuery] = useState("");

  const filtered = initialRestaurants.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" id="restaurants">
      <section className="mb-12">
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-semibold">All Restaurants</h2>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search restaurants..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-lg text-muted-foreground">
              {query ? "No restaurants found" : "Coming soon..."}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {filtered.map((restaurant: Restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}