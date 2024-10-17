// components/Sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTachometerAlt, FaProjectDiagram, FaServicestack, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";

interface NavItem {
    name: string;
    href: string;
    icon: React.ReactElement;
}

const navItems: NavItem[] = [
    {
        name: "Dashboard",
        href: "/admin",
        icon: <FaTachometerAlt />,
    },
    {
        name: "Projects",
        href: "/admin/projects",
        icon: <FaProjectDiagram />,
    },
    {
        name: "Services",
        href: "/admin/services",
        icon: <FaServicestack />,
    },
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen bg-gray-800 text-white fixed">
            <div className="flex items-center justify-center h-16 border-b border-gray-700">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>
            <nav className="mt-10">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link href={item.href} key={item.name}  className={`flex items-center py-2.5 px-4 transition-colors duration-200 transform ${
                            isActive ? "bg-gray-700" : "hover:bg-gray-700"
                        }`}>
                                <span className="text-lg">{item.icon}</span>
                                <span className="mx-4 font-medium">{item.name}</span>

                        </Link>
                    );
                })}
                {/* Sign Out Button */}
                <button
                    onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                    className="flex items-center w-full py-2.5 px-4 mt-4 transition-colors duration-200 transform hover:bg-gray-700"
                >
                    <FaSignOutAlt className="text-lg" />
                    <span className="mx-4 font-medium">Sign Out</span>
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
