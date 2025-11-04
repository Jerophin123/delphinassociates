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

  // Google Apps Script web app URL (linked to Google Sheets)
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwHgHV_5X71EqEzmH5rnLn5FODjkdMkzPufGA4Sdln4IM99B6Gjmp6OHjUh1dcwH0dV/exec";

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
      // Prepare JSON data matching the Google Apps Script expected format
      // The script expects: fullName, email, phone, subject, message
      const payload = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      };

      // Submit to Google Apps Script web app
      // The script expects JSON data in e.postData.contents
      // Note: With no-cors mode, we can't set custom headers, but the JSON body will still be sent
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Google Apps Script web apps typically require no-cors
        body: JSON.stringify(payload),
      });

      // Note: With no-cors mode, we can't read the response status,
      // but the submission still works and data is written to Google Sheets
      // The script returns {result:"success"} or {result:"error", message: err} which we can't access in no-cors mode
      
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
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit form. Please try again or contact us directly.");
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
      className="bg-white rounded-lg shadow-md p-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-primary font-display">
        Send Us a Message
      </h2>
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
          <AlertCircle size={20} />
          <span className="text-sm">{error}</span>
        </div>
      )}
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">
            Thank you for your message!
          </p>
          <p className="text-gray-600">
            We'll get back to you as soon as possible.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-2"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
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
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-light transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <span>{isSubmitting ? "Submitting..." : "Send Message"}</span>
            {!isSubmitting && <Send size={20} />}
          </button>
        </form>
      )}
    </motion.div>
  );
}
