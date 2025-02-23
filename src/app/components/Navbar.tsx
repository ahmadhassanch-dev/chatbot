import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div className='flex bg-black  text-white justify-between items-center p-4'>
        <div className='text-2xl font-bold cursor-pointer'>Hassan AI</div>
        <div className='flex gap-4 font-semibold' >
            <Link className='hover:text-blue-600 ease-in-out duration-300' href="/">Home</Link>
            <Link className='hover:text-blue-600 ease-in-out duration-300' href="/about">About</Link>
            <Link className='hover:text-blue-600 ease-in-out duration-300' href="/contact">Contact</Link>
        </div>
      

    </div>
  )
}

export default Navbar
