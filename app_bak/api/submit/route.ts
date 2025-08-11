// app/api/submit/route.ts
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { name, message } = await req.json();
  await supabase.from("contacts").insert({ name, message });
  return new Response(JSON.stringify({ success: true }));
}
