"use client";

import { motion } from "framer-motion";

export default function MapSection() {
  const address =
    "No. 261A, 6th Main road, LIC nagar, Madipakkam, Chennai- 600 091.";

  // By using the full address string with the business name instead of raw coordinates,
  // Google Maps will natively enforce a dropped red pin in the center of the embed.
  const mapQuery = `Delphin Associates, ${address}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  
  const mapsAppUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-8 sm:mt-10 md:mt-12"
    >
      <div className="flex items-start justify-between gap-4 mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary font-display tracking-[0.01em]">
            Find Us on Map
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            {address}
          </p>
        </div>
        <a
          href={mapsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-xl bg-primary/5 border border-accent/60 text-primary-dark font-bold text-xs sm:text-sm hover:bg-accent/15 hover:text-accent transition-colors shadow-sm"
        >
          Open in Google Maps
        </a>
      </div>

      <div className="bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.08)] transition-all duration-500">
        <div className="bg-gray-100 relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Delphin Associates Location Map"
            allowFullScreen
          />

        </div>
      </div>
    </motion.section>
  );
}
