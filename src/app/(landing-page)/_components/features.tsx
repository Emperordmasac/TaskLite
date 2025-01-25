import { CheckCircle2 } from "lucide-react"

import { ListTodo, Users2 } from "lucide-react"

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="container max-w-[1200px]">
        <div className="text-center space-y-4 mb-16">
          <p className="text-[#654CDC] text-4xl font-medium">Features</p>
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
  )
}
