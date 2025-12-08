import { FlameIcon, HomeIcon, User2Icon } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <div className='w-full h-18 flex flex-row items-center justify-around px-8 border-t border-stone-200'>
            <span className='flex flex-col gap-0 items-center justify-center text-stone-400'>
                <HomeIcon width={18} />
                <p className='text-xs font-[inter] select-none'>Home</p>
            </span>
            <span className='flex flex-col gap-0 items-center text-stone-400 justify-center'>
                <FlameIcon width={18} />
                <p className='text-xs font-[inter] select-none'>Progress</p>
            </span>
            <span className='flex flex-col gap-0 items-center text-stone-400 justify-center'>
                <User2Icon width={18} />
                <p className='text-xs font-[inter] select-none'>Profil</p>
            </span>
        </div>
    )
}

export default Footer
