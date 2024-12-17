"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cancelOrder, confirmOrder } from "@/lib/actions";
import { OrderType } from "@/lib/types";
import { format } from "date-fns";
import {
  CheckCircle,
  Clock,
  Eye,
  HandCoins,
  Loader2,
  XCircle,
} from "lucide-react";
import { useState } from "react";

export default function OrderCard({ order }: { order: OrderType }) {
  const orderCreatingTime = format(
    new Date(order.created_at),
    "MMM d, yyyy 'at' h:mm a"
  );
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const allLoading = isLoading1 || isLoading2;
  const { toast } = useToast();

  async function acceptOrder() {
    try {
      setIsLoading1(true);
      const res = await confirmOrder(order.id);

      if (res.success) {
        toast({
          title: `Order has been confirmed successfully`,
          description: "Order status updated",
        });
      } else {
        throw new Error("Some unknown error occurred");
      }
    } catch (error) {
      toast({
        title: "Couldn't update the order status!",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading1(false);
    }
  }

  async function rejectOrder() {
    try {
      setIsLoading2(true);
      const res = await cancelOrder(order.id);

      if (res.success) {
        toast({
          title: `Order is cancelled`,
          description: "Order status updated",
        });
      } else {
        throw new Error("Some unknown error occurred");
      }
    } catch (error) {
      toast({
        title: "Couldn't update the order status!",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading2(false);
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            {status}
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="destructive"
            className="bg-red-100 text-red-800 hover:bg-red-200"
          >
            {status}
          </Badge>
        );
      case "confirmed":
        return (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 hover:bg-green-200"
          >
            {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  console.log(order.tableNumber);

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="">
        <CardTitle className="flex justify-between items-center">
          <span className="text-xl font-semibold text-gray-800">
            Order #{order.id}
          </span>
          {getStatusBadge(order.status)}
        </CardTitle>

        <div className="flex items-center space-x-2 text-gray-600 text-sm">
          <Clock className="h-4 w-4 mr-2" />
          {orderCreatingTime}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <HandCoins className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-500">Paid Amount</p>
              <p className="text-base font-semibold">
                TK {order.discountTotal.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <HandCoins className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-500">
                Final Earnings
              </p>
              <p className="text-base font-semibold">
                TK {order.restaurantEarning.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <HandCoins className="h-5 w-5 text-purple-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">Platform Fee</p>
            <p className="text-base font-semibold">
              TK {order.platformFee.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 justify-end">
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 hover:bg-green-200"
          >
            {order.discount}% discount applied
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col md:flex-row gap-2 pt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Order Details
              </DialogTitle>
              <DialogDescription>
                Order #{order.id} • {orderCreatingTime}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <h2 className="font-semibold text-lg mb-2">Customer Details</h2>
                <p className="text-sm text-gray-600">
                  Name:{" "}
                  <span className="font-medium text-gray-900">
                    {order.Users.name}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Contact No.:{" "}
                  <span className="font-medium text-gray-900">
                    0{order.Users.phoneNumber}
                  </span>
                </p>
                {order.tableNumber !== null && order.tableNumber !== "" && (
                  <p className="text-sm text-gray-600">
                    Table No.:{" "}
                    <span className="font-medium text-gray-900">
                      {order.tableNumber}
                    </span>
                  </p>
                )}
              </div>
              <div className="space-y-4">
                {order.OrderItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-3 border-b last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.Menu.name}
                      </p>
                      {item.extraParams !== null &&
                        item.extraParams.map((extraParam, idx) => (
                          <p className="text-xs text-gray-600" key={idx}>{`${
                            extraParam.split(":")[0]
                          }: ${extraParam.split(":")[1]}`}</p>
                        ))}
                      <p className="text-sm text-gray-500">
                        TK {item.actualCurrentPrice.toLocaleString()} ×{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-gray-800">
                      TK{" "}
                      {(
                        item.actualCurrentPrice * item.quantity
                      ).toLocaleString()}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2">
                  <p className="font-bold text-lg text-gray-800">Total</p>
                  <p className="font-bold text-lg text-gray-800">
                    TK {order.discountTotal.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {order.status === "pending" && (
          <>
            <Button
              disabled={allLoading}
              onClick={acceptOrder}
              className="w-full md:w-auto"
            >
              {isLoading1 ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Confirming
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Confirm
                </>
              )}
            </Button>
            <Button
              variant="destructive"
              disabled={allLoading}
              onClick={rejectOrder}
              className="w-full md:w-auto"
            >
              {isLoading2 ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Cancelling
                </>
              ) : (
                <>
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel
                </>
              )}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
