"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { vibrateBtn } from "../vibrateBtn/ButtonVibrate"
import { ChevronLeftIcon, XIcon } from "lucide-react"
import RegisterPage from "../auth/register/registerPage"
import LoginPage from "../auth/login/loginPage"
import { useUser } from "@/context/userDataCookie"
import { useRouter } from "next/navigation"
import { setToken } from "@/utils/storage"

const SplashOnboarding = () => {
    const router = useRouter()
    const { user, refreshUser } = useUser()
    const [progressBar, setProgressBar] = useState(1)

    // USER REGISTER!!!!
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [grade, setGrade] = useState("")
    const [password, setPassword] = useState("")

    // USER LOGIN
    const [identifier, setIdentifier] = useState('')

    // LOGIN/REGISTER STATUS
    const [onRegister, setOnRegister] = useState(true)
    const [showNotif, setShowNotif] = useState(false)

    // CLOSEPOPUP
    // useEffect(() => {
    //     if (!showNotif) return;

    //     const delay = setTimeout(() => {
    //         setShowNotif(false)
    //     }, 5000)
    //     return () => clearTimeout(delay)
    // }, [showNotif])

    // HANDLE ERR DOCUMENT (DOM)
    useEffect(() => {
        const UsernameRegister = document.getElementById("UsernameRegister")
        const PasswordField = document.getElementById("Password")
        const EmailRegister = document.getElementById("EmailRegister")
        // JANGAN lakukan apa pun di luar sini
    }, [])

    // USER REGISTER
    async function PostRegisterAcc() {
        const UsernameRegister = document.getElementById('UsernameRegister')
        const PasswordField = document.getElementById('Password')
        const EmailRegister = document.getElementById("EmailRegister")

        // Reset outline 
        if (UsernameRegister) UsernameRegister.style.outline = "none"
        if (PasswordField) PasswordField.style.outline = "none"
        if (EmailRegister) EmailRegister.style.outline = "none"

        if (username.length >= 20 || username.length < 5) {
            alert("Masukkan nama yang valid")
            if (UsernameRegister) {
                UsernameRegister.style.outline = "1px solid tomato"
            }
            return
        }

        if (!password || password.length <= 8) {
            alert("Password setidaknya lebih dari 8 karakter")
            if (PasswordField) {
                PasswordField.style.outline = "1px solid tomato"
            }
            return
        }

        if (!email || !email.includes("@gmail.com")) {
            alert("Masukkan email yang valid")
            if (EmailRegister) {
                EmailRegister.style.outline = "1px solid tomato"
            }
            return
        }

        try {
            const res = await fetch('/api/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    email,
                    grade,
                    password
                })
            })
            const data = await res.json()
            console.log(data)
            if (!res.ok) {
                if (data.EmailMessage) {
                    alert(data.EmailMessage)
                    if (EmailRegister) {
                        EmailRegister.style.outline = "1px solid tomato"
                    }
                }
                return
            } else {
                setUsername("")
                setEmail("")
                setGrade("")
                setPassword("")
                setOnRegister(false)
                setShowNotif(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    // USER LOGIN 
    async function PostLoginUser() {
        try {
            const res = await fetch('/api/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    usernameOrEmail: identifier.toLowerCase(),
                    password
                })
            })
            const data = await res.json()
            console.log(data)
            if (!res.ok) {
                alert(data.message)
                return
            } else {
                setUsername("")
                setEmail("")
                setPassword("")

                if(data.accessToken) {
                    await setToken(data.accessToken)
                }
                refreshUser()
                router.push("/dashboard")
                // window.location.replace("/dashboard")
            }
        } catch (error) {
            console.error(error)
        }
    }

    // BUTTON CTA
    function handleButton() {
        vibrateBtn()
        if (progressBar === 3 && onRegister) {
            PostRegisterAcc()
            return
        } else if (progressBar === 3 && !onRegister) {
            PostLoginUser()
            return
        } else {
            setProgressBar(prev => prev + 1)
        }
    }


    const OnBoardingData = [
        { no: 1, h1: "Mathemagic", p: 'Belajar matematika Sekolah Menengah Pertama (SMP) menyenangkan bersama Mathemagic!', image: '/Assets/OnBoarding/boarding1.png' },
        { no: 2, h1: "Siap untuk belajar?", p: 'Kita akan belajar matematika dengan mudah, seru, dan lengkap!', image: '/Assets/OnBoarding/boarding2.png' },
        { no: 3, h1: "Kita buat akun terlebih dahulu yuk!", p: 'Kami butuh informasi tentang kamu', image: '' },
    ]

    return (
        <div className={`absolute flex flex-col items-center justify-between py-8 inset-0 top-0 h-screen w-full bg-white ${user ? "opacity-0 left-[-32rem]" : "opacity-100 left-0 "} `}>
            {/* Container slider */}
            <div className="overflow-hidden flex-1 flex items-center w-full">
                <div className={`w-full px-8 absolute z-10 left-[50%] translate-x-[-50%] transition-all duration-200 ease-in-out ${showNotif && progressBar === 3 && !onRegister ? 'top-12 opacity-100' : "top-[-64px] opacity-0"}`}>
                    <div id="toast-success" className="flex items-center w-full justify-between p-4 text-gray-700 bg-green-100 rounded-lg shadow border border-green-300" role="alert">
                        <div className="flex flex-row gap-1 items-center">
                            <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-green-600 bg-green-200 rounded">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" /></svg>
                                <span className="sr-only">Check icon</span>
                            </div>
                            <div className="ms-3 text-sm font-normal">Daftar berhasil, silakan login!</div>
                        </div>

                        <XIcon width={16} className="cursor-pointer" onClick={() => setShowNotif(false)} />
                    </div>
                </div>
                <div
                    className="flex transition-transform duration-200 ease-in-out w-full"
                    style={{ transform: `translateX(-${(progressBar - 1) * 100}%)` }}
                >
                    {OnBoardingData.map(i => (
                        <span key={i.no} className={`flex-shrink-0 w-full flex ${i.no === 2 ? "flex-col-reverse" : "flex-col"} items-center gap-8 justify-center px-8 transition-opacity duration-700 ease-in-out ${progressBar === i.no ? "opacity-100" : "opacity-0"}`}>
                            <span className="flex flex-col gap-1 text-center">
                                <h1 className="font-bold">{i.h1}</h1>
                                <p className="text-stone-400 text-sm">{i.p}</p>
                            </span>
                            {i.image && (
                                <Image
                                    src={i.image}
                                    width={240}
                                    height={240}
                                    className="object-cover animate-pulse"
                                    alt="Boarding"
                                />
                            )}

                            {i.no === 3 && (
                                <>
                                    {onRegister ? (
                                        <>
                                            <RegisterPage
                                                username={username}
                                                setUsername={setUsername}
                                                email={email}
                                                setEmail={setEmail}
                                                grade={grade}
                                                setGrade={setGrade}
                                                password={password}
                                                setPassword={setPassword}
                                            />
                                            <div className="w-full text-left mt-[-12px]">
                                                <p className=' text-xs'>sudah punya akun? <span className="text-blue-500 cursor-pointer" onClick={() => setOnRegister(false)}>Login</span> </p>
                                            </div>

                                        </>
                                        // <div className="w-full h-full flex flex-col gap-4">
                                        //     <input type="text" className="bg-stone-100 h-12 rounded-sm px-4 text-sm" placeholder="Nama Kamu" />
                                        //     <input type="text" className="bg-stone-100 h-12 rounded-sm px-4 text-sm" placeholder="kamu@gmail.com" />
                                        //     <input type="text" className="bg-stone-100 h-12 rounded-sm px-4 text-sm" placeholder="••••••••••••" />
                                        // </div>

                                    ) : (
                                        <>
                                            <LoginPage
                                                identifier={identifier}
                                                setIdentifier={setIdentifier}
                                                password={password}
                                                setPassword={setPassword}
                                            />
                                            <div className="w-full text-left mt-[-12px]">
                                                <p className=' text-xs'>belum punya akun? <span className="text-blue-500 cursor-pointer" onClick={() => setOnRegister(true)}>Daftar</span> </p>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </span>
                    ))}
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-[50%] flex flex-row gap-1 items-center justify-center mb-8">
                {OnBoardingData.map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 rounded-full transition-all duration-200 ease-in-out ${progressBar === index + 1 ? "w-12 bg-stone-400" : "w-6 bg-stone-200"
                            }`}
                    />
                ))}
            </div>

            {/* Button */}
            <div className="px-8 w-full flex flex-row gap-2">
                {/* Prev button */}
                <button
                    className={`transition-all duration-100 ease-in-out flex items-center justify-center ${progressBar > 1 ? "w-[20%] opacity-100" : "w-0 opacity-0 pointer-events-none"
                        } h-13 font-bold rounded-full cursor-pointer ${progressBar === 3 ? "bg-stone-900 text-white" : "bg-[var(--accentColor)] text-white"
                        }`}
                    onClick={() => { vibrateBtn(); setProgressBar(prev => prev - 1) }}
                >
                    <ChevronLeftIcon width={16} />
                </button>

                {/* Next button */}
                <button
                    className={`transition-all duration-100 ease-in-out h-13 font-bold rounded-full cursor-pointer ${progressBar > 1 ? "w-[80%]" : "w-full"
                        } ${progressBar === 3 ? "bg-stone-900 text-white" : "bg-[var(--accentColor)] text-white"}`}
                    onClick={handleButton}
                >
                    {progressBar === 3 ? onRegister ? "Daftar" : 'Login' : "Selanjutnya"}
                </button>
            </div>

        </div>
    )
}

export default SplashOnboarding
