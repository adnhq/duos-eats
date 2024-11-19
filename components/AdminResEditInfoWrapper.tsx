import { getRestaurant } from "@/lib/actions";
import React from "react";
import AdminResEditForm from "./AdminResEditForm";

export default async function AdminResEditInfoWrapper({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const restaurants = await getRestaurant(restaurantId);
  return (
    <AdminResEditForm id={restaurants[0].id} defaultValues={restaurants[0]} />
  );
}
