'use client'
import { useSession, signIn, signOut } from 'next-auth/react'

function AuthComponent(){
    const {data:session} = useSession()

    if (session) {
        return (
            <div>
                Hi, {session?.user?.name} 
                <br />
                <button onClick={()=> signOut()} className='text-red-600 font-bold'>Sign Out</button>
            </div>
        )
    }

    return(
        <div>
            <button onClick={()=> signIn()}>Sign In</button>
        </div>
    )
}
export default function Navbar() {
  return (
    <div className='flex justify-center shadow-md'>
        <div className='w-11/12 p-6 flex items-center justify-between'>
            <h3 className='font-bold text-2xl'>Burung Biru</h3>
            <AuthComponent/>
        </div>
    </div>
  )
}
