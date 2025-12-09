"use client"
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { FlameIcon, HomeIcon, User2Icon } from 'lucide-react'

const FooterClient = () => {
    const [activeTab, setActiveTab] = useState(1) // Ubah dari 0 ke 1 agar Home aktif secara default
    const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 })
    const tabRefs = useRef<(HTMLAnchorElement | null)[]>([])
    const containerRef = useRef<HTMLDivElement | null>(null)

    const data = [
        { no: 1, label: "Home", path: "/dashboard", icon: <HomeIcon width={18} /> },
        { no: 2, label: "Progress", path: "/dashboard", icon: <FlameIcon width={18} /> },
        { no: 3, label: "Profil", path: "/dashboard/profil", icon: <User2Icon width={18} /> },
    ]

    useEffect(() => {
        if (tabRefs.current[activeTab - 1] && containerRef.current) {
            const rect = tabRefs.current[activeTab - 1]!.getBoundingClientRect()
            const containerRect = containerRef.current.getBoundingClientRect()
            const height = containerRect.height // Tinggi container
            const widthMultiplier = 1.5 // Faktor untuk membuat width lebih lebar
            const highlightWidth = height * widthMultiplier // Width lebih lebar
            const centerLeft = rect.left - containerRect.left + (rect.width - highlightWidth) / 2 // Posisi tengah Link
            setHighlightStyle({
                left: centerLeft,
                width: highlightWidth
            })
        }
    }, [activeTab])

    return (
        <div 
            ref={containerRef}
            className='relative w-full h-18 flex flex-row items-center justify-around px-8 border-t border-stone-200'
        >
            {/* HIGHLIGHT ANIMASI */}
            <div
                className="
                absolute bottom-0 
                h-full bg-blue-300/10 rounded-full
                transition-all duration-200
            "
                style={{
                    left: `${highlightStyle.left}px`,
                    width: `${highlightStyle.width}px`
                }}
            />

            {data.map((i) =>
                <Link
                    href={i.path}
                    key={i.no}
                    ref={(el: HTMLAnchorElement | null) => { tabRefs.current[i.no - 1] = el; }}
                    className={`flex flex-col gap-0 items-center justify-center text-stone-400 z-10`}
                    onClick={() => setActiveTab(i.no)}
                >
                    <span className={`${i.no === activeTab ? "text-blue-600" : ""}`}>
                        {i.icon}
                    </span>
                    <p className={`${i.no === activeTab && 'text-blue-600'} text-xs font-[inter] select-none`}>{i.label}</p>
                </Link>
            )}
        </div>  
    )
}

export default FooterClient
