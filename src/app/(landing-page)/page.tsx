import Link from "next/link"
import { ArrowRight, Share2, LayoutGrid, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main>
      <section className="">
        {/* HEADER */}
        <div className="flex items-center justify-between container pt-[20px]">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center font-bold">
              T
            </div>
            <span className="text-lg font-semibold text-[#000]">TaskLite</span>
          </div>

          <nav className="hidden space-x-[40px] text-[14px] font-medium text-black md:block">
            <Link href="#home">Home</Link>
            <Link href="#features">Features</Link>
            <Link href="#pricing">Blog</Link>
            <Link href="#about">Contact</Link>
          </nav>

          <Button
            variant="landing"
            className=" hover:bg-[#654cdc]/20 font-bold text-white rounded-[12px]"
          >
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* HERO SECTION */}
      <section className="mx-auto mt-[25px] w-full text-center bg-[#f2f2f2] rounded-t-[20px] pb-[100px]">
        <div className="w-full container pt-[70px]">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter text-[#060606] sm:text-5xl md:text-6xl lg:text-7xl">
            Effortless task <br /> management,{" "}
            <span className="text-[#f5a750]">anytime</span>
          </h1>

          <p className="mt-6 text-sm  text-center text-[#000]/60">
            Manage tasks projects easily with an all-in-one <br /> platform
            designed for seamless collaboration
          </p>

          <div className="mt-8 flex  justify-center gap-4">
            <Button size="landing" variant="landing">
              Get Started
            </Button>
            <Button
              size="landing"
              variant="landingSecondary"
              className="font-bold"
            >
              Contact Developer
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container py-24">
        <div className="text-center space-y-4 mb-16">
          <p className="text-[#E31B54] text-sm font-medium">Benefits</p>
          <h2 className="text-4xl font-bold text-[#1A1A1A]">
            The smart choice for your team
          </h2>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto">
            Everything you need to simplify your projects, boost productivity,
            and keep your team aligned
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Seamless Collaboration Card */}
          <div className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-[#F4F1FF] flex items-center justify-center mb-6">
              <Share2 className="w-5 h-5 text-[#654CDC]" />
            </div>
            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
              Seamless Collaboration
            </h3>
            <p className="text-[#666666] mb-6 text-sm">
              Empower your team to collaborate in real-time with easy task
              management and transparent project tracking
            </p>
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-[#1A1A1A] hover:text-[#654CDC]"
              tabIndex={0}
              aria-label="Learn more about seamless collaboration"
            >
              Learn More <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>

          {/* All-in-One Solution Card */}
          <div className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-[#FFF1F5] flex items-center justify-center mb-6">
              <LayoutGrid className="w-5 h-5 text-[#E31B54]" />
            </div>
            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
              All-in-One Solution
            </h3>
            <p className="text-[#666666] mb-6 text-sm">
              Manage everything from tasks to team communication in one
              intuitive platform designed to boost productivity
            </p>
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-[#1A1A1A] hover:text-[#654CDC]"
              tabIndex={0}
              aria-label="Learn more about all-in-one solution"
            >
              Learn More <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>

          {/* Customizable Workflow Card */}
          <div className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-[#FFF8F0] flex items-center justify-center mb-6">
              <Settings className="w-5 h-5 text-[#F5A750]" />
            </div>
            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
              Customizable Workflow
            </h3>
            <p className="text-[#666666] mb-6 text-sm">
              Manage everything from tasks to team communication in one
              intuitive platform designed to boost productivity
            </p>
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-[#1A1A1A] hover:text-[#654CDC]"
              tabIndex={0}
              aria-label="Learn more about customizable workflow"
            >
              Learn More <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
