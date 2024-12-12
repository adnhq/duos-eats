import { getRestaurantMenu, getSession } from "@/lib/actions";
import AdminEditMenuList from "./AdminEditMenuList";

export default async function AdminEditMenu({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const menuItems = restaurantId ? await getRestaurantMenu(restaurantId) : [];
  const session = await getSession();

  if (session === null) return null;

  return <AdminEditMenuList menuItems={menuItems} session={session} />;
}
