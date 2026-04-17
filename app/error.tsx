"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[85vh] pt-32 pb-20 flex items-center justify-center px-4 bg-[#fdfbf4]">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Error Illustration Area */}
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#fdfbf4] rounded-full shadow-lg flex items-center justify-center mx-auto border-4 border-red-50">
            <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" />
          </div>
          <div className="text-[100px] sm:text-[140px] font-bold text-gray-200 leading-none select-none">
            500
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4 relative z-10 pt-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary font-display">
            Something went wrong!
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto text-base sm:text-lg">
            We apologize for the inconvenience. An unexpected error has occurred on our end. Our technical team has been notified.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 relative z-10">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-8 py-3.5 bg-accent text-black font-semibold rounded-xl hover:bg-accent-light transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#fdfbf4] text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-[#fdfbf4] transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        {/* Quick Links */}
        <div className="pt-12 border-t border-gray-200 mt-12 relative z-10">
          <Link href="/contact" className="text-accent font-medium text-sm hover:underline transition-all">
            Need immediate assistance? Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
