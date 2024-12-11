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
import { OrderType } from "@/lib/types";
import { format } from "date-fns";
import { Clock, Eye, HandCoins } from "lucide-react";
import { MdTableBar } from "react-icons/md";

export default function UserOrderCard({ order }: { order: OrderType }) {
  const orderCreatingTime = format(
    new Date(order.created_at),
    "MMM d, yyyy 'at' h:mm a"
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            Order #{order.id} from {order.Restaurants.name}
          </span>
          {order.status === "pending" && <Badge>{order.status}</Badge>}

          {order.status === "cancelled" && (
            <Badge variant="destructive">{order.status}</Badge>
          )}
          {order.status === "confirmed" && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {order.status}
            </Badge>
          )}
        </CardTitle>

        <div className="flex items-center space-x-2 text-gray-600 text-sm">
          <Clock className="h-4 w-4 mr-2" />
          {orderCreatingTime}
        </div>
      </CardHeader>
      <CardContent>
        {order.tableNumber !== null && order.tableNumber !== "" && (
          <div className="flex items-center space-x-2 mb-4">
            <MdTableBar className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-500">Table Number</p>
              <p className="text-base font-semibold">{order.tableNumber}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-end">
          <div className="flex items-center space-x-2">
            <HandCoins className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-500">Paid Amount</p>
              <p className="text-base font-semibold">
                TK {order.discountTotal.toLocaleString()}
              </p>
            </div>
          </div>

          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {order.discount}% discount applied
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
                Order #{order.id} • {orderCreatingTime}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {order.OrderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div>
                    <p className="font-medium">{item.Menu.name}</p>
                    {item.extraParams !== null &&
                      item.extraParams.map((extraParam, idx) => (
                        <p className="text-xs" key={idx}>{`${
                          extraParam.split(":")[0]
                        } - ${extraParam.split(":")[1]}`}</p>
                      ))}
                    <p className="text-sm text-muted-foreground">
                      BDT {item.actualCurrentPrice} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    BDT {item.actualCurrentPrice * item.quantity}
                  </p>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2">
                <p className="font-bold">Total</p>
                <p className="font-bold">BDT {order.discountTotal}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
