"use client";

import { motion } from "framer-motion";

export default function MapSection() {
  const address =
    "No. 261A, 6th Main road, LIC nagar, Madipakkam, Chennai- 600 091.";

  // Use exact coordinates so the pin is centered precisely.
  const latitude = "12.951826";
  const longitude = "80.201932";

  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    `${latitude},${longitude}`
  )}&hl=en&z=15&output=embed`;
  const mapsAppUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    `${latitude},${longitude}`
  )}`;

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

      <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl overflow-hidden border border-accent/15 shadow-sm">
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

          {/* Overlay CTA so the map always fills the card area */}
          <a
            href={mapsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 z-10 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white/90 border border-accent/20 text-primary-dark font-bold text-[11px] sm:text-xs hover:bg-accent/15 hover:text-accent transition-colors shadow-sm"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </motion.section>
  );
}
