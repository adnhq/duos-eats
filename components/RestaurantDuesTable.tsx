import { PaymentEntry } from "@/lib/types";
import { format } from "date-fns";
import { HandCoins } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function RestaurantDuesTable({
  paymentEntries,
}: {
  paymentEntries: PaymentEntry[];
}) {
  return (
    <>
      <div className="hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Restaurant Name</TableHead>
              <TableHead>Paid Dues(TK)</TableHead>
              <TableHead>Last Paid Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paymentEntries.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  No Payments yet.
                </TableCell>
              </TableRow>
            ) : (
              paymentEntries.map((paymentEntry) => {
                const startDate = format(
                  new Date(paymentEntry.startDate),
                  "MMM d, yyyy"
                );
                const endDate = format(
                  new Date(paymentEntry.endDate),
                  "MMM d, yyyy"
                );

                return (
                  <TableRow key={paymentEntry.id}>
                    <TableCell>{paymentEntry.Restaurants.name}</TableCell>
                    <TableCell>
                      {paymentEntry.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{`${startDate} - ${endDate}`}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="lg:hidden grid gap-4 grid-cols-1">
        {paymentEntries.length === 0 ? (
          <p className="text-center text-muted-foreground">No payments yet.</p>
        ) : (
          paymentEntries.map((paymentEntry) => {
            const startDate = format(
              new Date(paymentEntry.startDate),
              "MMM d, yyyy"
            );
            const endDate = format(
              new Date(paymentEntry.endDate),
              "MMM d, yyyy"
            );

            return (
              <Card key={paymentEntry.id}>
                <CardHeader>
                  <CardTitle>{paymentEntry.Restaurants.name}</CardTitle>
                  <CardDescription>
                    {`${startDate} - ${endDate}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <HandCoins className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Paid Amount
                      </p>
                      <p className="text-base font-semibold">
                        TK {paymentEntry.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </>
  );
}
