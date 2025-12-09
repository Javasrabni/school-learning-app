import React from 'react'
import Footer from '../partials/footer/footer'
import Navbar from '../partials/navbar/navbar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col mx-auto max-w-[32rem] h-screen w-full bg-white overflow-x-hidden">

            {/* Area konten yang bisa scroll */}
            <div className="flex-1 overflow-y-auto pb-[88px] pt-8">
                {children}
            </div>

            {/* Footer fixed */}
            <Footer />
        </div>
    );
};

export default DashboardLayout
