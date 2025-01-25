export const TestimonialsSection = () => {
  return (
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
  )
}
