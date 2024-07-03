import { Button } from '@/components/ui/button'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import { PencilIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Switch } from '@/components/ui/switch'

const BlogTable = () => {
  return (
    <div className='overflow-x-auto'>

  
    <div className='border bg-gradient-dark rounded-md w-[900px] md:w-full'>
      <div className='grid grid-cols-5 p-5 text-accent border-b'>
        <h1 className='col-span-2'>Title</h1>
        <h1>Premium</h1>
        <h1>Publish</h1>
      </div>
      <div className='grid grid-cols-5 p-5'>
            <h1 className='col-span-2'>Blog Title</h1>
            <Switch checked={false}/>
            <Switch checked={true}/>
            <Actions/>
      </div>
    </div>
    </div>
  )
}

export default BlogTable

const Actions = () =>{
    return (
        <div className='flex items-center gap-5 flex-wrap md:flex-row'>
            <Button variant={'outline'} className='flex ites-center gap-2'><EyeOpenIcon/>View</Button>
            <Button variant={'outline'}  className='flex ites-center gap-2'><Trash2Icon/>Delete</Button>
            <Button variant={'outline'}  className='flex ites-center gap-2'><PencilIcon/>Edit</Button>
        </div>
    )
}
