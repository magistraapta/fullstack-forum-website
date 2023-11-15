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
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (event: FormEvent)=>{
        event.preventDefault()
        try {
            const res: AxiosResponse<loginResponse> = await axios.post('api/user/signup', {
                name,
                email,
                password
            })
            router.push('/api/auth/signin')
            console.log(res.data)

        } catch (error) {
            console.log(error)
            setError('error sign in')
        }
    }

  return (
    <div className=' bg-base-100 card shadow-md border p-10 w-4/12 max-lg:w-7/12 max-sm:w-10/12 rounded-md'>
            <form action="" onSubmit={handleSubmit}>
                <div className='mt-4 flex justify-between'>
                    <label htmlFor="">Username</label>
                    <input type="text" className='w-9/12 p-2 input input-bordered' value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                
                <div className='mt-4 flex justify-between'>
                    <label htmlFor="">Email</label>
                    <input type="email" className='w-9/12 p-2 input input-bordered' value={email} onChange={(e)=> setEmail(e.target.value)} />
                </div>
                <div className='mt-4 flex justify-between'>
                    <label htmlFor="">Password</label>
                    <input type="password" value={password} className='w-9/12 p-2 input input-bordered' onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='flex justify-center mt-10'>
                    <button type='submit' className='btn btn-primary w-full text-white'>Sign In</button>
                </div>
                {error && <p className='text-red-500'>{error}</p>}
            </form>
        </div>
  )
}
