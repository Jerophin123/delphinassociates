"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    let isMounted = true;
    let playPromise: Promise<void> | undefined;
    
    if (video) {
      // Force video to load
      video.load();
      
      // Handle video loaded
      const handleLoadedData = () => {
        if (isMounted) {
          setVideoLoaded(true);
          setVideoError(false);
        }
      };
      
      // Handle video error
      const handleError = () => {
        if (isMounted) {
          console.error('Video failed to load');
          setVideoError(true);
          setVideoLoaded(false);
        }
      };
      
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);
      
      // Try to play the video
      playPromise = video.play().catch((err) => {
        // Silently ignore AbortError (happens when component unmounts during play)
        // Only log other errors if component is still mounted
        if (isMounted && err.name !== 'AbortError' && err.name !== 'NotAllowedError') {
          console.error('Video autoplay failed:', err);
        }
      });
      
      return () => {
        isMounted = false;
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
        
        // Pause video if component unmounts
        try {
          if (video && !video.paused) {
            video.pause();
          }
        } catch (err) {
          // Ignore errors when pausing during unmount
        }
        
        // Handle play promise cancellation gracefully
        if (playPromise) {
          playPromise.catch(() => {
            // Silently ignore AbortError and other cancellation errors
          });
        }
      };
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-8 md:pb-0">
      {/* Video Background - covers full viewport including header area */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            minHeight: '100vh',
            minWidth: '100%',
          }}
        >
          {/* Updated to match actual filename */}
          <source src="/hero_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/55 via-primary-dark/45 to-primary-dark/55"></div>
        
        {/* Additional overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent opacity-40"></div>
      </div>

      {/* Static gradient fallback in case video doesn't load */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark z-0 transition-opacity duration-1000 ${
          videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
      </div>

      {/* Animated grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 z-[1]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse z-[1]"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl animate-pulse z-[1]" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full mt-16 sm:mt-8">
        <div className="max-w-4xl text-left">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block mb-4 sm:mb-6"
            >
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/20 text-accent rounded-full text-xs sm:text-sm font-semibold border border-accent/30 backdrop-blur-sm">
                Building Excellence Since 1999
              </span>
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 font-display leading-tight">
              <span className="block text-white">You Dream</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent mt-1 sm:mt-2">
                We Build
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 md:mb-10 font-light leading-relaxed max-w-3xl"
            >
              Leading civil construction company in Chennai, Tamil Nadu, delivering
              excellence in residential, industrial, commercial, institutional, and
              church projects.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-start items-stretch sm:items-center w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-accent text-white rounded-lg font-bold text-sm sm:text-base md:text-lg hover:bg-accent-light transition-all duration-300 shadow-2xl hover:shadow-accent/50 flex items-center justify-center space-x-2 sm:space-x-3 overflow-hidden w-full sm:w-auto"
              >
                <span className="relative z-10">Start Your Project</span>
                <ArrowRight
                  className="relative z-10 group-hover:translate-x-1 transition-transform w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link
                href="/projects"
                className="group px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-transparent text-white border-2 border-white/50 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-2 sm:space-x-3 w-full sm:w-auto"
              >
                <Play className="group-hover:scale-110 transition-transform w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span>View Portfolio</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, repeat: Infinity, repeatType: "reverse", duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
