import React from 'react'
import Footer from '../partials/footer/footer'
import Navbar from '../partials/navbar/navbar'

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className='flex flex-col mx-auto my-14 max-w-[32rem] h-screen w-full bg-white'>
            <Navbar />
            <div className='w-full max-h-screen h-full flex '>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default DashboardLayout
