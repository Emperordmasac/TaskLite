import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LayoutGrid, Settings, Share2 } from "lucide-react"

export const BenefitsSection = () => {
  return (
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
              Adapt the platform to your team&apos;s unique needs with flexible
              workflows and customizable processes
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
  )
}
