import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import axios from 'axios'

export default async function page() {
    const res = await fetch('http://localhost:3000/api/user/show').then((res)=> res.json())
    const session = await getServerSession()
    if (!session || !session.user) {
        redirect('/api/auth/signin')
    }
    const user = res.user
    
  return (
    <div>
        {user.map((item: any, index: number)=> (
            <p key={item.id}>{item.username}</p>
        ))}
    </div>
  )
}
