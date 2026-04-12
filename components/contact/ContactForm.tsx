"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useHPOE } from "../HPOE";
import SpotlightCard from "../ui/SpotlightCard";

export default function ContactForm() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === 'high' && !reducedMotion;
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      setError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to send message. Please try again.");
      }

      setIsSubmitted(true);
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 6000);
    } catch (err: any) {
      console.error("Error saving contact:", err);
      const errorMessage = err?.message || "Failed to submit form. Please try again or contact us directly.";
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="h-full"
    >
      <SpotlightCard
        className={`${tier === 'very-low' ? 'bg-white' : 'bg-white/95 liquid-glass-card'} rounded-[2.5rem] border border-gray-100 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2),0_16px_32px_-8px_rgba(0,0,0,0.12)] transition-all duration-500 p-5 sm:p-8 md:p-10 will-change-transform ${isHigh ? 'premium-border-glow hover:border-gray-200' : 'hover:-translate-y-2 hover:border-gray-200'}`}
      >
        <div className="mb-3 sm:mb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border border-accent/25 bg-accent/10 text-accent font-semibold text-[10px] sm:text-sm">
            Send Your Requirement
          </div>
          <h2 className="mt-3 sm:mt-4 text-lg sm:text-2xl font-bold text-primary font-display">
            Send Us a Message
          </h2>
          <p className="mt-2 text-[13px] sm:text-base text-gray-600 font-light">
            We typically respond within 24 hours.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3 sm:mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-2 text-red-700 overflow-hidden"
            >
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-xs sm:text-sm">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 sm:py-10 md:py-12"
            >
              <div className="relative inline-block mb-3 sm:mb-4">
                {isHigh && (
                  <div className="absolute inset-0 rounded-full bg-green-100 animate-[pulse-ring_3s_ease-in-out_infinite] pointer-events-none" />
                )}
                <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-green-500 relative z-10" />
              </div>
              <p className="text-base sm:text-lg font-semibold text-gray-700">
                Thank you for your message!
              </p>
              <p className="text-sm sm:text-base text-gray-600 font-light">
                We'll get back to you as soon as possible.
              </p>
            </motion.div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm border border-gray-200/80 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent/50 focus:border-accent hover:border-gray-300 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed font-light"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm border border-gray-200/80 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent/50 focus:border-accent hover:border-gray-300 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed font-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm border border-gray-200/80 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent/50 focus:border-accent hover:border-gray-300 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed font-light"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Subject *
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm border border-gray-200/80 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent/50 focus:border-accent hover:border-gray-300 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none font-light"
                      >
                        <option value="">Select a subject</option>
                        <option value="residential">Residential Construction</option>
                        <option value="industrial">Industrial & Commercial</option>
                        <option value="institutional">Institutional Buildings</option>
                        <option value="church">Church Buildings</option>
                        <option value="consultancy">Consultancy Services</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    autoComplete="off"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm border border-gray-200/80 bg-gray-50/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent/50 focus:border-accent hover:border-gray-300 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed resize-y font-light"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={isHigh ? { scale: 1.02 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`w-full mt-2 group inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-accent text-black text-sm sm:text-base font-bold shadow-[0_8px_30px_rgba(212,175,55,0.25)] hover:bg-[#b0912f] transition-all duration-300 disabled:bg-accent/40 disabled:hover:translate-y-0 disabled:shadow-none disabled:cursor-not-allowed ${isHigh ? 'liquid-glass-btn-accent-invert' : 'hover:-translate-y-0.5'}`}
                >
                  <span>{isSubmitting ? "Submitting..." : "Send Message"}</span>
                  {!isSubmitting && (
                    <motion.div
                      animate={isHigh ? { x: [0, 3, 0] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                    </motion.div>
                  )}
                </motion.button>
              </form>

              <p className="mt-4 text-[11px] sm:text-xs text-gray-500 font-light">
                By submitting, you agree that we may contact you regarding your inquiry.
              </p>
            </>
          )}
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
