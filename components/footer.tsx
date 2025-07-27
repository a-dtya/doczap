// components/footer.tsx
import Logo from "@/components/ui/logo"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-8">
      <div className="container max-w-6xl mx-auto px-6 md:flex md:items-center md:justify-between space-y-6 md:space-y-0">
        {/* Left: Logo/Brand */}
        <div className="text-center md:text-left">

          <Logo className="h-12 w-auto"/>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            © {new Date().getFullYear()} DocZap. All rights reserved.
          </p>
        </div>

        {/* Right: Links */}
        <nav className="flex justify-center md:justify-end space-x-6">
          <Link href="#features" className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
            Features
          </Link>
          <Link href="#pricing" className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
            Pricing
          </Link>
          <Link href="/signup" className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
            Get Started
          </Link>
        </nav>
      </div>
    </footer>
  )
}
