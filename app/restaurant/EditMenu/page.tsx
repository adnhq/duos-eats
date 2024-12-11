import EditMenuItemCard from "@/components/EditMenuItemCard";
import { getRestaurantMenu, getSession } from "@/lib/actions";
import { JWTPayload } from "jose";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if ((session as JWTPayload).role !== "restaurant") return redirect("/");
  const menuItems = await getRestaurantMenu((session as JWTPayload).id);

  if (session === null) return null;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Current Menu Items</h1>
      <div className="space-y-4 max-w-4xl">
        {menuItems?.map((menuItem) => (
          <EditMenuItemCard
            key={menuItem.id}
            item={menuItem}
            role={session.role}
          />
        ))}
      </div>
    </>
  );
}
