import { getEarningsByRestaurant } from "@/lib/actions";
import { Utensils } from "lucide-react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default async function RestaurantOrderStats({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const {
    totalActualEarnings,
    totalPendingOrders,
    totalResEarnings,
    totalCancelledOrders,
    totalConfirmedOrders,
    totalPlatformFee,
  } = await getEarningsByRestaurant(restaurantId);

  return (
    <div className="space-y-4">
      {/* Header Section */}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pt-6 pb-4">
        <Card className="shadow-lg bg-gradient-to-br from-green-500 to-green-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Actual Earnings
            </CardTitle>
            <FaBangladeshiTakaSign className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            Tk {totalActualEarnings.toLocaleString()}
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Earnings after Discount
            </CardTitle>
            <FaBangladeshiTakaSign className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            Tk {totalResEarnings.toLocaleString()}
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-gradient-to-br from-green-500 to-green-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Pending Dues
            </CardTitle>
            <FaBangladeshiTakaSign className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            Tk {totalPlatformFee.toLocaleString()}
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-gradient-to-br from-teal-500 to-teal-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Confirmed Orders
            </CardTitle>
            <Utensils className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {totalConfirmedOrders}
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-gradient-to-br from-orange-500 to-orange-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Cancelled Orders
            </CardTitle>
            <Utensils className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {totalCancelledOrders}
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-gradient-to-br from-yellow-500 to-yellow-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Pending Orders
            </CardTitle>
            <Utensils className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {totalPendingOrders}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
