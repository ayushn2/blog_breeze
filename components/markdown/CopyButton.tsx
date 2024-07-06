"use client"

import { cn } from '@/lib/utils'
import { UserSquare } from 'lucide-react'
import React, { useState } from 'react'
import { BsCopy } from 'react-icons/bs'
import {IoCheckmarkOutline} from 'react-icons/io5'

const CopyButton = ({id}:{id:string}) => {

    const [onCopy,setOnCopy] = useState(false)
    const [onDone,setDone] = useState(false)

    const handleCopy = async ()=>{
        const text = document.getElementById(id)?.textContent;
        try {
            setOnCopy(true)
            await navigator.clipboard.writeText(text!);
        } catch (error) {
            console.log("Error copy")
        }
    }

  return (
    <div 
    onClick={handleCopy}
    className='p-2 hover:scale-105 cursor-pointer hover:bg-zinc-700 rounded-md relative'>

        <IoCheckmarkOutline className={cn('cursor-pointer transition-all w-5 h-5 text-primary',
        onDone?'scale-100':'scale-0')}
        onTransitionEnd={()=>{
            setTimeout(()=>{
                setOnCopy(false)
                setDone(false)
            })
        }}
        />

        <div className='h-full w-full absolute top-0 left-0 flex items-center justify-center'>
            <BsCopy 
            className={cn('transition-all', onCopy?"scale-0":"scale-100")}
            onTransitionEnd={()=>{
                if(onCopy){
                    setDone(true)
                }
            }}
            />
        </div>
      
    </div>
  )
}

export default CopyButton
