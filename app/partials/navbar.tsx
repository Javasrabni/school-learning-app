import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full h-13 flex flex-row p-6'>
        <div className='w-24 h-6 relative'>
        <Image src={'/Assets/onPage/logo.png'} alt='logo' fill className='object-contain select-none' draggable={false} />
        </div>
    </div>
  )
}

export default Navbar
