import { FC } from "react";
import Image from "next/image";

export default function Home() {
  // Save the logo to the public folder for use in the landing page
  // Create a file at public/logo.svg using the logo design provided

  return (
    <main className="min-h-screen bg-[#F1F1E8] text-[#4954E0] font-satoshi">
      {/* Navigation */}
      <nav className="container mx-auto py-8 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Chalkpad Logo"
            width={48}
            height={48}
            className="mr-3"
          />
          <span className="text-3xl font-bold">Chalkpad</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#" className="hover:opacity-75 transition-opacity">
            Home
          </a>
          <a href="#" className="hover:opacity-75 transition-opacity">
            Features
          </a>
          <a href="#" className="hover:opacity-75 transition-opacity">
            About
          </a>
          <a href="#" className="hover:opacity-75 transition-opacity">
            Contact
          </a>
        </div>
        <button className="bg-[#4954E0] text-[#F1F1E8] px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-all">
          Sign Up
        </button>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Modern solutions for your digital needs
          </h1>
          <p className="text-xl opacity-80 max-w-lg">
            Experience the seamless integration of design and functionality with
            our innovative platform.
          </p>
          <div className="flex space-x-4 pt-4">
            <button className="bg-[#4954E0] text-[#F1F1E8] px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
              Get Started
            </button>
            <button className="border-2 border-[#4954E0] px-8 py-3 rounded-full font-medium hover:bg-[#4954E0] hover:text-[#F1F1E8] transition-all">
              Learn More
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
          <div className="w-full max-w-md h-96 bg-[#4954E0] bg-opacity-10 rounded-2xl flex items-center justify-center">
            <p className="text-xl font-medium">Hero Image</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white bg-opacity-50 p-8 rounded-2xl hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-[#4954E0] bg-opacity-20 rounded-xl flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-[#4954E0] rounded-md"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Feature {item}</h3>
              <p className="opacity-70">
                A comprehensive solution that streamlines your workflow and
                enhances productivity across all your devices.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-[#4954E0] text-[#F1F1E8] rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="max-w-2xl mx-auto mb-8 opacity-90">
            Join thousands of satisfied users who have transformed their digital
            experience with our platform.
          </p>
          <button className="bg-[#F1F1E8] text-[#4954E0] px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-[#4954E0] border-opacity-20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Image
              src="/logo.svg"
              alt="Chalkpad Logo"
              width={36}
              height={36}
              className="mr-2"
            />
            <span className="text-2xl font-bold">Chalkpad</span>
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
