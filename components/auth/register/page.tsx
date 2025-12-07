"use client"
import { ChevronDownIcon, EyeClosedIcon, EyeIcon } from 'lucide-react'
import React, { useState } from 'react'

interface RegisterProps {
    username: string
    setUsername: (val: string) => void
    email: string
    setEmail: (val: string) => void
    grade: string
    setGrade: (val: string) => void
    password: string
    setPassword: (val: string) => void
}


const RegisterPage = ({
    username, setUsername,
    email, setEmail,
    grade, setGrade,
    password, setPassword
}: RegisterProps) => {


    const [viewPassInput, setViewPassInput] = useState(false)

    const GradeOption = ["Kelas 7", "Kelas 8", "Kelas 9"]



    return (
        <div>
            <div className="flex flex-col gap-4 shrink-0 min-w-full">
                {/* Username */}
                <div className='flex flex-row gap-1 items-center  bg-stone-100 rounded-sm pr-4 w-full'>
                    <input type="text" className="bg-stone-100 h-12 rounded-sm px-4 text-sm w-full outline-none" value={username} onChange={(e) => setUsername(e.target.value)} maxLength={20} placeholder={"Nama Kamu"} />
                    <p className='text-xs w-8 text-stone-400 grow-0'>{username?.length}/20</p>
                </div>

                {/* Email */}
                <input type="text" className="bg-stone-100 h-12 rounded-sm px-4 text-sm outline-none" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"kamu@gmail.com"} />

                {/* Kelas */}
                <div className='flex flex-row gap-1 items-center justify-between bg-stone-100 rounded-sm pr-4 w-full'>
                    <select value={grade} className="bg-stone-100 h-12 rounded-sm px-4 w-full text-sm outline-none appearance-none  " onChange={(e) => setGrade(e.target.value)}>
                        {GradeOption.map((i, idx) =>
                            <option value={i} key={idx} className='pr-4'>{i}</option>
                        )}
                    </select>
                    <ChevronDownIcon width={16} className='text-stone-400 ' />
                </div>
                {/* Password */}
                <div>
                    <div className='flex flex-row gap-1 items-center justify-between bg-stone-100 rounded-sm pr-4 w-full'>
                        <input type={viewPassInput ? 'text' : 'password'} className="bg-stone-100 h-12 rounded-sm px-4 text-sm outline-none" id='Password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"Password"} minLength={8} />
                        <button onClick={() => setViewPassInput(prev => !prev)}>
                            {viewPassInput ? <EyeClosedIcon width={16} className='text-stone-400' /> : <EyeIcon width={16} className='text-stone-400' />}
                        </button>
                    </div>
                    <label htmlFor="Password" className='text-xs text-stone-400'>Password setidaknya lebih dari 8 karakter</label>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
