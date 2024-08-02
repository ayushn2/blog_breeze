"use server"

import { createServerClient } from "@supabase/ssr"

import { cookies } from "next/headers";
import { Database } from "../types/supabase";
import { createClient } from "@supabase/supabase-js";


export async function createSupabaseServerClient() {

    const cookieStore = cookies();
  return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll()
            },
          },
        }
      )

      
    
}

export async function createSupabaseAdmin(){
        return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SERVICE_ROLE!,
          {
            auth:{
              autoRefreshToken : false,
              persistSession : false
            }
          
        })
}