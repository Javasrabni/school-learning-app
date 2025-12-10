"use client"
import { ChevronDownIcon, EyeClosedIcon, EyeIcon } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
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


    // DOM STYLE
    const UsernameField = useRef<HTMLDivElement | null>(null)
    const PasswordFiled = useRef<HTMLDivElement | null>(null)
    let EmailField: HTMLElement | null = null

    // HANDLE ERR DOCUMENT (DOM) 
    useEffect(() => {
        EmailField = document.getElementById("EmailRegister")
    }, [])

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Username */}
            <div className='flex flex-row gap-1 items-center  bg-stone-100 rounded-sm pr-4 w-full' id='UsernameRegister' ref={UsernameField}>
                <input type="text" className="bg-stone-100 h-12 rounded-sm px-4 text-sm w-full outline-none" value={username} onChange={(e) => { setUsername(e.target.value); if (UsernameField.current) { UsernameField.current.style.outline = "none" } }} maxLength={20} placeholder={"Nama Kamu"} />
                <p className='text-xs w-8 text-stone-400 grow-0'>{username?.length}/20</p>
            </div>

            {/* Email */}
            <input type="text" id='EmailRegister' className="bg-stone-100 h-12 rounded-sm px-4 text-sm outline-none" value={email} onChange={(e) => { setEmail(e.target.value); if (EmailField) EmailField.style.outline = 'none' }} placeholder={"kamu@gmail.com"} />

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
                <div className='flex flex-row gap-1 items-center justify-between bg-stone-100 rounded-sm pr-4 w-full' id='Password' ref={PasswordFiled}>
                    <input type={viewPassInput ? 'text' : 'password'} className="bg-stone-100 h-12 rounded-sm px-4 text-sm outline-none w-full" value={password} onChange={(e) => { setPassword(e.target.value); if (PasswordFiled.current) { PasswordFiled.current.style.outline = 'none' } }} placeholder={"Password Mathemagic"} minLength={8} />
                    <button onClick={() => setViewPassInput(prev => !prev)}>
                        {viewPassInput ? <EyeClosedIcon width={16} className='text-stone-400' /> : <EyeIcon width={16} className='text-stone-400' />}
                    </button>
                </div>
                {/* <label htmlFor="Password" className='text-xs text-stone-400'>Password setidaknya lebih dari 8 karakter</label> */}

            </div>
        </div>
    )
}

export default RegisterPage
