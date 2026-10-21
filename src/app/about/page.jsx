// import React from 'react';

// const AboutPage = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default AboutPage;
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <section className="py-16 lg:py-24 container mx-auto bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col space-y-6">
            <span className="text-gray-500 font-medium text-sm tracking-wide">
              Best Choice
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 uppercase leading-tight">
              Shop Online Any Time
            </h2>
            
            <p className="text-gray-600 text-base leading-relaxed">
              Using our own fleet of vehicles and dedicated nationwide distribution teams, our 
              highly-experienced installation team will have your furniture in place with 
              minimal disruption and the utmost care. Our teams are skilled and experienced 
              in installing across a wide range of properties. So choose only <strong className="font-semibold text-gray-900">Style Furniture UK</strong> to buy cheap beds for sale in UK.
            </p>
            
            <div className="pt-2">
              {/* DaisyUI Button */}
              <Link href={'/products'} className="btn bg-[#087C7E] hover:bg-[#65717c] w-50 text-white border-none rounded-md px-6 normal-case font-medium flex items-center gap-2">
                {/* Shopping Cart Icon */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
                Shop Now
              </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative w-full h-[400px] lg:h-[550px] rounded-sm overflow-hidden">
            <Image
              // Using a placeholder image that closely resembles the bedroom scene from the screenshot
              src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2000&auto=format&fit=crop" 
              alt="Luxury Bedroom with Pink Bed"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutPage;