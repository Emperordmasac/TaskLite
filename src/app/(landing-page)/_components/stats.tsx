export const StatsSection = () => {
  return (
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
  )
}
