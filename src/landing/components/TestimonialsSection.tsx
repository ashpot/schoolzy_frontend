import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Tunde Ibrahim",
    role: "Principal, Abuja",
    quote:
      "The CBT module has completely replaced our manual exam process. Students take tests on their own devices and results are ready instantly. Parents love the transparency.",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 5,
  },
  {
    name: "Ngozi Kalu",
    role: "Parent, Port Harcourt",
    quote:
      "As a parent, I can check my child's attendance and results from my phone. I no longer have to wait for report cards. Schoolzy keeps me informed about everything.",
    avatar: "https://i.pravatar.cc/80?img=47",
    rating: 5,
  },
  {
    name: "Blessing Akpan",
    role: "Class Teacher, Enugu",
    quote:
      "I used to spend three days compiling term results. But now it takes under 30 minutes. The grading system is flexible and the broadsheet exports perfectly.",
    avatar: "https://i.pravatar.cc/80?img=32",
    rating: 5,
  },
  {
    name: "Biodun Oyelaran",
    role: "School Owner, Lagos",
    quote:
      "The payment module has reduced our defaulters drastically. I can see exactly who has paid, who hasn't and send reminders automatically.",
    avatar: "https://i.pravatar.cc/80?img=14",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "fill-warning text-warning" : "fill-border-line03 text-border-line03"}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getCardStyle = (index: number) => {
    const diff = index - active;
    const total = testimonials.length;
    let offset = diff;
    if (diff > total / 2) offset = diff - total;
    if (diff < -total / 2) offset = diff + total;

    return {
      x: offset * 320,
      scale: offset === 0 ? 1 : 0.92,
      opacity: Math.abs(offset) > 1 ? 0 : offset === 0 ? 1 : 0.5,
      zIndex: offset === 0 ? 10 : 5 - Math.abs(offset),
    };
  };

  return (
    <section className="w-full bg-bg-main py-16 md:py-20 lg:py-28 overflow-hidden" id="testimonials">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="inline-flex items-center rounded-full border border-border-line03 px-4 py-1.5 text-xs font-jakarta font-semibold tracking-wide text-text-muted01">
            TESTIMONIALS
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-jakarta font-semibold text-text-primary">
            What <span className="text-brand-primary">Schools</span> Are Saying
          </h2>

          <p className="mt-4 max-w-xl text-base font-jakarta text-text-secondary">
            From school owners to class teachers, here&apos;s how Schoolzy has
            changed the way they work.
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative h-85 flex items-center justify-center">
        <div ref={trackRef} className="relative w-full max-w-sm h-full">
          {testimonials.map((t, i) => {
            const style = getCardStyle(i);
            return (
              <motion.div
                key={t.name}
                animate={style}
                transition={{ duration: 0.5, ease: "easeOut" }}
                drag={style.zIndex === 10 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) {
                    setActive((prev) => (prev + 1) % testimonials.length);
                  } else if (info.offset.x > 80) {
                    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                  }
                }}
                className="absolute top-0 left-0 w-full h-full rounded-2xl border border-border-line04 bg-bg-main px-7 py-7 card-shadow cursor-grab active:cursor-grabbing"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-jakarta font-semibold text-text-primary">
                      {t.name}
                    </p>
                    <p className="text-sm font-jakarta text-text-muted">{t.role}</p>
                  </div>
                </div>

                <p className="mt-5 text-sm font-jakarta text-text-secondary leading-relaxed">
                  {t.quote}
                </p>

                <div className="mt-6">
                  <StarRating rating={t.rating} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-brand-primary" : "w-2 bg-border-line03"
            }`}
          />
        ))}
      </div>
    </section>
  );
}