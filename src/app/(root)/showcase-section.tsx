"use client";

export default function ShowcaseSection() {
  return (
    <section className="relative px-6 pb-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-black sm:text-5xl font-nunito">
          Your thoughts, beautifully organized
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-600 sm:text-lg">
          {`A safe space to capture and revisit your story, designed with privacy and mindfulness at its core.`}
        </p>

        {/* App Mockup */}
        <div className="relative flex justify-center mt-5">
          {/* Phone Frame */}
          <div className="relative inline-block p-4 bg-white shadow-xl rounded-3xl">
            <div
              className="overflow-hidden bg-gray-100 shadow-md rounded-2xl"
              style={{ width: "320px", height: "640px" }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 text-white bg-blue-600">
                  <h3 className="font-semibold">{`Today's Entry`}</h3>
                  <div className="w-8 h-8 rounded-full bg-blue-300/50" />
                </div>

                {/* Content */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {["March 15, 2025", "March 14, 2025", "March 13, 2025"].map((date, idx) => (
                    <div key={idx} className="text-left">
                      <div className="mb-2 text-sm text-gray-500">{date}</div>
                      <div className="p-4 mb-4 rounded-lg bg-gray-200/50">
                        <div className="h-3 mb-2 bg-gray-300 rounded" />
                        <div className="w-3/4 h-3 mb-2 bg-gray-300 rounded" />
                        <div className="w-1/2 h-3 bg-gray-300 rounded" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Action */}
                <div className="p-4 border-t border-gray-300">
                  <div className="p-3 text-sm font-medium text-center text-blue-600 bg-blue-100 rounded-lg cursor-pointer">
                    {`+ New Entry`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 font-semibold font-nunito">
          {`A safe space to capture and revisit your story, designed with privacy and mindfulness at its core.`}
        </p>
      </div>
    </section>
  );
}
