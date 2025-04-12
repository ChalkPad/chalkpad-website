"use client"
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
    return (
        <div className="min-h-screen bg-[#F1F1E8] text-[#4954E0] font-satoshi flex flex-col">
            {/* Navigation */}
            <nav className="container mx-auto py-8 px-4 flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/ChalkPadLogoClear.png"
                        alt="Chalkpad Logo"
                        width={75}
                        height={75}
                        className="mr-3"
                    />
                    <span className="text-3xl font-bold">Chalkpad</span>
                </Link>
            </nav>

            {/* Login Form */}
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
                        <p className="text-[#4954E0] opacity-70">
                            Sign in to continue your learning journey
                        </p>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4954E0] focus:border-transparent transition-all"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="block font-medium">
                                    Password
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm opacity-70 hover:opacity-100"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4954E0] focus:border-transparent transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 rounded border-gray-300 text-[#4954E0] focus:ring-[#4954E0]"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm">
                                Remember me for 30 days
                            </label>
                        </div>

                        <Link href="/main/home">
                            <button
                                type="button" // Changed from submit to button to prevent form submission when using Link
                                className="w-full bg-[#4954E0] text-white font-medium py-3 rounded-lg hover:bg-opacity-90 transition-all"
                            >
                                Sign in
                            </button>
                        </Link>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-[#4954E0] opacity-70">
                            Don&apos;t have an account?{" "}
                            <Link href="/auth/signup" className="font-medium opacity-100">
                                Sign up
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8">
                        <div className="relative flex items-center justify-center">
                            <div className="border-t border-gray-200 absolute w-full"></div>
                            <div className="bg-white px-4 z-10 text-sm text-[#4954E0] opacity-70">
                                or continue with
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button
                                type="button"
                                className="flex items-center justify-center py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                                onClick={() => signIn("google")}
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                    <path fill="none" d="M1 1h22v22H1z" />
                                </svg>
                                Google
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
                                    />
                                </svg>
                                Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="container mx-auto px-4 py-6 text-center text-sm opacity-70">
                <p>© 2025 Chalkpad. All rights reserved.</p>
            </footer>
        </div>
    );
}
