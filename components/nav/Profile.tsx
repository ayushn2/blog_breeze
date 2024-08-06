import { useUser } from '@/lib/store/user'
import React from 'react'
import Image from 'next/image'
import { Popover,PopoverTrigger,PopoverContent } from '../ui/popover'
import Link from 'next/link'
import { Button } from '../ui/button'
import { DashboardIcon,LockOpen1Icon} from '@radix-ui/react-icons'
import { createBrowserClient } from '@supabase/ssr'
import ManageBilling from '../stripe/ManageBilling'


const Profile = () => {

    const user = useUser((state)=>state.user)
    const setUser = useUser((state)=> state.setUser)

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleLogout = async () =>{
        await supabase.auth.signOut();
        setUser(null)
        
    }

    const isAdmin = user?.role === "admin"
    const isSub = user?.subscription_status

  return (
    <Popover>
        <PopoverTrigger><Image src={user?.image_url || ""} alt={user?.display_name || ""} width={50} height={50} className='rounded-full ring-2 ring-ring' /></PopoverTrigger>
        <PopoverContent className='p-2 space-y-3'>
            <div className='px-4 text-sm'>
                <p>
                    {user?.display_name}
                </p>
                <p className='text-gray-500'>
                    {user?.email}
                </p>
            </div>
            {isAdmin && (
            <Link href="/dashboard" className='block'>
                <Button variant="ghost" className='w-full flex items-center justify-between'>
                    Dashboard
                    <DashboardIcon/>
                </Button>
            </Link>
            )}
            {isSub &&<ManageBilling customerId={''}/>}
            <Link href="/" className='block'>
                <Button variant="ghost" className='w-full flex items-center justify-between' onClick={handleLogout}>
                    Logout
                    <LockOpen1Icon/>
                </Button>
            </Link>
        </PopoverContent>
    </Popover>
    
  )
}

export default Profile
