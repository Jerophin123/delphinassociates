"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, CheckCircle, AlertCircle } from "lucide-react";

type Message = {
  id: string;
  sender: "bot" | "user";
  text?: string;
  options?: { label: string; value: string }[];
  isHtml?: boolean;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const getAnswerFromKnowledgeBase = (question: string) => {
  const q = question.toLowerCase();
  
  if (q.includes("church") || q.includes("csi")) {
    return "We have extensive experience in designing and constructing church buildings across Tamil Nadu, including CSI Church Buildings (2020-2024). <a href='/projects' class='text-accent underline pt-1 block'>View Projects</a>";
  }
  if (q.includes("residential") || q.includes("flat") || q.includes("home") || q.includes("apartment") || q.includes("house")) {
    return "We build premium residential flats with modern amenities. Our featured projects include flats in T. Nagar, West Mambalam, and Kolathur.";
  }
  if (q.includes("industry") || q.includes("industrial") || q.includes("factory") || q.includes("commercial")) {
    return "We specialize in large-scale industrial and factory buildings, such as the Ford Alliance Group in MM Nagar. <a href='/projects' class='text-accent underline pt-1 block'>View Projects</a>";
  }
  if (q.includes("institution") || q.includes("school") || q.includes("college") || q.includes("education")) {
    return "We construct institutional buildings with a focus on quality and safety, catering to educational and public sector needs.";
  }
  if (q.includes("experience") || q.includes("year") || q.includes("since") || q.includes("history") || q.includes("established")) {
    return "Delphin Associates was established in 1999. We have over 25 years of experience in the civil construction industry with 100% quality assurance.";
  }
  if (q.includes("location") || q.includes("where") || q.includes("address") || q.includes("city") || q.includes("office") || q.includes("chennai")) {
    return "We are based in Chennai, Tamil Nadu, and handle projects practically across the entire state. <a href='/contact' class='text-accent underline pt-1 block'>Get Directions</a>";
  }
  if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("reach") || q.includes("call")) {
    return "You can reach us directly by selecting 'Contact Us' in the main menu, or visit our <a href='/contact' class='text-accent underline pt-1 block'>Contact Page</a> for our full contact info.";
  }
  if (q.includes("service") || q.includes("what do you do") || q.includes("offer")) {
    return "Our services include Residential Construction, Industrial & Commercial, Institutional Buildings, Church Buildings, and end-to-end Consultancy Services. <a href='/services' class='text-accent underline pt-1 block'>View Services</a>";
  }
  if (q.includes("project") || q.includes("portfolio") || q.includes("work")) {
    return "We have a rich portfolio of featured projects across various sectors. <a href='/projects' class='text-accent underline pt-1 block'>Explore all projects here</a>";
  }
  if (q.includes("consult") || q.includes("plan") || q.includes("design") || q.includes("architect")) {
    return "Yes! We offer end-to-end execution and excellent building consultancy services to help you seamlessly plan and design your dream project.";
  }
  if (q.includes("owner") || q.includes("founder") || q.includes("delphin") || q.includes("who")) {
    return "Delphin Associates is a leading civil construction company committed to building trust through quality. Our motto is: 'You Dream We Build'.";
  }
  
  return "I'm not exactly sure about that, but our team is ready to help! Feel free to ask another question, or select 'Back to Main Menu' to send us a direct message.";
};

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hi! Welcome to Delphin Associates. How can we help you today?",
      options: [
        { label: "1. Our Services", value: "services" },
        { label: "2. Our Projects", value: "projects" },
        { label: "3. About Us", value: "about" },
        { label: "4. Contact Us", value: "contact" },
        { label: "5. Other Inquiries", value: "other" },
        { label: "6. Ask a Question", value: "ask_anything" },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formStep, setFormStep] = useState<
    "none" | "name" | "email" | "phone" | "subject" | "message" | "submitting" | "done" | "ask_anything_mode"
  >("none");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    // Pop out notification after 2 seconds
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowNotification(true);
        setHasUnread(true);
      }
    }, 2000);

    // Auto-hide after 15 seconds
    const hideTimer = setTimeout(() => {
      setShowNotification(false);
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const addMessage = (msg: Omit<Message, "id">) => {
    setMessages((prev) => [...prev, { ...msg, id: Date.now().toString() }]);
  };

  const handleOptionClick = (value: string, label: string) => {
    // Remove options from the last message
    setMessages((prev) => {
      const newMessages = [...prev];
      const lastBotMsgIndex = newMessages.map((m) => m.sender).lastIndexOf("bot");
      if (lastBotMsgIndex !== -1) {
        newMessages[lastBotMsgIndex] = { ...newMessages[lastBotMsgIndex], options: undefined };
      }
      return newMessages;
    });

    addMessage({ sender: "user", text: label });

    setTimeout(() => {
      if (formStep === "subject") {
        setFormData((prev) => ({ ...prev, subject: label }));
        setFormStep("message");
        addMessage({
          sender: "bot",
          text: "Great! Finally, please tell us how we can help you (your message/inquiry):",
        });
        return;
      }

      if (value === "contact") {
        setFormStep("name");
        addMessage({
          sender: "bot",
          text: "Great! Let's get your details so we can assist you better. What is your Full Name?",
        });
      } else if (value === "services") {
        addMessage({
          sender: "bot",
          text: `Here is a quick overview of our core services:
<ul class='list-disc pl-5 mt-2 space-y-1 mb-3 text-gray-700'>
  <li><strong>Residential Construction:</strong> Premium flats, villas, and independent houses built to your exact needs.</li>
  <li><strong>Industrial & Commercial:</strong> Large-scale factories, office spaces, and commercial complexes (e.g., Ford Alliance).</li>
  <li><strong>Institutional Buildings:</strong> High-quality educational, healthcare, and public sector infrastructure.</li>
  <li><strong>Church Buildings:</strong> Specialized architectural design and execution for religious institutions.</li>
  <li><strong>Consultancy:</strong> Comprehensive, end-to-end building consultancy from soil testing to final handover.</li>
</ul>
<a href='/services' class='text-accent font-medium hover:text-accent-light flex items-center gap-1 transition-colors'>View all services in detail &rarr;</a>`,
          isHtml: true,
          options: [{ label: "Back to Main Menu", value: "menu" }],
        });
      } else if (value === "projects") {
        addMessage({
          sender: "bot",
          text: `We take immense pride in our diverse and successful portfolio. Here are some of our featured highlights:
<ul class='list-disc pl-5 mt-2 space-y-1 mb-3 text-gray-700'>
  <li><strong>CSI Church Buildings:</strong> State-of-the-art religious architecture across multiple locations in Tamil Nadu.</li>
  <li><strong>Premium Residential Flats:</strong> Modern living spaces delivered in prime areas like T. Nagar, Kolathur, and West Mambalam.</li>
  <li><strong>Industrial Facilities:</strong> Major factory complexes including the Ford Alliance Group at MM Nagar.</li>
</ul>
<a href='/projects' class='text-accent font-medium hover:text-accent-light flex items-center gap-1 transition-colors'>Explore our full portfolio &rarr;</a>`,
          isHtml: true,
          options: [{ label: "Back to Main Menu", value: "menu" }],
        });
      } else if (value === "about") {
        addMessage({
          sender: "bot",
          text: `<strong>Delphin Associates</strong> is a premier civil construction company headquartered in Chennai, Tamil Nadu.<br/><br/>
Established in <strong>1999</strong>, we bring over <strong>25 years of proven experience</strong> to every site, ensuring 100% quality assurance.<br/><br/>
Our core motto is simple: <em>"You Dream We Build."</em> We focus on building lifelong trust through unparalleled quality, whether constructing a single-family home or a massive industrial campus.<br/><br/>
<a href='/about' class='text-accent font-medium hover:text-accent-light flex items-center gap-1 transition-colors'>Read the full story &rarr;</a>`,
          isHtml: true,
          options: [{ label: "Back to Main Menu", value: "menu" }],
        });
      } else if (value === "other") {
        setFormStep("name");
        addMessage({
          sender: "bot",
          text: "No problem! Let us know how we can help. First, what is your Full Name?",
        });
      } else if (value === "ask_anything") {
        setFormStep("ask_anything_mode");
        addMessage({
          sender: "bot",
          text: "Sure! What would you like to know about Delphin Associates? You can simply type your question below:",
        });
      } else if (value === "menu") {
        setFormStep("none");
        addMessage({
          sender: "bot",
          text: "Here is the main menu. Please select an option:",
          options: [
            { label: "1. Our Services", value: "services" },
            { label: "2. Our Projects", value: "projects" },
            { label: "3. About Us", value: "about" },
            { label: "4. Contact Us", value: "contact" },
            { label: "5. Other Inquiries", value: "other" },
            { label: "6. Ask a Question", value: "ask_anything" },
          ],
        });
      }
    }, 600);
  };

  const attemptSubmitForm = async (finalData: FormData) => {
    setFormStep("submitting");
    addMessage({ sender: "bot", text: "Submitting your inquiry... Please wait." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to send message.");
      }

      setFormStep("done");
      addMessage({
        sender: "bot",
        text: "Thank you for your message! We will get back to you as soon as possible.",
        options: [{ label: "Back to Main Menu", value: "menu" }],
      });
      // Reset form data for future use
      setFormData({ name: "", email: "", phone: "", subject: "Chatbot Inquiry", message: "" });
    } catch (err: any) {
      console.error("Chatbot form error:", err);
      setFormStep("none");
      addMessage({
        sender: "bot",
        text: `Sorry, there was an error submitting your message: ${err.message || "Please try again later or use our contact page."}`,
        options: [{ label: "Back to Main Menu", value: "menu" }],
      });
    }
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    addMessage({ sender: "user", text: userText });
    setInputValue("");

    setTimeout(() => {
      if (formStep === "name") {
        setFormData((prev) => ({ ...prev, name: userText }));
        setFormStep("email");
        addMessage({ sender: "bot", text: `Thanks, ${userText}! What is your Email Address?` });
      } else if (formStep === "email") {
        // Simple email validation
        if (!/\S+@\S+\.\S+/.test(userText)) {
          addMessage({ sender: "bot", text: "Please enter a valid email address." });
          return;
        }
        setFormData((prev) => ({ ...prev, email: userText }));
        setFormStep("phone");
        addMessage({ sender: "bot", text: "Got it. What is your Phone Number?" });
      } else if (formStep === "phone") {
        setFormData((prev) => ({ ...prev, phone: userText }));
        setFormStep("subject");
        addMessage({
          sender: "bot",
          text: "What is the subject of your inquiry? Please select an option below:",
          options: [
            { label: "Residential Construction", value: "residential" },
            { label: "Industrial & Commercial", value: "industrial" },
            { label: "Institutional Buildings", value: "institutional" },
            { label: "Church Buildings", value: "church" },
            { label: "Consultancy Services", value: "consultancy" },
            { label: "Other Inquiry", value: "other" },
          ],
        });
      } else if (formStep === "subject") {
        // If user typed essentially instead of clicking option
        setFormData((prev) => ({ ...prev, subject: userText }));
        setFormStep("message");
        addMessage({
          sender: "bot",
          text: "Great! Finally, please tell us how we can help you (your message/inquiry):",
        });
      } else if (formStep === "message") {
        const finalData = { ...formData, message: userText };
        setFormData(finalData);
        attemptSubmitForm(finalData);
      } else if (formStep === "ask_anything_mode") {
        const answer = getAnswerFromKnowledgeBase(userText);
        addMessage({
          sender: "bot",
          text: answer,
          isHtml: true,
          options: [
            { label: "Back to Main Menu", value: "menu" }
          ]
        });
      } else {
        // Fallback for random talk
        addMessage({
          sender: "bot",
          text: "I am a simple virtual assistant. Please select an option from below to proceed:",
          options: [
            { label: "1. Our Services", value: "services" },
            { label: "2. Our Projects", value: "projects" },
            { label: "3. About Us", value: "about" },
            { label: "4. Contact Us", value: "contact" },
            { label: "5. Other Inquiries", value: "other" },
            { label: "6. Ask a Question", value: "ask_anything" },
          ],
        });
      }
    }, 600);
  };

  // Prevent input when submitting or when there are predefined options to choose from
  const lastBotMsg = [...messages].reverse().find(m => m.sender === 'bot');
  const isWaitingForOption = lastBotMsg?.options && lastBotMsg.options.length > 0 && formStep !== "ask_anything_mode";
  const inputDisabled = formStep === "submitting" || !!isWaitingForOption;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden"
            style={{ height: "500px", maxHeight: "calc(100vh - 120px)" }}
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bot className="w-6 h-6 text-accent" />
                <div>
                  <h3 className="font-semibold font-display">Chat with Us</h3>
                  <p className="text-xs text-gray-300">We respond instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        msg.sender === "user" ? "ml-2 bg-accent text-primary" : "mr-2 bg-primary text-white"
                      }`}
                    >
                      {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className="flex flex-col space-y-2">
                      {msg.text && (
                        <div
                          className={`px-4 py-2 rounded-2xl text-sm ${
                            msg.sender === "user"
                              ? "bg-accent text-primary rounded-tr-none"
                              : "bg-white text-gray-700 shadow-sm rounded-tl-none"
                          }`}
                        >
                          {msg.isHtml ? (
                            <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                          ) : (
                            msg.text
                          )}
                        </div>
                      )}
                      
                      {/* Options */}
                      {msg.options && (
                        <div className="flex flex-col space-y-2 mt-2">
                          {msg.options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handleOptionClick(opt.value, opt.label)}
                              className="text-left px-4 py-2 rounded-xl text-sm bg-white border border-accent/30 hover:bg-accent/10 text-primary transition-colors hover:border-accent"
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {formStep === "submitting" && (
                <div className="flex justify-start">
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl text-sm bg-white shadow-sm rounded-tl-none flex space-x-1 items-center">
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-white flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isWaitingForOption ? "Please select an option above..." : "Type your message..."}
                disabled={inputDisabled}
                className="flex-1 px-4 py-2 text-sm text-gray-900 bg-gray-50 placeholder:text-gray-400 rounded-full focus:outline-none focus:ring-1 focus:ring-accent disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={inputDisabled || !inputValue.trim()}
                className="w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center disabled:opacity-50 hover:bg-yellow-400 transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Bubbles */}
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, staggerChildren: 0.1 }}
            className="absolute bottom-16 right-0 flex flex-col items-end space-y-3 mb-0 z-40 w-max max-w-[90vw] sm:max-w-[450px]"
          >
            {/* Main Welcome Bubble */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl rounded-br-sm shadow-xl p-3 sm:p-4 border border-gray-100 cursor-pointer relative flex items-start space-x-3 max-w-sm"
              onClick={() => { setIsOpen(true); setShowNotification(false); setHasUnread(false); }}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex-1 pr-6">
                <div className="text-sm font-semibold text-gray-800 mb-0.5">Hello 👋 How can we help you today?</div>
                <div className="text-xs text-gray-500">Assistant • Just now</div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setShowNotification(false); }}
                className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* Quick Option Pills */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap justify-end gap-2 w-full"
            >
              <button
                onClick={() => { setIsOpen(true); setShowNotification(false); setHasUnread(false); handleOptionClick("services", "1. Our Services"); }}
                className="bg-white px-4 py-2.5 rounded-full shadow-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-accent border border-gray-100 transition-all cursor-pointer whitespace-nowrap"
              >
                View Our Services
              </button>
              <button
                onClick={() => { setIsOpen(true); setShowNotification(false); setHasUnread(false); handleOptionClick("projects", "2. Our Projects"); }}
                className="bg-white px-4 py-2.5 rounded-full shadow-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-accent border border-gray-100 transition-all cursor-pointer whitespace-nowrap"
              >
                Featured Projects
              </button>
              <button
                onClick={() => { setIsOpen(true); setShowNotification(false); setHasUnread(false); handleOptionClick("ask_anything", "6. Ask a Question"); }}
                className="bg-white px-4 py-2.5 rounded-full shadow-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-accent border border-gray-100 transition-all cursor-pointer whitespace-nowrap"
              >
                Ask a Question
              </button>
              <button
                onClick={() => { setIsOpen(true); setShowNotification(false); setHasUnread(false); handleOptionClick("contact", "4. Contact Us"); }}
                className="bg-white px-4 py-2.5 rounded-full shadow-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-accent border border-gray-100 transition-all cursor-pointer whitespace-nowrap"
              >
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { setIsOpen(!isOpen); setShowNotification(false); if (!isOpen) setHasUnread(false); }}
        className="w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg text-primary hover:bg-yellow-400 transition-colors relative z-50"
        aria-label="Toggle chatbot"
      >
        {/* Red Dot Unread Indicator */}
        <AnimatePresence>
          {hasUnread && !isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full z-10"
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
