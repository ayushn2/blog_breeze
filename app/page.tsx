import { Button } from '@/components/ui/button'
import { readBlog } from '@/lib/actions/blog'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const page = async () => {

  const {data:blogs} = await readBlog()

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-5 xl:p-0'>
      {blogs?.map((blog,index)=>(
        <Link href={"/blog/"+blog.id} key={index} className='w-full border rounded-md bg-gradient-dark p-5 hover:ring-2 ring-ring transition-all cursor-pointer space-y-5 first:lg:col-span02 first:md:col-span-3'>
            <div className='relative w-full h-72 md:h-64 xl:h-96'>
              <Image 
              src={blog.image_url} 
              alt="cover" 
              fill 
              className='object-cover object-center'
              sizes='(max-width:768px) 100vw, (max-width: 1200px): 50vw, 33vw'
              priority
              />
            </div>
            <div className='space-y-2'>
              <p className='text-sm text-gray-400'>
              {new Date(blog.created_at).toDateString()}
                </p>
             <h1>{blog.title}</h1>
            </div>
        </Link>
      ))}
    
    </div>
  )
}

export default page
