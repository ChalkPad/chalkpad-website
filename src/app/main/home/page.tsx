import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F1F1E8] text-[#4954E0] font-satoshi flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 hidden md:flex flex-col h-screen sticky top-0">
        <div className="flex items-center mb-10">
          <Link href="/" className="flex items-center">
            <Image
              src="/clear-logo.png"
              alt="Chalkpad Logo"
              width={65}
              height={65}
              className="mr-2"
            />
            <span className="text-2xl font-bold">ChalkPad</span>
          </Link>
        </div>

        <nav className="flex-1">
          <ul className="space-y-3">
            <li>
              <Link
                href="/tutor"
                className="flex items-center p-3 rounded-lg hover:bg-[#4954E0] hover:bg-opacity-10 transition-all"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
                AI Tutor
              </Link>
            </li>
            <li>
              <Link
                href="/flashcards"
                className="flex items-center p-3 rounded-lg hover:bg-[#4954E0] hover:bg-opacity-10 transition-all"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                </svg>
                Flashcards
              </Link>
            </li>
            <li>
              <Link
                href="/notes"
                className="flex items-center p-3 rounded-lg hover:bg-[#4954E0] hover:bg-opacity-10 transition-all"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path>
                </svg>
                Notes
              </Link>
            </li>
            <li>
              <Link
                href="/practice"
                className="flex items-center p-3 rounded-lg hover:bg-[#4954E0] hover:bg-opacity-10 transition-all"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Practice
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-200">
          <Link
            href="/profile"
            className="flex items-center p-3 rounded-lg hover:bg-[#4954E0] hover:bg-opacity-10 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-[#4954E0] text-white flex items-center justify-center mr-3">
              JS
            </div>
            <div>
              <p className="font-medium">John Smith</p>
              <p className="text-sm opacity-70">Student</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Chalkpad Logo"
              width={32}
              height={32}
              className="mr-2"
            />
            <span className="text-xl font-bold">Chalkpad</span>
          </div>
          <button className="p-2">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="opacity-70">Continue learning where you left off.</p>
        </div>

        {/* Activity Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">Study Time</h2>
              <svg
                className="w-8 h-8 text-[#4954E0] opacity-70"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <p className="text-3xl font-bold mb-1">12.5 hrs</p>
            <p className="text-sm opacity-70">This week</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">Problems Solved</h2>
              <svg
                className="w-8 h-8 text-[#4954E0] opacity-70"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <p className="text-3xl font-bold mb-1">47</p>
            <p className="text-sm opacity-70">This week</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">Flashcards</h2>
              <svg
                className="w-8 h-8 text-[#4954E0] opacity-70"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
              </svg>
            </div>
            <p className="text-3xl font-bold mb-1">124</p>
            <p className="text-sm opacity-70">Mastered</p>
          </div>
        </div>

        {/* Main Feature Cards */}
        <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* AI Tutor Card */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="h-40 bg-[#4954E0] flex items-center justify-center p-6">
              <div className="text-white text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-2 opacity-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
                <h3 className="text-xl font-bold">AI Tutor</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="mb-4">
                Get instant help with problems as you work through them. Your
                personal AI tutor is ready to assist.
              </p>
              <Link
                href="/main/create"
                className="inline-flex items-center py-2 px-4 bg-[#4954E0]/10 rounded-lg font-medium text-[#4954E0] hover:bg-[#4954E0]/20 transition-all group font-satoshi"
              >
                Start Tutoring Session
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>

          {/* Flashcards Card */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="h-40 bg-[#4954E0] bg-opacity-80 flex items-center justify-center p-6">
              <div className="text-white text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-2 opacity-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                </svg>
                <h3 className="text-xl font-bold">Flashcards</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="mb-4">
                Review and memorize concepts with intelligent flashcards that
                adapt to your learning progress.
              </p>

              <Link
                href="/main/create"
                className="inline-flex items-center py-2 px-4 bg-[#4954E0]/10 rounded-lg font-medium text-[#4954E0] hover:bg-[#4954E0]/20 transition-all group font-satoshi"
              >
                Create Flashcards
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y">
            <div className="flex items-start p-4 hover:bg-gray-50">
              <div className="bg-[#4954E0] bg-opacity-10 p-2 rounded-lg mr-4">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">AI Tutor Session: Calculus</p>
                <p className="text-sm opacity-70">
                  You solved 5 problems with help
                </p>
              </div>
              <p className="text-sm opacity-70">2 hours ago</p>
            </div>

            <div className="flex items-start p-4 hover:bg-gray-50">
              <div className="bg-[#4954E0] bg-opacity-10 p-2 rounded-lg mr-4">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">Flashcard Review: Physics</p>
                <p className="text-sm opacity-70">
                  12 cards reviewed, 10 mastered
                </p>
              </div>
              <p className="text-sm opacity-70">Yesterday</p>
            </div>

            <div className="flex items-start p-4 hover:bg-gray-50">
              <div className="bg-[#4954E0] bg-opacity-10 p-2 rounded-lg mr-4">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">New Notes Created</p>
                <p className="text-sm opacity-70">
                  Chemistry - Organic Compounds
                </p>
              </div>
              <p className="text-sm opacity-70">2 days ago</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
