import Image from 'next/image';
import Link from 'next/link';

export default function Banner() {
  return (
    <section className=" container rounded mx-auto my-6 flex flex-col md:flex-row  w-full bg-banner-bg font-sans">
      
      {/* Left Side: Image Container */}
      <div className="relative w-full md:w-1/2 h-[5vh] md:h-auto">
        {/* Replace src with your local jpg/png (e.g., '/images/interior.jpg') */}
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop"
          alt="Interior room view"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark shadow on the left edge to mimic the door frame */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-linear-to-r from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Right Side: Content Container */}
      <div className="w-full md:w-1/2 bg-[#FFEECB] flex flex-col justify-center px-8 py-16 md:px-16 lg:px-24 xl:px-32">
        
        {/* Intro Text */}
        <p className="text-text-main text-lg md:text-xl leading-relaxed mb-12 max-w-lg">
          We believe the things we live with should be beautiful, useful, and made with care. So we partner with independent makers who share our respect for materials and craft.
        </p>

        {/* Features List (Hardcoded divs, no JSON/Map) */}
        <div className="flex flex-col border-t border-gray-300/60 max-w-lg ">
          
          {/* Feature 01 */}
          <div className="flex gap-6 py-6 border-b border-gray-300/60">
            <div className="text-brand-red font-medium text-sm mt-1">
              01
            </div>
            <div>
              <div className="text-text-title text-lg font-medium mb-1">
                Responsible materials
              </div>
              <div className="text-text-desc text-sm md:text-base">
                Chosen for low impact and long life.
              </div>
            </div>
          </div>

          {/* Feature 02 */}
          <div className="flex gap-6 py-6 border-b border-gray-300/60">
            <div className="text-brand-red font-medium text-sm mt-1">
              02
            </div>
            <div>
              <div className="text-text-title text-lg font-medium mb-1">
                Made with intention
              </div>
              <div className="text-text-desc text-sm md:text-base">
                Small runs, considered details, no shortcuts.
              </div>
            </div>
          </div>

          {/* Feature 03 */}
          <div className="flex gap-6 py-6 border-b border-gray-300/60">
            <div className="text-brand-red font-medium text-sm mt-1">
              03
            </div>
            <div>
              <div className="text-text-title text-lg font-medium mb-1">
                Designed to endure
              </div>
              <div className="text-text-desc text-sm md:text-base">
                Timeless forms over passing trends.
              </div>
            </div>
          </div>

        </div>

        {/* Call to Action using DaisyUI classes */}
        <div className="mt-10 max-w-lg">
          <Link 
            href="/about" 
            className="link link-hover inline-flex items-center gap-3 text-text-title font-medium group"
          >
            Discover our story
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}