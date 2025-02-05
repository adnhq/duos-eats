import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: Restaurants, error } = await supabase
      .from("Restaurants")
      .select("*")
      .neq("email", process.env.ADMIN_EMAIL)
      .neq("id", 10)
      .neq("id", 11)
      .neq("id", 13)
      .neq("id", 16)
      .eq("approved", true);

    if (error) throw error;

    return Response.json(Restaurants);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
