'use client'
import React, { useState, useEffect, createContext, useContext } from 'react'

interface UserData {
    _id: string,
    username: string,
    email: string,
    avatar?: string,
    createdAt: string
}

interface UserContextType {
    user: UserData | null;
    loading: boolean;
    refreshUser: () => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    refreshUser: () => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/me', { credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
