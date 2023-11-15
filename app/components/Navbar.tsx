'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, Fragment, FormEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import Link from 'next/link'

function AuthComponent(){
    const {data:session} = useSession()
    const router = useRouter()
    if (session) {
        return (
            
            <div className="dropdown">
                <label tabIndex={0} className="btn m-1 btn-primary">Hi, {session?.user?.name}</label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><button onClick={()=> signOut()} className='text-error'>Sign Out</button></li>
                        <li>
                            <Link href={'/profile'}>
                                Profile
                            </Link>
                        </li>
                </ul>
            </div>
        )
    }

    function register(){
        router.push('/signup')
    }

    return(
        <div className='flex gap-4'>
            <button className='btn-primary btn btn-md' onClick={()=> signIn()}>Sign In</button>
            <button className='btn-outline btn-primary btn' onClick={()=> register()}>Sign up</button>
        </div>
    )
}


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const {data:session} = useSession()
    const router = useRouter()

    const handleSubmit = async (event: FormEvent)=>{
        event.preventDefault()
        try {
            
            const res = await axios.post('http://localhost:3000/api/post/create',{
                title,
                body,
                userEmail: session?.user?.email
            })
            
            setIsOpen(false)
            setBody('')
            setTitle('')
            
            router.refresh()
            console.log(res)
        } catch (error) {
            console.log(error)
            return error
        }
    }
    
    function openModal(){
        if (!session || !session.user) {
            router.push('/api/auth/signin')
        } else {
            setIsOpen(true)
        }
        
    }
    function closeModal(){
        setIsOpen(false)
    }
    
  return (
    <div className='flex justify-center shadow-md'>
        <div className='w-11/12 p-6 flex items-center justify-between'>
            <Link href={'/'}>
                <h3 className='font-bold text-2xl'> <span className='text-info'>Forum</span> <br /> Keluh-kesah</h3>
            </Link>
            
            <div className='flex gap-6 items-center'>
                <button onClick={openModal} className='btn'>Create post</button>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                What is happening?
                            </Dialog.Title>
                            <div className="mt-2">
                                <div className='grid gap-y-4'>
                                    <input type="text" placeholder='Title here...' required value={title} onChange={(e)=>setTitle(e.target.value)} className='border border-slate-400 w-full rounded-lg p-2' />
                                    <textarea name="" id="" value={body} required onChange={(e)=>setBody(e.target.value)} className='p-2 border-slate-400 border rounded-lg' ></textarea>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={handleSubmit}
                                >
                                Post
                                <span className="material-symbols-outlined">
                                    send
                                </span>
                                </button>

                            </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        </div>
                    </div>
                    </Dialog>
                </Transition>
                <AuthComponent/>
            </div>
            
        </div>
    </div>
  )
}
