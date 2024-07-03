"use client";

import {PersonIcon, ReaderIcon} from "@radix-ui/react-icons"
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const Navlinks = () => {

    const pathname= usePathname()

    const links = [
        {
        href:"/dashboard",
        text:"dashboard",
        icon:ReaderIcon,
    },{
        href:"/dashboard/user",
        text:"user",
        icon:PersonIcon,
    }
]

  return (
    <div className='flex items-center gap-5'>
      {links.map((link,index)=>{
        return <Link 
        href={link.href} 
        key={index} 
        className={cn("flex items-center gap-1 hover:underline transition-all",
        {"text-primary underline":pathname === link.href}
        )
            
        }>
            <link.icon/>{link.text}
        </Link>
      })}
    </div>
  )
}

export default Navlinks
