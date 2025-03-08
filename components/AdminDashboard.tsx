import { PlusIcon, StoreIcon, User2, Utensils } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getAllRestaurantEarnings,
  getAllRestaurants,
  getAllUsers,
  getRestaurantPayments,
  getUnapprovedRestaurants,
} from "@/lib/actions";
import Link from "next/link";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import RestaurantApproval from "./RestaurantApproval";
import RestaurantDuesTable from "./RestaurantDuesTable";
import { Button } from "./ui/button";

// Mustard on the beat
// interface Restaurant {
//   id: number;
//   name: string;
//   pendingDues: number;
//   lastPayment: string;
//   status: string;
// }

// Mock data
// const restaurantsData: Restaurant[] = [
//   {
//     id: 1,
//     name: "Tasty Bites",
//     pendingDues: 2500,
//     lastPayment: "2023-05-15",
//     status: "active",
//   },
//   {
//     id: 2,
//     name: "Spice Haven",
//     pendingDues: 1800,
//     lastPayment: "2023-05-20",
//     status: "active",
//   },
//   {
//     id: 3,
//     name: "Burger Palace",
//     pendingDues: 3200,
//     lastPayment: "2023-05-10",
//     status: "active",
//   },
//   {
//     id: 4,
//     name: "Sushi Express",
//     pendingDues: 900,
//     lastPayment: "2023-05-22",
//     status: "active",
//   },
//   {
//     id: 5,
//     name: "Pizza Paradise",
//     pendingDues: 1500,
//     lastPayment: "2023-05-18",
//     status: "active",
//   },
// ];

// const pendingApplications: Application[] = [
//   {
//     id: 101,
//     restaurantName: "Green Leaf Cafe",
//     email: "green@leaf.com",
//     password: "********",
//     phone: "+880123456789",
//     cuisine: "Vegan",
//     address: "123 Green St",
//     location: "Dhaka",
//     appliedOn: "2023-05-25",
//   },
//   {
//     id: 102,
//     restaurantName: "Taco Town",
//     email: "taco@town.com",
//     password: "********",
//     phone: "+880123456790",
//     cuisine: "Mexican",
//     address: "45 Taco Ave",
//     location: "Dhaka",
//     appliedOn: "2023-05-26",
//   },
// ];

export default async function AdminDashboard() {
  const [restaurants, unApprovedRestaurants, restaurantPayments, users] =
    await Promise.all([
      getAllRestaurants(),
      getUnapprovedRestaurants(),
      getRestaurantPayments(),
      getAllUsers(),
    ]);

  const {
    totalActualEarnings,
    totalResEarnings,
    totalPlatformFee,
    totalConfirmedOrders,
    totalCancelledOrders,
    totalPendingOrders,
  } = await getAllRestaurantEarnings();

  return (
    <div className="space-y-6">
      {/* Header Section */}

      {/* Stats Grid */}
      {/*  */}
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
              Discounted Earnings
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
              Platform Earnings
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

        <Card className="shadow-lg bg-gradient-to-br from-purple-500 to-purple-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Active Restaurants
            </CardTitle>
            <StoreIcon className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {restaurants.length}
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-gradient-to-br from-sky-500 to-sky-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Customers
            </CardTitle>
            <User2 className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent className="text-2xl font-bold text-white">
            {users.length}
          </CardContent>
        </Card>
      </div>

      {/* Pending Applications Section */}
      <Card className="shadow-md">
        <CardHeader className="md:pl-10 sm:pl-4">
          <CardTitle className="text-lg font-semibold">
            Pending Applications
          </CardTitle>
          <CardDescription>Review new restaurant applications</CardDescription>
        </CardHeader>
        <CardContent>
          <RestaurantApproval unApprovedRestaurants={unApprovedRestaurants} />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="w-full md:w-auto" asChild>
          <Link href="/admin/PayDues">
            <PlusIcon className="h-4 w-4 mr-2" />
            Take Payment
          </Link>
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader className="md:pl-10 sm:pl-4">
          <CardTitle className="text-lg font-semibold">
            Restaurant Payment
          </CardTitle>
          <CardDescription>
            Keep track of the restaurant payment
          </CardDescription>
        </CardHeader>

        <CardContent>
          <RestaurantDuesTable paymentEntries={restaurantPayments} />
        </CardContent>
      </Card>
    </div>
  );
}
{
  // Mobile-friendly card view component for applications
  // Mobile-friendly card view component for restaurants
  // const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => (
  //   <Card className="mb-4">
  //     <CardHeader className="pb-2">
  //       <div className="flex justify-between items-start">
  //         <CardTitle className="text-lg font-semibold">
  //           {restaurant.name}
  //         </CardTitle>
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //             <DropdownMenuItem>Edit Information</DropdownMenuItem>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem>View Payment History</DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       </div>
  //     </CardHeader>
  //     <CardContent>
  //       <div className="space-y-2">
  //         <div className="flex justify-between">
  //           <span className="text-sm text-muted-foreground">Pending Dues:</span>
  //           <span className="font-medium">
  //             BDT {restaurant.pendingDues.toLocaleString()}
  //           </span>
  //         </div>
  //         <div className="flex justify-between">
  //           <span className="text-sm text-muted-foreground">Last Payment:</span>
  //           <span>{restaurant.lastPayment}</span>
  //         </div>
  //         <div className="flex justify-between items-center">
  //           <span className="text-sm text-muted-foreground">Status:</span>
  //           <Badge variant="outline" className="bg-green-100 text-green-800">
  //             {restaurant.status}
  //           </Badge>
  //         </div>
  //       </div>
  //     </CardContent>
  //   </Card>
  // );
  /* <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Restaurant List</CardTitle>
            <CardDescription>Manage restaurants and their pending dues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center py-4">
              <Input
                placeholder="Search restaurants..."
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
         
            <div className="md:hidden space-y-4">
              {restaurantsData
                .filter(restaurant => 
                  restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(restaurant => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>

            <div className="hidden md:block overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Pending Dues</th>
                    <th className="text-left py-3 px-4">Last Payment</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurantsData
                    .filter(restaurant => 
                      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(restaurant => (
                      <tr key={restaurant.id} className="border-b">
                        <td className="py-3 px-4 font-medium">{restaurant.name}</td>
                        <td className="py-3 px-4">BDT {restaurant.pendingDues.toLocaleString()}</td>
                        <td className="py-3 px-4">{restaurant.lastPayment}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            {restaurant.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Edit Information</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View Payment History</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View Payment History</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card> */
}
