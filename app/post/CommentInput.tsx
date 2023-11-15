'use client'
import { useSession } from 'next-auth/react'
import React, { FormEvent, useState } from 'react'
import axios from 'axios'
interface props{
    params:number
}
export default function CommentInput({params}: props) {
    const {data:session} = useSession()
    const [comment, setComment] = useState('')
    

    const postComment = async () =>{
        try {
            
            const res = await axios.post(`http://localhost:3000/api/post/comment/${params}`,{
                comment: comment,
                userEmail: session?.user?.email,
                post: params
            })
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    
  return (
        <form action="" onSubmit={postComment} className='w-8/12 flex  justify-between gap-2'>
             <input type="text" value={comment} onChange={(e)=> setComment(e.target.value)} placeholder="Write your comment about this" className="input input-bordered w-full" />
            <button type='submit' className='btn-primary btn btn-outline'>Send</button>
        </form>
        
  )
}
