'use client'
import React, { useState } from 'react'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'
export default function SignUpForm() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const router = useRouter()

    const handleSubmit = async ()=>{
        const signInData = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false
        })
        if (signInData?.error) {
            console.log(signInData.error)
        } else {
            router.push('/')
        }
    }
  return (
    <div className=' bg-slate-100 shadow-md border p-10 w-4/12 rounded-md'>
            <form action="" onSubmit={handleSubmit}>
                
                <div className='mt-4 flex justify-between'>
                    <label htmlFor="">Email</label>
                    <input type="email" className='w-9/12 p-2' value={email} onChange={(e)=> setEmail(e.target.value)} />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">What is your name?</span>
                        <span className="label-text-alt">Top Right label</span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <label className="label">
                        <span className="label-text-alt">Bottom Left label</span>
                        <span className="label-text-alt">Bottom Right label</span>
                    </label>
                </div>
                <div className='mt-4 flex justify-between'>
                    <label htmlFor="">Password</label>
                    <input type="password" value={password} className='w-9/12 p-2' onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='flex justify-center mt-10'>
                    <button type='submit' className='bg-blue-700 w-full text-white p-2 rounded-md'>Sign In</button>
                </div>
            </form>
        </div>
  )
}
