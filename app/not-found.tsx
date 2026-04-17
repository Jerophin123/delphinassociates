import Link from 'next/link';
import { Home, Phone } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found - 404',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-[#fdfbf4] pt-24 lg:pt-32 pb-12 lg:pb-16">
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Illustration Area */}
          <div className="order-1 lg:order-none flex flex-col justify-center items-center lg:items-end lg:pr-12 border-b lg:border-b-0 lg:border-r border-gray-200 pb-8 lg:pb-0">
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-[#fdfbf4] rounded-full shadow-lg flex items-center justify-center mx-auto border-[4px] border-gray-50">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-accent">!</span>
              </div>
              <div className="text-[120px] sm:text-[140px] lg:text-[160px] xl:text-[200px] font-black text-gray-200 leading-none select-none tracking-tighter">
                404
              </div>
            </div>
          </div>

          {/* Right Side: Content Area */}
          <div className="order-2 lg:order-none text-center lg:text-left space-y-6 lg:pl-6">
            
            {/* Text Content */}
            <div className="space-y-4 relative z-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary font-display leading-tight tracking-tight">
                Page Not Found
              </h1>
              <p className="text-gray-600 max-w-lg mx-auto lg:mx-0 text-base sm:text-lg xl:text-xl leading-relaxed">
                Oops! The page you're looking for seems to have gone missing or has been moved to a new address.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 relative z-10">
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 xl:px-10 xl:py-4 bg-accent text-black font-bold text-base xl:text-lg rounded-xl hover:bg-accent-light transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <Home className="w-5 h-5 xl:w-6 xl:h-6" />
                <span>Back to Home</span>
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 xl:px-10 xl:py-4 bg-[#fdfbf4] text-gray-700 font-bold text-base xl:text-lg rounded-xl border-2 border-gray-200 hover:bg-[#fdfbf4] transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                <Phone className="w-5 h-5 xl:w-6 xl:h-6" />
                <span>Contact Us</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Quick Links */}
        <div className="pt-10 mt-10 lg:pt-14 lg:mt-14 border-t border-gray-200 relative z-10 text-center">
          <p className="text-xs xl:text-sm font-bold text-gray-400 mb-6 uppercase tracking-[0.2em]">
            Helpful Links
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            <Link href="/services" className="text-primary hover:text-accent font-semibold text-sm xl:text-base transition-colors">
              Our Services
            </Link>
            <Link href="/projects" className="text-primary hover:text-accent font-semibold text-sm xl:text-base transition-colors">
              Projects
            </Link>
            <Link href="/about" className="text-primary hover:text-accent font-semibold text-sm xl:text-base transition-colors">
              About Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
