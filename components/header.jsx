"use client"

import { decodeToken } from 'react-jwt';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import ConfirmationModal from './confirmationModal';
import { useRouter } from 'next/navigation';

const Header = () => {

    const [user, setUser] = useState('')
    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get('token')
        const userData = decodeToken(token)
        setUser(userData)
    }, [])

    function getInitials(fullName) {
        try {
            const names = fullName.split(' ');
            const initials = names.map(name => name.charAt(0).toUpperCase());
            return initials.join('');
        } catch (err) {
            console.log(err)
            return ''
        }
    }

    const logout = () => {
        const allCookies = Cookies.get()
        Object.keys(allCookies).forEach(cookie => {
            Cookies.remove(cookie)
        });
        router.replace('/login')
    }

    return (
        <>
            <ConfirmationModal title={'Logout'} message={'Do you want to logout?'} action={logout} />
            <div className='fixed flex flex-row items-center justify-between w-full px-6 min-h-16 bg-[#c7c7c722]'>
                <h2 className="text-3xl text-[#d8d8d8]">ATDO</h2>
                <div className='flex flex-row items-center justify-center gap-4'>
                    <p className="hidden text-white text-l md:block">{user?.name || '...'}</p>
                    <p className="text-white text-l md:hidden">{user?.name && getInitials(user?.name) || '...'}</p>
                    <button onClick={() => document.getElementById('my_modal_1').showModal()} className='p-2 rounded-badge hover:bg-[#ffffff11] duration-100'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#d8d8d8" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Header