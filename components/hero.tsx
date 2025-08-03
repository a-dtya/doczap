// components/hero.tsx

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {Button} from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="w-full bg-white dark:bg-gray-950 py-20 md:py-28">
      <div className="container max-w-6xl px-6 mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          <span className="bg-black text-white px-2">Documentation</span> that just works.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          DocZap is the fast, collaborative documentation platform built for small teams. Focus on shipping, not structuring.
        </p>
        <div className="mt-8 flex justify-center items-center gap-4">
          <Link href="/signup">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/demo" className="text-gray-600 dark:text-gray-300 text-lg hover:text-gray-800 dark:hover:text-gray-200">
            View Demo
          </Link>
        </div>
        <div className="mt-12">
          <Image
            src="https://ik.imagekit.io/uwttbk1d1/demo-image.png?updatedAt=1754220746987" // Replace with your actual screenshot
            alt="DocZap Screenshot"
            width={1200}
            height={700}
            className="mx-auto rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800"
          />
        </div>
      </div>
    </section>
  )
}
