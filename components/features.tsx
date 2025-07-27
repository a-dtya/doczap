// components/features.tsx

import { FileText, Users, ShieldCheck } from "lucide-react"

export default function Features() {
  return (
    <section id="features" className="w-full py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Built for small teams that move fast
        </h2>
        <p className="mt-4 text-sm md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A lightweight internal documentation tool to help your team stay aligned, ship faster, and grow without chaos.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <FileText className="w-8 h-8 text-gray-600 dark:text-gray-400 mb-4 mx-auto" />
            <h3 className="text-sm md:text-lg font-semibold text-gray-900 dark:text-white">SOP Management</h3>
            <p className="mt-2 text-sm md:text-lg text-gray-600 dark:text-gray-400">
              Create and maintain Standard Operating Procedures without friction. Keep everyone on the same page.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <Users className="w-8 h-8 text-gray-600 dark:text-gray-400 mb-4 mx-auto" />
            <h3 className="text-sm md:text-lg font-semibold text-gray-900 dark:text-white">Team Enablement</h3>
            <p className="mt-2 text-sm md:text-lg text-gray-600 dark:text-gray-400">
              Document onboarding guides, product specs, and meeting notes — everything in one place.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <ShieldCheck className="w-8 h-8 text-gray-600 dark:text-gray-400 mb-4 mx-auto" />
            <h3 className="text-sm md:text-lg font-semibold text-gray-900 dark:text-white">Smart Collaboration</h3>
            <p className="mt-2 text-sm md:text-lg text-gray-600 dark:text-gray-400">
              Simple role-based access to ensure your team can write, share, or read — without stepping on each other.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
