import React from 'react'
import axios from 'axios'
import Link from 'next/link'

async function getPost(){
  try {
    const res = await axios.get('http://localhost:3000/api/post/show')
    return res.data
  } catch (error) {
    console.log(error)
    return error
  }
}
export default async function content() {

  const data = await getPost()
  const post = data.post

  return (
    <div className='flex justify-center mt-4'>
        <div className=' max-xl:w-11/12 w-8/12 px-6'>
          {post.map((item: any)=>(
            <Link href={`/post/${item.id}`} key={item.id} >
              <div className="card w-full bg-primary text-primary-content mt-2">
                <div className="card-body flex ">
                  <h2 className="card-title text-3xl">{item.title}</h2>
                  <p className='text-info'>{item.user.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
    </div>
  )
}
