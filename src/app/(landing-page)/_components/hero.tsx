import { Button } from "@/components/ui/button"
import Link from "next/link"

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-24">
      <div className="container text-center max-w-[1200px]">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1A1A] leading-[1.2]">
          Effortless task <br /> management,{" "}
          <span className="text-[#F5A750]">anytime</span>
        </h1>

        <p className="mt-6 text-[17px] text-[#666666] max-w-[600px] mx-auto">
          Manage tasks projects easily with an all-in-one platform designed for
          seamless collaboration
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Button
            size="lg"
            variant="landing"
            className="bg-[#654CDC] hover:bg-[#654CDC]/90 text-[15px] font-medium px-8 py-6 rounded-xl h-[56px]"
          >
            <Link href="/sign-up">Get Started</Link>
          </Button>
          {/* <Button
            size="lg"
            variant="landingSecondary"
            className="border-[#E5E5E5] hover:bg-gray-50 text-[15px] font-medium px-8 py-6 rounded-xl h-[56px]"
          >
            Contact Sales
          </Button> */}
        </div>

        {/* <div className="mt-16 relative">
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
        </div> */}

        {/* <div className="mt-16 flex items-center justify-center gap-8">
          <Image src="/company-1.svg" alt="Company 1" width={120} height={40} />
          <Image src="/company-2.svg" alt="Company 2" width={120} height={40} />
          <Image src="/company-3.svg" alt="Company 3" width={120} height={40} />
          <Image src="/company-4.svg" alt="Company 4" width={120} height={40} />
          <Image src="/company-5.svg" alt="Company 5" width={120} height={40} />
        </div> */}
      </div>
    </section>
  )
}
