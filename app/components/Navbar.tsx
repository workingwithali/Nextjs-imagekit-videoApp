'use client';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="w-full flex items-center justify-between p-4 bg-black border-b border-purple-600">
            {/* Logo */}
            <div className="text-2xl font-bold text-purple-500">
                <Link href="/">MyLogo</Link>
            </div>

            {/* Buttons */}
            <div className="space-x-4">
                <Link href="/login">
                    <button className="px-4 py-2 border border-purple-500 text-purple-500 rounded hover:bg-purple-900 transition">
                        Login
                    </button>
                </Link>
                <Link href="/register">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
                        Register
                    </button>
                </Link>
            </div>
        </nav>
    );
}
