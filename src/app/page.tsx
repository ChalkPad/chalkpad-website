import Image from "next/image";
import { GraduationCap, Presentation, FlipVertical } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F1F1E8] text-[#4954E0] font-satoshi">
      {/* Navigation */}
      <nav className="container mx-auto py-8 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/clear-logo.png"
            alt="Chalkpad Logo"
            width={75}
            height={75}
            className="mr-3"
          />
          <span className="text-3xl font-bold">ChalkPad</span>
        </div>

        <Link href="/main/home">
          <button className="bg-[#4954E0] text-[#F1F1E8] px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-all">
            Sign Up
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Every problem has a solution. <i>Find yours.</i>
          </h1>
          <p className="text-xl opacity-80 max-w-lg">
            Never get stuck again with our AI companion that observes your work
            and provides tailored guidance the moment you need it.
          </p>
          <div className="flex space-x-4 pt-4">
            <Link href="/auth/login">
              <button className="bg-[#4954E0] text-[#F1F1E8] px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
                Get Started
              </button>
            </Link>
            <button className="border-2 border-[#4954E0] px-8 py-3 rounded-full font-medium hover:bg-[#4954E0] hover:text-[#F1F1E8] transition-all">
              Learn More
            </button>
          </div>
        </div>

        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
          <div className="w-full max-w-2xl h-[26rem] bg-[#4954E0] bg-opacity-10 rounded-2xl flex items-center justify-center overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain rounded-2xl"
            >
              <source src="/videos/ChalkPadDemo.mov" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* AI Tutoring Feature */}
          <div className="bg-white bg-opacity-50 p-8 rounded-2xl hover:shadow-lg transition-all">
            <div className="mb-6">
              <GraduationCap size={48} className="text-[#4954E0]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">AI Tutor</h3>
            <p className="opacity-70">
              Get personalized help with any problem through our advanced AI
              tutor that provides step-by-step guidance and instant feedback on
              your work.
            </p>
          </div>

          {/* Interactive Whiteboard Feature */}
          <div className="bg-white bg-opacity-50 p-8 rounded-2xl hover:shadow-lg transition-all">
            <div className="mb-6">
              <Presentation size={48} className="text-[#4954E0]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Interactive Whiteboard</h3>
            <p className="opacity-70">
              Solve problems visually with our collaborative whiteboard that
              lets you draw, share, and receive feedback on your work in
              real-time.
            </p>
          </div>

          {/* Smart Flashcards Feature */}
          <div className="bg-white bg-opacity-50 p-8 rounded-2xl hover:shadow-lg transition-all">
            <div className="mb-6">
              <FlipVertical size={48} className="text-[#4954E0]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Smart Flashcards</h3>
            <p className="opacity-70">
              Create, customize, or auto-generate flashcards with our AI to
              enhance your learning experience and master new concepts
              efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Testemonicals Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="/AnantGump.png"
                  alt="Anant Raj"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Anant Raj</h4>
                  <p className="text-sm text-blue-600">
                    CEO/Founder of GumpinIt
                  </p>
                </div>
              </div>
              <p className="italic text-blue-800">
                Chalkpad transformed how our team collaborates. The intuitive
                interface and powerful features have increased our productivity
                by 30%.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="/tyler.webp"
                  alt="Mark Peterson"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Tyler Blevins</h4>
                  <p className="text-sm text-blue-600">
                    Product Manager at LowTaperFade
                  </p>
                </div>
              </div>
              <p className="italic text-blue-800">
                We have tried numerous solutions before finding Chalkpad.
                Nothing else comes close to its combination of flexibility and
                ease of use.
              </p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/testimonials"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Read More Testimonials →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-[#4954E0] border-opacity-20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Image
              src="/clear-logo.png"
              alt="Chalkpad Logo"
              width={36}
              height={36}
              className="mr-2"
            />
            <span className="text-2xl font-bold">ChalkPad</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:opacity-75 transition-opacity">
              Terms
            </a>
            <a href="#" className="hover:opacity-75 transition-opacity">
              Privacy
            </a>
            <a href="#" className="hover:opacity-75 transition-opacity">
              Contact
            </a>
          </div>
          <div className="mt-4 md:mt-0 text-sm opacity-70">
            © 2025 Chalkpad. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
