import { IBlog } from '@/lib/types'
import React from 'react'
import Image from 'next/image'
import BlogContent from './components/BlogContent'

const page = async ({params}:{params:{id:string}}) => {

    const {data:blog} = await fetch(process.env.SITE_URL + "/api/blog?id=" + params.id).then((res) => res.json()) as {data:IBlog}

    if(!blog?.id){
        return <h1>Not Found</h1>
    }

  return (
    <div className='max-w-5xl mx-auto min-h-screen pt-10 space-y-10'>
        <div>
            <h1 className='text-3xl font-bold'>{blog?.title}</h1>
            <p className='text-sm text-secondary'>{new Date(blog?.created_at || "").toDateString() }</p>
        </div>
        <div className='w-full h-96 relative'>
            <Image
              src={blog?.image_url || "/"} 
              alt="cover" 
              fill 
              className='object-cover object-cente rounded-md border'
              sizes='(max-width:768px) 100vw, (max-width: 1200px): 50vw, 33vw'
              priority />
        </div>
        <BlogContent blogId={blog.id}/>
    </div>
  )
}

export default page
