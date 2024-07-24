import { readBlogContentById } from '@/lib/actions/blog'
import React from 'react'
import EditForm from './components/EditForm'

const page = async ({params}:{params:{id:string}}) => {

  const { data: blog} = await readBlogContentById(params.id)

  

  return (
    <EditForm blog={blog}/>
  )
}

export default page
