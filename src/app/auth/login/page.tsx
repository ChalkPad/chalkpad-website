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
          <span className="text-3xl font-bold">ChalkPad</span>
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

          <div className="mt-8">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 absolute w-full"></div>
              <div className="bg-white px-4 z-10 text-sm text-[#4954E0] opacity-70">
                or continue with
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-6">
              <button
                type="button"
                className="flex w-full items-center justify-center py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                  <path fill="none" d="M0 0h48v48H0z" />
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 text-center text-sm opacity-70">
        <p>© 2025 ChalkPad. All rights reserved.</p>
      </footer>
    </div>
  );
}
