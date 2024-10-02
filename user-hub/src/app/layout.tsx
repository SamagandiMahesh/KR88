import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import logo from "./logo.png";
import StoreProvider from "./StoreProvider";

// Font configurations
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata for the application
export const metadata: Metadata = {
  title: "User Hub",
  description: "React application that lists and searches users",
};

// Header component for better separation of concerns
const Header = () => (
  <header className="border-b border-gray-100 py-6">
    <nav
      className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      aria-label="Global"
    >
      <div className="flex flex-1">
        <a href="/" className="flex items-center space-x-2">
          <Image
            className="h-10 w-10"
            src={logo}
            alt="User Hub Logo"
            width={40}
            height={40}
          />
          <span className="sr-only">User Hub</span>
        </a>
      </div>
    </nav>
  </header>
);

// Footer component for better separation of concerns
const Footer = () => (
  <footer className="border-t border-gray-100 py-6">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="text-center text-sm text-slate-600">
        React application that lists and searches users
      </p>
    </div>
  </footer>
);

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
          <Header />
          <main className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-20 w-full">
            {children}
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
