import { Button } from "@/components/ui/button"

export const CtaSection = () => {
  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="container max-w-[1200px] text-center">
        <h2 className="text-4xl font-bold text-[#1A1A1A] mb-6">
          Ready to streamline your workflow?
        </h2>
        <p className="text-[#666666] text-lg max-w-2xl mx-auto mb-10">
          Join thousands of teams already using TaskLite to boost their
          productivity
        </p>
        <Button
          variant="landing"
          className="bg-[#654CDC] h-[56px] hover:bg-[#654CDC]/90 text-[15px] font-medium px-8 py-6 rounded-xl"
        >
          Get Started Free
        </Button>
      </div>
    </section>
  )
}
