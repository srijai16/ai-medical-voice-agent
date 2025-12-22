import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const menuOptions = [
    {
        id: 1,
        name: 'Home',
        path: '/dashboard'  // Changed from '/home'

    },
    {
        id: 2,
        name: 'History',
        path: '/dashboard/history'

    }, {
        id: 3,
        name: 'Pricing',
        path: '/dashboard/billing'

    }, {
        id: 4,
        name: 'Profile',
        path: '/dashboard/profile'

    }
]

function AppHeader() {
    return (
        <div className="flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40 ">
            <Link href="/dashboard">
                <Image src={'/logo.svg'} alt='logo' width={220} height={90} />
            </Link>
            <div className="hidden md:flex gap-12 items-center">
                {menuOptions.map((option, index) => (
                    <Link key={index} href={option.path}>
                        <h2 className="hover:font-bold cursor-pointer hover:text-blue-600 transition-all">{option.name}</h2>
                    </Link>
                ))}
            </div>
            <UserButton />
        </div>
    )
}
export default AppHeader;