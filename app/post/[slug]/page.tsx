import axios from 'axios'
import React from 'react'
import Navbar from '@/app/components/Navbar'
import CommentInput from '../CommentInput'

async function getPostById(id:number){
  try {
    const res = await axios.get(`http://localhost:3000/api/post/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}


export default async function page({params}:{params:{slug:number}}) {

  const getData = await getPostById(params.slug)
  const post = getData.post
  const comment = post.comment

  return (
    <div>
      <Navbar/>
      <div className='flex justify-center'>
        <div className="card w-8/12 bg-primary text-primary-content mt-10">
          <div className="card-body">
            <h2 className="card-title text-3xl">{post.title}</h2>
            <p className=' font-light'>{post.body}</p>
          </div>
          
        </div>
      </div>
      <div className='flex justify-center mt-6'>
        <CommentInput params={params.slug}/>
      </div>
      
      <div className='flex justify-center'>
        <div className='w-8/12'>
        <div className='mt-6'>
        {comment.map((item: any, index:number)=>(
            <div className="card w-full bg-base-100 border mt-2" key={index}>
            <div className="card-body">
              <p>{item.user.name}</p>
              <h2 className='card-title'>{item.comment}</h2>
            </div>
          </div>
        ))}
        </div>
        </div>
       
      </div>
      
      
    </div>
  )
}
