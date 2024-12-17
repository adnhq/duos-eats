import DuePaymentForm from "@/components/DuePaymentForm";
import { getAllRestaurants } from "@/lib/actions";
import React from "react";

export default async function Page() {
  const restaurants = await getAllRestaurants();

  return <DuePaymentForm restaurants={restaurants} />;
}
