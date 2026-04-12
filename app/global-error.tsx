"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="min-h-[100dvh] pt-32 pb-20 flex items-center justify-center px-4 bg-gray-50 font-sans">
          <div className="max-w-2xl w-full text-center space-y-8">
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto border-4 border-red-50">
                <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" />
              </div>
              <div className="text-[80px] sm:text-[120px] font-bold text-gray-200 leading-none select-none">
                Error
              </div>
            </div>

            <div className="space-y-4 relative z-10 pt-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                Critical System Error
              </h1>
              <p className="text-gray-600 max-w-lg mx-auto text-base sm:text-lg">
                A critical error occurred while rendering the application layout.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 relative z-10">
              <button
                onClick={() => reset()}
                className="w-full sm:w-auto px-8 py-3.5 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Try Again</span>
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

