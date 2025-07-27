"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import clsx from "clsx"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={clsx(
        "fixed top-0 z-50 w-full transition-all duration-300 border-b bg-white dark:bg-gray-950",
        scrolled ? "border-gray-200 dark:border-gray-800 py-2" : "border-transparent py-4"
      )}
    >
      <div
        className={clsx(
          "w-full px-4 transition-all duration-300 flex items-center justify-between",
          scrolled ? "max-w-3xl" : "max-w-6xl",
          "mx-auto"
        )}
      >
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold text-black dark:text-white">
          DocZap
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            Pricing
          </Link>
          <Link href="#docs" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            Docs
          </Link>
        </nav>

        {/* CTA Button (Desktop) */}
        <div className="hidden md:block">
          <Link href="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle Menu">
                <Menu className="h-6 w-6 text-gray-800 dark:text-gray-200" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white dark:bg-gray-950 text-black dark:text-white">
              <div className="mt-10 space-y-6">
                <Link href="#features" className="block pl-2 text-lg text-gray-600 dark:text-gray-300 font-medium hover:text-black dark:hover:text-white transition">
                  Features
                </Link>
                <Link href="#pricing" className="block pl-2 text-lg text-gray-600 dark:text-gray-300 font-medium hover:text-black dark:hover:text-white transition">
                  Pricing
                </Link>
                <Link href="#docs" className="block pl-2 text-lg text-gray-600 dark:text-gray-300 font-medium hover:text-black dark:hover:text-white transition">
                  Docs
                </Link>
                <Link href="/signup" className="block px-2 text-lg text-gray-600 dark:text-gray-300 font-medium hover:text-black dark:hover:text-white transition">
                  <Button className="mt-6 w-full">Get Started</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
