import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-30 bg-primary-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4 font-display">
              Delphin Associates
            </h3>
            <p className="mb-4 text-gray-400">
              You Dream We Build. Building Trust Through Quality Since 1999. Leading civil
              construction company in Chennai, Tamil Nadu, specializing in
              residential, industrial, commercial, institutional, and church
              projects.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin size={18} />
                <span>Chennai, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={18} />
                <a
                  href="tel:+919841243345"
                  className="hover:text-white transition-colors"
                >
                  +91 98412 43345
                </a>
                <span>|</span>
                <a
                  href="tel:+919940306399"
                  className="hover:text-white transition-colors"
                >
                  +91 99403 06399
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={18} />
                <a
                  href="mailto:delphinassociates@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  delphinassociates@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={18} />
                <a
                  href="mailto:nanchilassociates@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  nanchilassociates@gmail.com
                </a>
              </div>
            </div>
            {/* Social Media Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">
                Follow Us
              </h4>
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.instagram.com/delphinassociatesofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://x.com/delphin75358"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="X (formerly Twitter)"
                >
                  <FaXTwitter size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/company/delphin-associates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="hover:text-white transition-colors"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Banking Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Banking Details
            </h4>
            <div className="space-y-3 text-sm">
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

        <div className="border-t border-primary mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            © {currentYear} Delphin Associates. All rights reserved. | You Dream We Build - Building
            Trust Through Quality Since 1999
          </p>
        </div>
      </div>
    </footer>
  );
}
