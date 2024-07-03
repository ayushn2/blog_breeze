import React, { ReactNode } from 'react'
import Navlinks from './components/Navlinks'

const layout = (
    {children}:
    {children:ReactNode}
) => {
  return (
    <div className='space-y-2'>
        <Navlinks/>
      {children}
    </div>
  )
}

export default layout
