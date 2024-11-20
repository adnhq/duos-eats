import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowUpDown, DollarSign, Plus, Store } from "lucide-react";
import { getEarningsByRestaurant } from "@/lib/actions";

export default async function RestaurantOrderStats({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const {
    totalResEarnings,
    totalCancelledOrders,
    totalConfirmedOrders,
    totalPlatformFee,
  } = await getEarningsByRestaurant(restaurantId);

  const platformStats = [
    {
      name: "Total Restaurant Earnings",
      value: totalResEarnings,
    },
    { name: "Total Platform Fees", value: totalPlatformFee },
    { name: "Total Confirmed Orders", value: totalConfirmedOrders },
    { name: "Total Cancelled Orders", value: totalCancelledOrders },
  ];

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-500">View Sales and Dues</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {platformStats.map((stat, index) => (
          <Card
            key={index}
            className={`shadow-lg ${
              index === 0
                ? "bg-gradient-to-br from-blue-500 to-blue-600"
                : index === 1
                ? "bg-gradient-to-br from-green-500 to-green-600"
                : index === 2
                ? "bg-gradient-to-br from-purple-500 to-purple-600"
                : "bg-gradient-to-br from-orange-500 to-orange-600"
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white">
                {stat.name}
              </CardTitle>
              {index === 0 ? (
                <DollarSign className="h-4 w-4 text-white" />
              ) : index === 1 ? (
                <Store className="h-4 w-4 text-white" />
              ) : index === 2 ? (
                <Plus className="h-4 w-4 text-white" />
              ) : (
                <ArrowUpDown className="h-4 w-4 text-white" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">
                {index === 0 || index === 1
                  ? `Tk ${stat.value.toLocaleString()}`
                  : stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
