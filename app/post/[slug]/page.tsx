import axios from 'axios'
import React from 'react'
import Navbar from '@/app/components/Navbar'
import CommentSection from '../CommentSection'

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
        <div className=' w-8/12 flex justify-between gap-2'>
            <input type="text" placeholder="Write your comment about this" className="input input-bordered w-full" />
            <button className='btn-primary btn btn-outline'>Send</button>
        </div>
        
      </div>
      <div className='flex justify-center'>
        <div className='w-8/12'>
        <CommentSection/>
        </div>
       
      </div>
      
      
    </div>
  )
}
