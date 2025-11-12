"use client";

import { motion } from "framer-motion";

export default function MapSection() {
  // Exact coordinates: Latitude 12.958168, Longitude 80.203867
  const latitude = "12.958168";
  const longitude = "80.203867";
  
  // Google Maps embed URL with exact coordinates and a pin
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6886879544454!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU3JzI5LjQiTiA4MMKwMTInMTMuOSJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-8 sm:mt-10 md:mt-12"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary font-display">
        Find Us on Map
      </h2>
      <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md h-[300px] sm:h-[350px] md:h-[400px]">
        <iframe
          src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=15&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Delphin Associates Location"
        />
      </div>
      <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4 text-center px-2">
        Plot No 9, 8th Street, Kubera Nagar, Madipakkam, Chennai - 600 091
      </p>
      <p className="text-xs text-gray-500 mt-1.5 sm:mt-2 text-center">
        <a 
          href="https://maps.app.goo.gl/iEheQtz1UEhEdY5s8" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-dark underline"
        >
          View larger map
        </a>
      </p>
    </motion.section>
  );
}
