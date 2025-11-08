"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-md p-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-primary font-display">
        Get In Touch
      </h2>
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
            <p className="text-gray-700">
              Plot No 9, 8th Street, Kubera Nagar, Madipakkam, Chennai - 600 091
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Phone className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
            <a
              href="tel:+919841243345"
              className="text-gray-700 hover:text-accent transition-colors block"
            >
              +91 98412 43345
            </a>
            <a
              href="tel:+919940306399"
              className="text-gray-700 hover:text-accent transition-colors block"
            >
              +91 99403 06399
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Mail className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
            <a
              href="mailto:delphinassociates@gmail.com"
              className="text-gray-700 hover:text-accent transition-colors block"
            >
              delphinassociates@gmail.com
            </a>
            <a
              href="mailto:nanchilassociates@gmail.com"
              className="text-gray-700 hover:text-accent transition-colors block"
            >
              nanchilassociates@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
            <p className="text-gray-700">
              Monday - Saturday: 9:00 AM - 6:00 PM
            </p>
            <p className="text-gray-700">Sunday: Closed</p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Consultants</h3>
        <div className="space-y-2 text-gray-700">
          <p>Kannimar Consultants, Chennai</p>
          <p>DAR & Associates, Chennai</p>
        </div>
      </div>
    </motion.div>
  );
}
