"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
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

    // Validate form data
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      setError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Send directly via our new API Route that acts as the backend using Nodemailer
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to send message. Please try again.");
      }

      // Show success message
      setIsSubmitted(true);
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Reset success message after 6 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 6000);
    } catch (err: any) {
      console.error("Error saving contact:", err);
      
      // Provide more specific error messages
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
      className="bg-white rounded-3xl shadow-[0_8px_16px_-4px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.08),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25),0_16px_32px_-8px_rgba(0,0,0,0.15),0_8px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-500 p-4 sm:p-6 md:p-8 hover:-translate-y-2 hover:scale-[1.01]"
    >
      <div className="mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-accent/25 bg-accent/10 text-accent font-semibold text-xs sm:text-sm">
          Send Your Requirement
        </div>
        <h2 className="mt-4 text-xl sm:text-2xl font-bold text-primary font-display">
          Send Us a Message
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          We typically respond within 24 hours.
        </p>
      </div>
      {error && (
        <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-2 text-red-700">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm">{error}</span>
        </div>
      )}
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 sm:py-10 md:py-12"
        >
          <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-green-500 mx-auto mb-3 sm:mb-4" />
          <p className="text-base sm:text-lg font-semibold text-gray-700">
            Thank you for your message!
          </p>
          <p className="text-sm sm:text-base text-gray-600">
            We'll get back to you as soon as possible.
          </p>
        </motion.div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
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
                disabled={isSubmitting}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
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
                disabled={isSubmitting}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
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
                disabled={isSubmitting}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select a subject</option>
                <option value="residential">Residential Construction</option>
                <option value="industrial">Industrial & Commercial</option>
                <option value="institutional">Institutional Buildings</option>
                <option value="church">Church Buildings</option>
                <option value="consultancy">Consultancy Services</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                autoComplete="off"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-5 sm:px-6 py-2.5 sm:py-3 bg-accent text-black rounded-xl font-semibold text-sm sm:text-base hover:bg-accent-light transition-colors flex items-center justify-center space-x-2 disabled:bg-accent/40 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? "Submitting..." : "Send Message"}</span>
              {!isSubmitting && (
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              )}
            </button>
          </form>

          <p className="mt-4 text-[11px] sm:text-xs text-gray-500">
            By submitting, you agree that we may contact you regarding your inquiry.
          </p>
        </>
      )}
    </motion.div>
  );
}
