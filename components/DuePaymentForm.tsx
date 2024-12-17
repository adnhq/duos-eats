"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Restaurant } from "@/lib/types";
import { subDays } from "date-fns";
import { DatePickerWithRange } from "./DatePickerWithRange";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { addRestaurantPayment } from "@/lib/actions";

const formSchema = z.object({
  amount: z
    .string({
      required_error: "Price field can't be empty",
    })
    .regex(/^[1-9]\d*$/, {
      message: "Please provide a valid price",
    }),
  restaurantId: z.string({
    required_error: "Please select a location.",
  }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function DuePaymentForm({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantId: "",
      amount: "",
      dateRange: {
        from: subDays(new Date(), 30),
        to: new Date(),
      },
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data);

      const res = await addRestaurantPayment(data);

      if (res.success) {
        form.reset({
          restaurantId: "",
          amount: "",
          dateRange: {
            from: subDays(new Date(), 30),
            to: new Date(),
          },
        });

        toast({
          title: "Payment Successful",
          description: "Payment Information has been updated successfully",
        });
      } else {
        throw new Error("Failed to update payment information");
      }
    } catch (error) {
      toast({
        title: "Payment update failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-4xl">
      <CardHeader className="pl-8">
        <CardTitle>Restaurant Payment</CardTitle>
        <CardDescription>
          Fill up the below details to take payment from the restaurant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-2"
          >
            <FormField
              control={form.control}
              name="restaurantId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Restaurant" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {restaurants.length > 0 && (
                        <>
                          {restaurants.map(
                            (restaurant: Restaurant, idx: number) => (
                              <SelectItem key={idx} value={`${restaurant.id}`}>
                                {restaurant.name}
                              </SelectItem>
                            )
                          )}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter the amount"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Time Range</FormLabel>
                  <FormControl>
                    <DatePickerWithRange
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <span className="">Paying</span>
                  <span className="animate-spin">
                    <Loader2 className="h-4 w-4" />
                  </span>
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4" /> Take Payment
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
