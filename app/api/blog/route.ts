import { Database } from "@/lib/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id === "*") {
      const { data, error } = await supabase.from("blog").select("id").limit(10);
      if (error) {
        console.error("Supabase Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(data, { status: 200 });
    } else if (id) {
      const { data, error } = await supabase
        .from("blog")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Supabase Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(data, { status: 200 });
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
