'use client'
import React, { FormEvent, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'

interface loginResponse {
    username: String,
    email: String,
    password: String
}

export default function SignInForm() {
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const handleSubmit = async (event: FormEvent)=>{
        event.preventDefault()
        try {
            const res: AxiosResponse<loginResponse> = await axios.post('api/user/signin', {
                username,
                email,
                password
            })
            router.push('/signup')
        } catch (error) {
            console.log(error)
            setError('error sign in')
        }
    }

  return (
    <div className=' bg-slate-100 shadow-md border p-10 w-4/12 rounded-md'>
            <form action="" onSubmit={handleSubmit}>
                <div className='mt-4 flex justify-between'>
                    <label htmlFor="">Username</label>
                    <input type="text" className='w-9/12 p-2' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className='mt-4 flex justify-between'>
                    <label htmlFor="">Email</label>
                    <input type="email" className='w-9/12 p-2' value={email} onChange={(e)=> setEmail(e.target.value)} />
                </div>
                <div className='mt-4 flex justify-between'>
                    <label htmlFor="">Password</label>
                    <input type="password" value={password} className='w-9/12 p-2' onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='flex justify-center mt-10'>
                    <button type='submit' className='bg-blue-700 w-full text-white p-2 rounded-md'>Sign In</button>
                </div>
                {error && <p className='text-red-500'>{error}</p>}
            </form>
        </div>
  )
}
