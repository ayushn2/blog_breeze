import React, { useTransition } from 'react'
import { Button } from '../ui/button'
import { LightningBoltIcon } from '@radix-ui/react-icons'
import { useUser } from '@/lib/store/user'
import LoginForm from '../nav/LoginForm'
import { useParams, usePathname } from 'next/navigation'
import { checkout } from '@/lib/actions/stripe'
import { cn } from '@/lib/utils'
import {loadStripe} from "@stripe/stripe-js"
import stripe from 'stripe'

const Checkout = () => {

    const pathname = usePathname()
    const [isPending,startTransition] = useTransition()

    const user = useUser((state)=>state.user)

    const handleCheckout =  (e:any) =>{
        e.preventDefault()
        startTransition( async ()=>{
            const data = JSON.parse(
                await checkout(user?.user_metadata?.email!,location.origin + pathname)
            )

            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)
            await stripe?.redirectToCheckout({sessionId : data.id})
            
        })
        
    }

    if(!user?.id){
        return(
            <div className='flex items-center h-96 w-full justify-center gap-4'>
                    <LoginForm/> to read
            </div>
        ) 
    }

  return (
    <form className={cn('h-96 w-full flex items-center justify-center',{"animate-pulse":isPending})} onSubmit={handleCheckout}>
        <Button variant="ghost" className='flex flex-col p-12 gap-5 ring-2 ring-primary'>
            <span className='flex items-center gap-3 text-2xl font-bold text-primary'>
                <LightningBoltIcon className={cn('w-5 h-5',!isPending?"animate-bounce":"animate-spin")}/>
                    Upgrade to Pro
            </span>
            <span className='felx items-center justify-center'>
                <p className='text-secondary-foreground'>Unlock all blog contents</p>
            </span>
        </Button>
    </form>
  )
}

export default Checkout
