import Image from 'next/image'
import Navbar from './components/Navbar'
import Link from 'next/link'


export default async function Home() {
  return (
    <div>
      <Navbar/>
      <div className='flex justify-center mt-10'>
        <Link href={'/protected'}>
        <button className='p-2 bg-blue-700 shadow-md rounded-md text-white'>Protected route</button>
        </Link>
        
      </div>
    </div>
  )
}
