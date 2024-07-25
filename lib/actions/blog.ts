"use server"

import { BlogFormSchemaType } from "@/app/dashboard/schema";
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { Database } from "../types/supabase";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../supabase";



const DASHBOARD = "/dashboard"



  export async function createBlog(data: BlogFormSchemaType){

    const supabase = await createSupabaseServerClient()

    const {["content"]: excludedKey, ...blog} = data

    const resultBlog = await supabase.from("blog").insert(blog).select("id").single()
    console.log(resultBlog)
    if(resultBlog.error){
        return JSON.stringify(resultBlog)
        
    }else{
        const result = await supabase.from("blog_content").insert({blog_id:resultBlog.data.id!, content:data.content})

        // revalidation
        revalidatePath(DASHBOARD)
        return JSON.stringify(result);
    }
  }

  export async function readBlog(){

    const supabase = await createSupabaseServerClient()

    return supabase
        .from('blog')
        .select("*")
        .eq("is_published",true)
        .order("created_at",{ascending:true});
  }

  export async function readBlogAdmin(){

    const supabase = await createSupabaseServerClient()

    return supabase
        .from('blog')
        .select("*")
        .order("created_at",{ascending:true});
  }

  export async function deleteBlog(blogId:string){

    const supabase = await createSupabaseServerClient()

    const result = await supabase.from("blog").delete().eq("id",blogId);
    revalidatePath(DASHBOARD)
    revalidatePath("/blog/" + blogId);
    return JSON.stringify(result)
  }

  export async function updateBlogById(blogId:string,data:BlogFormSchemaType){

    const supabase = await createSupabaseServerClient()

    const result = await supabase.from("blog").update(data).eq("id",blogId);
    revalidatePath(DASHBOARD)
    revalidatePath("/blog/"+blogId)
    
    return JSON.stringify(result)
  }

  export async function readBlogContentById(blogId:string){

    const supabase = await createSupabaseServerClient()

    return supabase
    .from('blog')
    .select("*,blog_content(*)")
    .eq("id",blogId)
    .single()
  }

  export async function updateBlogDetailById(blogId:string,data:BlogFormSchemaType){

    const supabase = await createSupabaseServerClient()
    const {["content"]: excludedKey, ...blog} = data

    const resultBlog = await supabase
    .from("blog")
    .update(data)
    .eq("id",blogId);

    if(resultBlog.error){
      return JSON.stringify(resultBlog)
    }else{
        const result = await supabase
        .from("blog_content")
        .update({content:data.content})
        .eq("blog_id",blogId);
        revalidatePath(DASHBOARD)
       revalidatePath("/blog/" + blogId)
    
    return JSON.stringify(result)
    }

    
  }
