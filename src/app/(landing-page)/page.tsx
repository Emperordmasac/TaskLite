import Link from "next/link"

import { Button } from "@/components/ui/button"

import { CtaSection } from "./_components/cta"
import { HeroSection } from "./_components/hero"
import { BenefitsSection } from "./_components/benefits"
import { FeaturesSection } from "./_components/features"

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="flex items-center justify-between container py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center font-bold">
              T
            </div>
            <span className="text-lg font-semibold text-[#000]">TaskLite</span>
          </div>

          <nav className="hidden space-x-8 text-[15px] font-medium text-[#666666] md:block">
            <Link href="#home" className="hover:text-black transition-colors">
              Home
            </Link>
            <Link
              href="#features"
              className="hover:text-black transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="hover:text-black transition-colors"
            >
              Pricing
            </Link>
            <Link href="#blog" className="hover:text-black transition-colors">
              Blog
            </Link>
            <Link href="#about" className="hover:text-black transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className="text-[15px] font-medium text-[#666666] hover:text-black transition-colors"
            >
              Login
            </Link>
            <Button
              variant="landing"
              className="bg-[#654CDC]  text-[15px] font-medium px-6 py-2.5 rounded-xl"
            >
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <HeroSection />

      <BenefitsSection />

      <FeaturesSection />

      {/* <TestimonialsSection /> */}

      {/* <StatsSection /> */}

      {/* <PricingSection /> */}

      <CtaSection />

      <footer className="py-12 md:py-20 bg-[#1C1C1C] text-white">
        <div className="container max-w-[1200px] px-4 md:px-6">
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">
              Ready to boost your productivity?
            </h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-[500px]">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 text-[15px] text-black bg-white rounded-xl sm:rounded-full outline-none placeholder:text-[#666666] focus:ring-2 focus:ring-[#654CDC]"
                />
              </div>
              <button className="px-6 py-3 bg-[#654CDC] hover:bg-[#654CDC]/90 text-white text-[15px] font-medium rounded-xl sm:rounded-full whitespace-nowrap transition-colors">
                Try it free
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-20 mb-12 md:mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-[#654CDC] text-white flex items-center justify-center font-bold">
                  T
                </div>
                <span className="text-lg font-semibold">TaskLite</span>
              </div>
              <p className="text-[15px] text-[#999999] mb-6 max-w-[300px]">
                Designed to help teams and individuals stay organized, focused,
                and on track.
              </p>
              {/* <div className="flex items-center gap-6">
                <Link
                  href="#"
                  className="text-white hover:text-[#654CDC] transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-[#654CDC] transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-[#654CDC] transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </Link>
              </div> */}
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 md:mb-6">Home</h4>
              <ul className="space-y-3 md:space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors block"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors block"
                  >
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors block"
                  >
                    Personal
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors block"
                  >
                    Business
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 md:mb-6">Features</h4>
              <ul className="space-y-3 md:space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors block"
                  >
                    Social Media
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors block"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors block"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors block"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 md:mb-6">
                Social Media
              </h4>
              <ul className="space-y-3 md:space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors block"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors block"
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
