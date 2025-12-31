"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-30 bg-primary-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-3 sm:mb-4">
              <Image
                src="/logo.jpg"
                alt="Delphin Associates Logo"
                width={200}
                height={70}
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                unoptimized
              />
            </div>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-400">
              You Dream We Build. Building Trust Through Quality Since 1999. Leading civil
              construction company in Chennai, Tamil Nadu, specializing in
              residential, industrial, commercial, institutional, and church
              projects.
            </p>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-start sm:items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 mt-0.5 sm:mt-0"
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
                <span className="text-xs sm:text-sm break-words">Plot No 9, 8th Street, Kubera Nagar, Madipakkam, Chennai - 600 091</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
                <a
                  href="tel:+919841243345"
                  className="hover:text-white transition-colors text-xs sm:text-sm"
                >
                  +91 98412 43345
                </a>
                <span className="text-gray-500">|</span>
                <a
                  href="tel:+919940306399"
                  className="hover:text-white transition-colors text-xs sm:text-sm"
                >
                  +91 99403 06399
                </a>
              </div>
              <div className="flex items-start sm:items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 mt-0.5 sm:mt-0"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
                <a
                  href="mailto:delphinassociates@gmail.com"
                  className="hover:text-white transition-colors text-xs sm:text-sm break-all sm:break-normal"
                >
                  delphinassociates@gmail.com
                </a>
              </div>
              <div className="flex items-start sm:items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 mt-0.5 sm:mt-0"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
                <a
                  href="mailto:nanchilassociates@gmail.com"
                  className="hover:text-white transition-colors text-xs sm:text-sm break-all sm:break-normal"
                >
                  nanchilassociates@gmail.com
                </a>
              </div>
            </div>
            {/* Social Media Links */}
            <div className="mt-4 sm:mt-6">
              <h4 className="text-xs sm:text-sm font-semibold text-white mb-2 sm:mb-3">
                Follow Us
              </h4>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <motion.a
                  href="https://www.instagram.com/delphinassociatesofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
                <motion.a
                  href="https://x.com/delphin75358"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="X (formerly Twitter)"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaXTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/company/delphin-associates-official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors text-sm sm:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors text-sm sm:text-base"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors text-sm sm:text-base"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-white transition-colors text-sm sm:text-base"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="hover:text-white transition-colors text-sm sm:text-base"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors text-sm sm:text-base"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Banking Info */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Banking Details
            </h4>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div>
                <p className="font-medium text-white">State Bank of India</p>
                <p>A/C No. 10054049937</p>
                <p className="text-gray-400">Saidapet Branch</p>
              </div>
              <div>
                <p className="font-medium text-white">ICICI Bank</p>
                <p>A/C No. 410205000559</p>
                <p className="text-gray-400">Guindy Branch</p>
              </div>
              <div>
                <p className="font-medium text-white">ICICI Bank</p>
                <p>A/C No. 155405500318</p>
                <p className="text-gray-400">Adambakkam Branch</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400 px-2">
          <p>
            © {currentYear} Delphin Associates. All rights reserved. | You Dream We Build - Building
            Trust Through Quality Since 1999
          </p>
        </div>
      </div>
    </footer>
  );
}
