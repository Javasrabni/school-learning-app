"use client"
import Image from "next/image"
import { useState } from "react"
import { vibrateBtn } from "../vibrateBtn/ButtonVibrate"
import { ChevronLeftIcon } from "lucide-react"
import RegisterPage from "../auth/register/page"

const SplashOnboarding = () => {
    const [progressBar, setProgressBar] = useState(1)

    // USER REGISTER!!!!
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [grade, setGrade] = useState("")
    const [password, setPassword] = useState("")
    async function PostRegisterAcc() {
        if (username.length >= 20 || username.length < 5) {
            alert("Masukkan nama yang valid")
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
            if (res.ok) {
                setUsername("")
                setEmail("")
                setGrade("")
                setPassword("")
            }
        } catch (error) {
            console.error(error)
        }
    }

    // BUTTON CTA
    function handleButton() {
        vibrateBtn()
        if (progressBar === 3) {
            PostRegisterAcc()
        } else {
            setProgressBar(prev => prev + 1)
        }
    }


    const OnBoardingData = [
        { no: 1, h1: "E-Learning School", p: 'Belajar matematika Sekolah Menengah Pertama (SMP) menyenangkan bersama sch-learning!', image: '/Assets/OnBoarding/boarding1.png' },
        { no: 2, h1: "Kamu siap untuk belajar?", p: 'Kita akan belajar matematika dengan mudah, seru, dan lengap!', image: '/Assets/OnBoarding/boarding2.png' },
        { no: 3, h1: "Kita buat akun terlebih dahulu yuk!", p: 'Kami butuh informasi tentang kamu', image: '' },
    ]

    return (
        <div className="absolute flex flex-col items-center justify-between py-8 inset-0 top-0 left-0 h-screen w-full bg-white">
            {/* Container slider */}
            <div className="overflow-hidden flex-1 flex items-center w-full">
                <div
                    className="flex transition-transform duration-200 ease-in-out w-full"
                    style={{ transform: `translateX(-${(progressBar - 1) * 100}%)` }}
                >
                    {OnBoardingData.map(i => (
                        <span key={i.no} className={`flex-shrink-0 w-full flex ${i.no === 2 ? "flex-col-reverse" : "flex-col"} items-center gap-8 justify-center px-8 transition-opacity duration-700 ease-in-out ${progressBar === i.no ? "opacity-100" : "opacity-0"}`}>
                            <span className="flex flex-col gap-1 text-center">
                                <h1 className="font-bold">{i.h1}</h1>
                                <p className="text-stone-400">{i.p}</p>
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
                                // <div className="w-full h-full flex flex-col gap-4">
                                //     <input type="text" className="bg-stone-100 h-12 rounded-sm px-4 text-sm" placeholder="Nama Kamu" />
                                //     <input type="text" className="bg-stone-100 h-12 rounded-sm px-4 text-sm" placeholder="kamu@gmail.com" />
                                //     <input type="text" className="bg-stone-100 h-12 rounded-sm px-4 text-sm" placeholder="••••••••••••" />
                                // </div>
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
                    {progressBar === 3 ? "Daftar" : "Selanjutnya"}
                </button>
            </div>

        </div>
    )
}

export default SplashOnboarding
