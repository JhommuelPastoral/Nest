import Image from "next/image";
export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Jane Doe",
      role: "Writer",
      text: "This app has completely transformed the way I capture my thoughts. It&apos;s simple, private, and beautifully designed.",
      avatar: "https://i.pravatar.cc/100?img=32",
    },
    {
      name: "John Smith",
      role: "Student",
      text: "I love revisiting my daily entries. The interface is smooth and keeps me motivated to write regularly.",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    {
      name: "Emily Chen",
      role: "Entrepreneur",
      text: "A perfect space for reflection. It&apos;s intuitive and visually pleasing, making journaling a joy.",
      avatar: "https://i.pravatar.cc/100?img=44",
    },
  ];

  return (
    <section className="px-6 pb-20 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-black sm:text-4xl font-nunito">
          What our users say
        </h2>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
          Real feedback from people who&#39;ve transformed their journaling experience.
        </p>

        <div className="grid gap-8 mt-12 sm:grid-cols-2 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-6 text-center transition-all duration-300 bg-white shadow-lg rounded-2xl hover:translate-y-1"
              data-aos="fade-right"
            >
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={100}
                height={100}
                className="w-16 h-16 mb-4 rounded-full"
              />
              <p className="mb-4 text-gray-700">&quot;{testimonial.text}&quot;</p>
              <h4 className="font-semibold text-black">{testimonial.name}</h4>
              <span className="text-sm text-gray-500">{testimonial.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
