import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Share2,
  LayoutGrid,
  Settings,
  CheckCircle2,
  ListTodo,
  Users2
} from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="flex items-center justify-between container py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center font-bold">
              T
            </div>
            <span className="text-lg font-semibold text-[#000]">
              TaskManager
            </span>
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
              href="/login"
              className="text-[15px] font-medium text-[#666666] hover:text-black transition-colors"
            >
              Login
            </Link>
            <Button
              variant="landing"
              className="bg-[#654CDC] hover:bg-[#654CDC]/90 text-[15px] font-medium px-6 py-2.5 rounded-xl"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-24">
        <div className="container text-center max-w-[1200px]">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1A1A] leading-[1.2]">
            Effortless task <br /> management,{" "}
            <span className="text-[#F5A750]">anytime</span>
          </h1>

          <p className="mt-6 text-[17px] text-[#666666] max-w-[600px] mx-auto">
            Manage tasks projects easily with an all-in-one platform designed
            for seamless collaboration
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Button
              size="lg"
              variant="landing"
              className="bg-[#654CDC] hover:bg-[#654CDC]/90 text-[15px] font-medium px-8 py-6 rounded-xl h-auto"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="landingSecondary"
              className="border-[#E5E5E5] hover:bg-gray-50 text-[15px] font-medium px-8 py-6 rounded-xl h-auto"
            >
              Contact Sales
            </Button>
          </div>

          <div className="mt-16 relative">
            <Image
              src="/hero-dashboard.png"
              alt="TaskManager Dashboard"
              width={1000}
              height={600}
              className="rounded-xl shadow-xl mx-auto"
              priority
            />
            <Image
              src="/hero-mobile.png"
              alt="TaskManager Mobile App"
              width={200}
              height={400}
              className="absolute -right-4 bottom-0 shadow-xl"
              priority
            />
          </div>

          <div className="mt-16 flex items-center justify-center gap-8">
            <Image
              src="/company-1.svg"
              alt="Company 1"
              width={120}
              height={40}
            />
            <Image
              src="/company-2.svg"
              alt="Company 2"
              width={120}
              height={40}
            />
            <Image
              src="/company-3.svg"
              alt="Company 3"
              width={120}
              height={40}
            />
            <Image
              src="/company-4.svg"
              alt="Company 4"
              width={120}
              height={40}
            />
            <Image
              src="/company-5.svg"
              alt="Company 5"
              width={120}
              height={40}
            />
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1200px]">
          <div className="text-center space-y-4 mb-16">
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
            <div className="p-6 rounded-2xl border border-[#E5E5E5] hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#F4F1FF] flex items-center justify-center mb-6">
                <Share2 className="w-6 h-6 text-[#654CDC]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                Seamless Collaboration
              </h3>
              <p className="text-[#666666] text-[15px] mb-6">
                Empower your team to collaborate in real-time with easy task
                management and transparent project tracking
              </p>
              <Link
                href="#learn-more"
                className="inline-flex items-center text-[15px] font-medium text-[#1A1A1A] hover:text-[#654CDC] transition-colors"
              >
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* All-in-One Solution Card */}
            <div className="p-6 rounded-2xl border border-[#E5E5E5] hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FFF1F5] flex items-center justify-center mb-6">
                <LayoutGrid className="w-6 h-6 text-[#E31B54]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                All-in-One Solution
              </h3>
              <p className="text-[#666666] text-[15px] mb-6">
                Manage everything from tasks to team communication in one
                intuitive platform designed for maximum efficiency
              </p>
              <Link
                href="#learn-more"
                className="inline-flex items-center text-[15px] font-medium text-[#1A1A1A] hover:text-[#654CDC] transition-colors"
              >
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Customizable Workflow Card */}
            <div className="p-6 rounded-2xl border border-[#E5E5E5] hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FFF8F0] flex items-center justify-center mb-6">
                <Settings className="w-6 h-6 text-[#F5A750]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                Customizable Workflow
              </h3>
              <p className="text-[#666666] text-[15px] mb-6">
                Adapt the platform to your team&apos;s unique needs with
                flexible workflows and customizable processes
              </p>
              <Link
                href="#learn-more"
                className="inline-flex items-center text-[15px] font-medium text-[#1A1A1A] hover:text-[#654CDC] transition-colors"
              >
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KEY FEATURES SECTION */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="container max-w-[1200px]">
          <div className="text-center space-y-4 mb-16">
            <p className="text-[#654CDC] text-[15px] font-medium">Features</p>
            <h2 className="text-4xl font-bold text-[#1A1A1A]">
              Key features to boost your productivity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* To-do List Feature */}
            <div className="bg-white p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#F4F1FF] flex items-center justify-center mb-6">
                <ListTodo className="w-6 h-6 text-[#654CDC]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                To-do List
              </h3>
              <p className="text-[#666666] text-[15px]">
                Organize and prioritize tasks with our intuitive to-do list
                feature
              </p>
            </div>

            {/* Team Member Tracking */}
            <div className="bg-white p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#FFF1F5] flex items-center justify-center mb-6">
                <Users2 className="w-6 h-6 text-[#E31B54]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                Team Member Tracking
              </h3>
              <p className="text-[#666666] text-[15px]">
                Monitor team progress and workload distribution in real-time
              </p>
            </div>

            {/* Project Tracking */}
            <div className="bg-white p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#FFF8F0] flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6 text-[#F5A750]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                Project Tracking
              </h3>
              <p className="text-[#666666] text-[15px]">
                Keep projects on track with comprehensive progress monitoring
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* POWERFUL FEATURES SECTION */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1200px]">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-[#1A1A1A]">
              Powerful Features to Elevate Your Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Feature Cards */}
            <div className="p-6 rounded-2xl bg-[#F4F1FF]/30 border border-[#E5E5E5]">
              <div className="w-12 h-12 rounded-xl bg-[#F4F1FF] flex items-center justify-center mb-6">
                <Share2 className="w-6 h-6 text-[#654CDC]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                Make Smart Decisions
              </h3>
              <p className="text-[#666666] text-[15px]">
                Get insights into your team&apos;s performance and make
                data-driven decisions
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFF1F5]/30 border border-[#E5E5E5]">
              <div className="w-12 h-12 rounded-xl bg-[#FFF1F5] flex items-center justify-center mb-6">
                <Users2 className="w-6 h-6 text-[#E31B54]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                Optimize Your Team
              </h3>
              <p className="text-[#666666] text-[15px]">
                Streamline workflows and improve team collaboration efficiency
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFF8F0]/30 border border-[#E5E5E5]">
              <div className="w-12 h-12 rounded-xl bg-[#FFF8F0] flex items-center justify-center mb-6">
                <ListTodo className="w-6 h-6 text-[#F5A750]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                Task management
              </h3>
              <p className="text-[#666666] text-[15px]">
                Organize and track tasks with our powerful management tools
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4F1FF]/30 border border-[#E5E5E5]">
              <div className="w-12 h-12 rounded-xl bg-[#F4F1FF] flex items-center justify-center mb-6">
                <Settings className="w-6 h-6 text-[#654CDC]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                Team Help
              </h3>
              <p className="text-[#666666] text-[15px]">
                Get the support you need with our dedicated team assistance
              </p>
            </div>
          </div>

          <div className="relative mt-24">
            <Image
              src="/dashboard-features.png"
              alt="TaskManager Features Dashboard"
              width={1000}
              height={600}
              className="rounded-xl shadow-xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="container max-w-[1200px]">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-[#1A1A1A]">
              What our users say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial Cards */}
            <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5]">
              <p className="text-[#666666] text-[15px] mb-6">
                &ldquo;This platform has completely transformed how our team
                collaborates. The intuitive interface makes task management a
                breeze.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F4F1FF]" />
                <div>
                  <p className="font-semibold text-[#1A1A1A]">Sarah Thompson</p>
                  <p className="text-[#666666] text-sm">
                    Product Manager at Spotify
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5]">
              <p className="text-[#666666] text-[15px] mb-6">
                &ldquo;The customizable workflows have helped us streamline our
                processes and boost productivity across all teams.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FFF1F5]" />
                <div>
                  <p className="font-semibold text-[#1A1A1A]">Alex Rivera</p>
                  <p className="text-[#666666] text-sm">Tech Lead at DropBox</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5]">
              <p className="text-[#666666] text-[15px] mb-6">
                &ldquo;The analytics and reporting features provide invaluable
                insights that help us make better decisions.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FFF8F0]" />
                <div>
                  <p className="font-semibold text-[#1A1A1A]">David Lee</p>
                  <p className="text-[#666666] text-sm">CEO at Microsoft</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 bg-[#654CDC]">
        <div className="container max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-4xl font-bold mb-2">15,000+</p>
              <p className="text-sm opacity-80">Active Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">1,300+</p>
              <p className="text-sm opacity-80">Team Members</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">100,000+</p>
              <p className="text-sm opacity-80">Tasks Completed</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">95%</p>
              <p className="text-sm opacity-80">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1200px]">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-[#1A1A1A]">
              Flexible plans for every team
            </h2>
            <p className="text-[#666666] text-lg max-w-2xl mx-auto">
              Choose the perfect plan that fits your team&apos;s needs and scale
              as you grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="p-6 rounded-2xl border border-[#E5E5E5]">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                  Starter Plan
                </h3>
                <p className="text-[#666666] text-[15px]">
                  Perfect for small teams and startups
                </p>
              </div>
              <div className="mb-6">
                <p className="text-4xl font-bold text-[#1A1A1A]">FREE</p>
                <p className="text-[#666666] text-sm">
                  No credit card required
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full border-[#E5E5E5] hover:bg-gray-50 text-[15px] font-medium py-6 rounded-xl h-auto"
              >
                Get Started Free
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="p-6 rounded-2xl border-2 border-[#654CDC] relative">
              <div className="absolute -top-3 left-6 bg-[#654CDC] text-white text-sm font-medium px-4 py-1 rounded-full">
                Most Popular
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                  Pro Plan
                </h3>
                <p className="text-[#666666] text-[15px]">
                  Best for growing teams
                </p>
              </div>
              <div className="mb-6">
                <p className="text-4xl font-bold text-[#1A1A1A]">$15</p>
                <p className="text-[#666666] text-sm">per user/month</p>
              </div>
              <Button className="w-full bg-[#654CDC] hover:bg-[#654CDC]/90 text-[15px] font-medium py-6 rounded-xl h-auto">
                Start Free Trial
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="p-6 rounded-2xl border border-[#E5E5E5]">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                  Enterprise Plan
                </h3>
                <p className="text-[#666666] text-[15px]">
                  For large organizations
                </p>
              </div>
              <div className="mb-6">
                <p className="text-4xl font-bold text-[#1A1A1A]">Custom</p>
                <p className="text-[#666666] text-sm">Contact us for pricing</p>
              </div>
              <Button
                variant="outline"
                className="w-full border-[#E5E5E5] hover:bg-gray-50 text-[15px] font-medium py-6 rounded-xl h-auto"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="container max-w-[1200px] text-center">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-6">
            Ready to streamline your workflow?
          </h2>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto mb-10">
            Join thousands of teams already using TaskManager to boost their
            productivity
          </p>
          <Button className="bg-[#654CDC] hover:bg-[#654CDC]/90 text-[15px] font-medium px-8 py-6 rounded-xl h-auto">
            Get Started Free
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-[#1C1C1C] text-white">
        <div className="container max-w-[1200px]">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Ready to boost
              <br />
              your productivity ?
            </h2>
            <div className="flex items-center gap-4 max-w-[400px] bg-white rounded-full p-1.5">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 text-[15px] text-black bg-transparent outline-none placeholder:text-[#666666]"
              />
              <button className="px-6 py-2 bg-black text-white text-[15px] font-medium rounded-full">
                Try it free
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-20 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
                  B
                </div>
                <span className="text-lg font-semibold">Bordup</span>
              </div>
              <p className="text-[15px] text-[#999999] mb-6">
                Designed to help teams and individuals stay organized, focused,
                and on track.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="text-white hover:text-[#999999] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-[#999999] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-[#999999] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Home</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors"
                  >
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors"
                  >
                    Personal
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors"
                  >
                    Business
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Features</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors"
                  >
                    Social Media
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Social Media</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[15px] text-[#999999] hover:text-white transition-colors"
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
