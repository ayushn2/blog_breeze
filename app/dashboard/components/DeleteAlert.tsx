"use client"

import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { deleteBlog } from '@/lib/actions/blog'
import { useTransition } from 'react'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const DeleteAlert = ( {blogId} : {blogId:string}) => {

    const [isPending,startTransition] = useTransition()

    const onSubmit = async (e:any)=>{
        e.preventDefault()
        startTransition( async ()=>{
            const result = await deleteBlog(blogId)
            const {error} = JSON.parse(result);

            if(error?.message){
                toast({
                  title: "Failed to delete Blog",
                  description: (
                    <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                      <code className="text-white">{error.message}</code>
                    </pre>
                  ),
                })
              }else{
                toast({
                  title:"Successfully deleted "
                })
               
              }
        })
           
    }

  return (
    <div>
        <AlertDialog>
      <AlertDialogTrigger asChild>
        
            <Button variant={'outline'}  className='flex ites-center gap-2'><Trash2Icon/>Delete</Button>
            
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your blog from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form onSubmit={onSubmit}>

            <Button className='flex items-center gap-2'>
                <AiOutlineLoading3Quarters 
                className={cn("animate-spin",{"hidden":!isPending})}/>
                Continue
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        
    </div>
    
  )
}

export default DeleteAlert
