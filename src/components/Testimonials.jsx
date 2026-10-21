import Image from "next/image";
import Marquee from "react-fast-marquee";
import { displaySerif } from "@/lib/displayFont";

const TESTIMONIALS = [
  {
    quote:
      "Our linen sofa cover arrived in three days and softened with every wash. It made the whole room exhale.",
    name: "Priya Raman",
    meta: "Bengaluru · Verified buyer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&crop=faces&w=160&h=160&q=70",
  },
  {
    quote:
      "I ordered the stoneware set on a whim. Now every Sunday breakfast feels like a small occasion.",
    name: "Daniel Osei",
    meta: "Accra · Verified buyer",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=160&h=160&q=70",
  },
  {
    quote:
      "The oak reading lamp is the quietest, kindest light I have ever owned. Worth every penny.",
    name: "Sofia Marchetti",
    meta: "Milan · Verified buyer",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=160&h=160&q=70",
  },
  {
    quote:
      "Packaging was thoughtful, delivery was early, and the table is even warmer in person than on screen.",
    name: "James Whitfield",
    meta: "Bristol · Verified buyer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=160&h=160&q=70",
  },
  {
    quote:
      "Everything we have bought has aged beautifully. Nothing shouts; it just belongs.",
    name: "Elena Duarte",
    meta: "Lisbon · Verified buyer",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=160&h=160&q=70",
  },
  {
    quote:
      "Customer care sent a handwritten note with my order. That is why I came back for the shelf.",
    name: "Noah Lindqvist",
    meta: "Malmö · Verified buyer",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&crop=faces&w=160&h=160&q=70",
  },
];

function Stars() {
  return (
    <div className="flex container mx-auto  items-center gap-1 text-[#e0a92e]" aria-label="5 out of 5 stars">
      <span aria-hidden="true" className="text-sm tracking-[0.15em]">
        ★★★★★
      </span>
    </div>
  );
}

function TestimonialCard({ item }) {
  return (
    <figure className=" flex h-full w-[18rem] flex-col justify-between gap-6 border border-black/10 bg-white p-6 sm:w-[21rem] sm:p-7">
      <div>
        <Stars />
        <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-[#3b3a35]">
          “{item.quote}”
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-3 border-t border-black/10 pt-4">
        <Image
          src={item.avatar}
          alt=""
          width={160}
          height={160}
          className="h-11 w-11 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-[#1f1b16]">{item.name}</div>
          <div className="truncate text-xs text-black/50">{item.meta}</div>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      // className="border-t border-black/5 bg-[#f7f1e8] py-16 md:py-24"
       className="border-t border-black/5 bg-[#F1F5F9] py-16 md:py-24"
      style={{ fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif" }}
    >
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#c8912a] sm:text-xs">
              Stories from our customers
            </p>
            <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-[#1f2a28]">
              Loved in <em className={displaySerif.className}>quiet homes.</em>
            </h2>
          </div>

          <div className="flex items-center gap-3 text-sm text-black/60">
            <span className="text-[#e0a92e] tracking-[0.12em]" aria-hidden="true">
              ★★★★★
            </span>
            <span>
              <strong className="font-semibold text-[#1f2a28]">4.9</strong> average from
              1,240 reviews
            </span>
          </div>
        </div>
      </div>

      {/* Moving row of stories — decorative copy for screen readers lives below */}
      <div aria-hidden="true" className="mt-10 md:mt-14">
        <Marquee
          speed={45}
          pauseOnHover
          gradient
          gradientColor="#FFEECB"
          gradientWidth={96}
        >
          {TESTIMONIALS.map((item) => (
            <div key={item.name} className="mr-5">
              <TestimonialCard item={item} />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Same stories, readable without motion or JavaScript */}
      <ul className="sr-only">
        {TESTIMONIALS.map((item) => (
          <li key={item.name}>
            <blockquote>“{item.quote}”</blockquote>
            <p>
              {item.name}, {item.meta}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
