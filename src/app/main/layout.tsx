/* eslint-disable @typescript-eslint/no-unused-vars */
/* filepath: /Users/rishisuryavanshi/Desktop/chalkpad-website/src/app/layout.tsx */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// Initialize the Geist fonts
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// Define CSS variables for custom Satoshi fonts
const satoshiVariables = `
  :root {
    --font-satoshi: 'Satoshi', sans-serif;
  }
`;

export const metadata: Metadata = {
  title: "ChalkPad",
  description: "A collaborative tutoring platform with AI assistance.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Define your navigation items
  const menuItems = [
    { label: "Home", link: "/main/home" },
    { label: "About", link: "/about" },
    { label: "Features", link: "/features" },
    { label: "Contact", link: "/contact" },
  ];

  // Define your profile items (using the TypeScript structure we created)
  const profileItems = {
    type: "custom" as const, // or "avatar" if you want to use the avatar dropdown
    component: (
      <button className="px-4 py-2 bg-primary text-white rounded">
        Sign In
      </button>
    ),
  };

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: satoshiVariables }} />
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <BaseNavbar
          logoLink="/"
          menuItems={menuItems}
          profileItems={profileItems}
        /> */}
        <main>{children}</main>
      </div>
    </div>
  );
}
