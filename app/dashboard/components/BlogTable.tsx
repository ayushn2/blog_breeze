import { Button } from '@/components/ui/button'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import { PencilIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Switch } from '@/components/ui/switch'
import { readBlog } from '@/lib/actions/blog'
import DeleteAlert from './DeleteAlert'

const BlogTable = async () => {

  const {data :blogs} = await readBlog()

  return (
    <div className='overflow-x-auto'>

  
    <div className='border bg-gradient-dark rounded-md w-[900px] md:w-full'>
      <div className='grid grid-cols-5 p-5 text-accent border-b'>
        <h1 className='col-span-2'>Title</h1>
        <h1>Premium</h1>
        <h1>Publish</h1>
      </div>

      {blogs?.map((blog,index) => {
        return(
            <div className='grid grid-cols-5 p-5'>
              <h1 className='col-span-2'>{blog.title}</h1>
              <Switch checked={blog.is_premium}/>
              <Switch checked={blog.is_published}/>
              <Actions id={blog.id}/>
            </div>
        )
      })}

      
    </div>
    </div>
  )
}

export default BlogTable

const Actions = ({id}:{id:string}) =>{
    return (
        <div className='flex items-center gap-5 flex-wrap md:flex-row'>
            <Button variant={'outline'} className='flex ites-center gap-2'><EyeOpenIcon/>View</Button>
            
            <DeleteAlert blogId={id}/>
            <Button variant={'outline'}  className='flex ites-center gap-2'><PencilIcon/>Edit</Button>
        </div>
    )
}
