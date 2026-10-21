import Image from "next/image";
import Link from "next/link";
import { displaySerif } from "@/lib/displayFont";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=80";

/* Teal wash on the left (text sits on it) melting into a warm beige on the right */
const heroWash =
  "linear-gradient(102deg, rgba(33,82,76,0.97) 0%, rgba(44,98,91,0.93) 24%, rgba(62,112,103,0.62) 42%, rgba(150,154,140,0.18) 60%, rgba(241,227,215,0.3) 82%, rgba(242,228,216,0.42) 100%)";

export default function Hero() {
  return (
    <section
      className=" container mx-auto rounded relative isolate flex min-h-[80vh] items-center overflow-hidden bg-[#215450]"
      style={{ fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif" }}
    >
      <Image
        src={HERO_IMAGE}
        alt="A calm, sunlit living room with a grey sofa, low wooden coffee table, rug and potted plants"
        fill
        sizes="100vw"
        preload
        className="object-cover object-center"
      />

      {/* colour wash: teal panel left, warm light right */}
      <div className="absolute inset-0" style={{ background: heroWash }} aria-hidden="true" />
      {/* extra scrim so mobile copy stays readable over a narrow slice of the photo */}
      <div className="absolute inset-0 bg-[#1e4a45]/70 md:hidden" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="max-w-[34rem] md:max-w-[44rem]">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#f0c75e] sm:text-xs">
            Considered objects for everyday life
          </p>

          <h1 className="mt-6 text-[clamp(2.75rem,8vw,7rem)] font-medium leading-[0.94] tracking-[-0.03em] text-white">
            Make room
            <br />
            for <em className={`${displaySerif.className} font-normal`}>feeling.</em>
          </h1>

          <p className="mt-7 max-w-[32rem] text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-white/85">
            Enduring furniture and objects, thoughtfully made to bring warmth,
            ease, and quiet beauty home.
          </p>

          <Link
            href="/products"
            className="group mt-10 inline-flex items-center gap-8 bg-[#f9eca9] px-7 py-4 text-sm font-semibold text-[#1f1b16] transition-colors duration-200 hover:bg-white sm:px-9 sm:text-base"
          >
            Explore the collection
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
