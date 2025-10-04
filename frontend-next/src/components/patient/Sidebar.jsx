"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    House,
    Calendar,
    User,
} from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-screen bg-white/80 w-full px-2 md:px-4 py-6 md:py-8">
            {/* Logo */}
            <div className="flex justify-center px-2 md:px-4 py-1">
                <Image src="/logo.svg" alt="Logo" width={140} height={40} />
            </div>

            <div className="border-b border-gray-200 my-3 hidden md:block" />

            {/* Menus */}
            <nav className="flex-1 text-secondaryText mt-4 space-y-2">
                {menuItems.map(({ href, icon: Icon, label }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={label}
                            href={href}
                            className={`flex items-center gap-3 justify-center md:justify-start px-3 md:px-4 py-2 text-sm transition-colors duration-150 group rounded-[4px] ${
                                isActive
                                    ? "text-primaryText dark:text-background border-r-4 border-primary"
                                    : "hover:text-primaryText hover:border-r-4 border-primary"
                            }`}
                        >
                            <Icon 
                                className={`h-5 w-5 ${
                                    isActive 
                                        ? "text-primary" 
                                        : "text-secondaryText group-hover:text-primary"
                                }`} 
                            />
                            <span className="hidden md:inline font-medium text-[16px] tracking-wide">
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Card
            <div className="mt-auto mb-6 hidden md:block">
                <div className="bg-gradient-to-r from-primary/75 to-primary rounded-xl p-4">
                    <h3 className="font-semibold text-white text-center">Upgrade to Pro</h3>
                    <p className="text-sm text-white mt-1 text-center">
                        Unlock premium features and tools for your development workflow.
                    </p>
                </div>
            </div> */}
        </div>
    );
}

const menuItems = [
    { href: "/patient/home", icon: House, label: "Dashboard" },
    { href: "/patient/appointment", icon: Calendar, label: "Appointments" },
    { href: "/patient/profile", icon: User, label: "Profile" },
];