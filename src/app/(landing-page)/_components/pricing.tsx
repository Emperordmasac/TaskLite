import { Button } from "@/components/ui/button"

export const PricingSection = () => {
  return (
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
              <p className="text-[#666666] text-sm">No credit card required</p>
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
  )
}
