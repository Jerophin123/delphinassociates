"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, CheckCircle, AlertCircle } from "lucide-react";
import { chatbotKnowledge } from "@/data/chatbotKnowledge";

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
  if (!question) return "I didn't quite catch that. Could you please rephrase your question?";
  
  // Clean and split query
  const cleanedQuery = question.toLowerCase().replace(/[^\w\s]/g, " ");
  const allWords = cleanedQuery.split(/\s+/).filter(w => w.length > 1);
  
  const stopwords = ["the", "this", "that", "those", "these", "they", "them", "from", "with", "about", "could", "would", "should", "can", "you", "tell", "want", "know", "please", "more", "info", "information", "details", "help", "give", "show", "what", "where", "when", "who", "how", "is", "are", "was", "were", "be", "been", "being", "in", "on", "at", "to", "for", "of", "with", "by", "an", "as", "do", "does", "did", "any"];
  const filteredWords = allWords.filter(w => !stopwords.includes(w));

  // Prefer filtered terms for matching
  const searchTerms = filteredWords.length > 0 ? filteredWords : allWords;

  let bestMatch: { item: any; score: number } = { item: null, score: 0 };

  chatbotKnowledge.forEach(item => {
    let score = 0;
    
    // 1. Exact Phrase Bonus (Multi-word matches in keywords)
    const phrases = item.keywords.filter(k => k.includes(" "));
    phrases.forEach(phrase => {
      if (cleanedQuery.includes(phrase)) {
        score += 25; // Massive bonus for phrase match
      }
    });

    // 2. Individual Term Matching
    item.keywords.forEach(keyword => {
      searchTerms.forEach(term => {
        if (term === keyword) {
          score += 10; // Exact word match
        } else if (term.length > 3 && keyword.length > 3) {
          if (term.includes(keyword) || keyword.includes(term)) {
            score += 3; // Substring match
          }
        }
      });
    });

    // 3. Proximity / Density Bonus (Multiple matches in the same item)
    const matches = searchTerms.filter(term => 
      item.keywords.some(k => k === term || (term.length > 3 && k.includes(term)))
    );
    if (matches.length > 1) {
      score += matches.length * 6; // High bonus for word groups
    }

    if (score > bestMatch.score) {
      bestMatch = { item, score };
    }
  });

  if (bestMatch.score >= 5) { // Minimum threshold
    return bestMatch.item.answer;
  }
  
  return "I'm not exactly sure about that specific detail, but I'm learning every day! Feel free to rephrase or ask about our <strong>services</strong>, <strong>projects</strong>, or <strong>team members</strong>. You can also select 'Back to Main Menu' to contact us directly.";
};


export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isOpenRef = useRef(false);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [showNotification, setShowNotification] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
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
    if (messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      // Only auto-scroll when the user sends a message
      if (lastMessage.sender === "user") {
        scrollToBottom();
      }
    }
  }, [messages]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;
    let hasTriggered = false;

    const triggerNotification = (playSound = false) => {
      if (hasTriggered || isOpenRef.current) return;
      hasTriggered = true;
      
      setShowNotification(true);
      setHasUnread(true);
      
      if (playSound) {
        // Play notification sound now that we securely have a verified user interaction
        const audio = new Audio("/Notification.wav");
        audio.volume = 0.7; // slightly reduced volume
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Silently suppress the promise rejection to avoid console spam
          });
        }
      }

      // Auto-hide after 15 seconds
      hideTimer = setTimeout(() => {
        setShowNotification(false);
      }, 15000);
    };

    const handleInteraction = (e: Event) => {
      const target = e.target as HTMLElement;
      // Trigger if the clicked element or its parent is a button or a link
      const isButtonOrLink = target.closest('a') !== null || target.closest('button') !== null;
      
      if (isButtonOrLink) {
        // Clean up listeners
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
        
        // Timer for 10 to 15 seconds random delay
        const delay = Math.floor(Math.random() * (15000 - 10000 + 1)) + 10000;
        
        timer = setTimeout(() => triggerNotification(true), delay);
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  const addMessage = (msg: Omit<Message, "id">) => {
    setMessages((prev) => [...prev, { ...msg, id: Date.now().toString() }]);
    
    // Play message sound effect
    const soundFile = msg.sender === "user" ? "/send.mp3" : "/receive.mp3";
    const audio = new Audio(soundFile);
    audio.volume = 0.5;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Silently catch autoplay restrictions (though user has already interacted to send a message)
      });
    }
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

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
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
    }, 1000);
  };

  const attemptSubmitForm = async (finalData: FormData) => {
    setIsTyping(true);
    addMessage({ sender: "bot", text: "Submitting your inquiry... Please wait." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();
      setIsTyping(false);

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
      setIsTyping(false);
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
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
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
    }, 1200);
  };

  // Prevent input when submitting or when there are predefined options to choose from
  const lastBotMsg = [...messages].reverse().find(m => m.sender === 'bot');
  const isWaitingForOption = lastBotMsg?.options && lastBotMsg.options.length > 0 && formStep !== "ask_anything_mode";
  const inputDisabled = formStep === "submitting" || !!isWaitingForOption;

  return (
    <div className={`fixed z-50 flex flex-col justify-end items-end pointer-events-none transition-all duration-300 ${
      isOpen 
        ? "inset-0 sm:inset-auto sm:bottom-10 sm:right-10 sm:w-auto sm:h-auto" 
        : "bottom-0 right-0 sm:bottom-10 sm:right-10 w-full sm:w-auto h-full sm:h-auto"
    } overflow-hidden sm:overflow-visible sm:gap-5`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, scale: 0.7, y: 40, x: 10 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, scale: 0.7, y: 40, x: 10 }}
            transition={isMobile ? { type: "tween", duration: 0.25, ease: "easeOut" } : { type: "spring", damping: 25, stiffness: 350 }}
            style={isMobile ? {} : { transformOrigin: "bottom right" }}
            className={`bg-white sm:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-full sm:w-[400px] flex flex-col overflow-hidden pointer-events-auto h-full sm:h-[600px] sm:max-h-[calc(100vh-120px)] ${isMobile ? "will-change-transform" : ""}`}
          >
            {/* Modern Header - Optimized for Mobile */}
            <div className="bg-white p-5 sm:p-6 flex justify-between items-center relative overflow-hidden shrink-0">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent opacity-10 blur-[50px] rounded-full" />
              
              <div className="flex items-center space-x-3 sm:space-x-3.5 relative z-10">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-accent/10 backdrop-blur-md flex items-center justify-center border border-accent/20 shadow-inner">
                    <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-base sm:text-lg tracking-tight font-display">Delphin Associates</h3>
                  <div className="flex items-center space-x-1 sm:space-x-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium uppercase tracking-wider">Online Assistant</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative z-20 w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all border border-gray-200 active:scale-90"
                aria-label="Close chat"
              >
                <X className="w-6 h-6 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Revamped Chat Area */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-5 sm:py-6 space-y-5 sm:space-y-6 bg-[#fcfcfd] custom-scrollbar">
              {messages.map((msg, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex max-w-[92%] sm:max-w-[90%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"} space-x-0`}>
                    <div
                      className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mt-1 shadow-sm ${
                        msg.sender === "user" ? "ml-2 sm:ml-2.5 bg-accent text-primary" : "mr-2 sm:mr-2.5 bg-gray-100 text-primary border border-gray-200"
                      }`}
                    >
                      {msg.sender === "user" ? <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    </div>
                    <div className="flex flex-col space-y-2">
                      {msg.text && (
                        <div
                          className={`px-4 sm:px-5 py-3 sm:py-3.5 rounded-[1.2rem] sm:rounded-[1.5rem] text-[14px] sm:text-[14.5px] leading-relaxed shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] ${
                            msg.sender === "user"
                              ? "bg-accent text-primary rounded-tr-none font-medium"
                              : "bg-white text-gray-800 rounded-tl-none border border-gray-100/50"
                          }`}
                        >
                          {msg.isHtml ? (
                            <div className="prose-sm" dangerouslySetInnerHTML={{ __html: msg.text }} />
                          ) : (
                            msg.text
                          )}
                        </div>
                      )}
                      
                      {/* Premium Options Grid */}
                      {msg.options && (
                        <div className="flex flex-col space-y-2 mt-2 sm:mt-3">
                          {msg.options.map((opt, i) => (
                            <motion.button
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + (i * 0.05) }}
                              key={i}
                              onClick={() => handleOptionClick(opt.value, opt.label)}
                              className="group text-left px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-[13.5px] sm:text-sm font-semibold bg-white border border-gray-200 hover:border-accent hover:bg-accent/[0.03] text-primary transition-all shadow-sm hover:shadow-md active:scale-[0.98] flex items-center justify-between min-h-[48px]"
                            >
                              <span>{opt.label}</span>
                              <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-accent/20 transition-all">
                                <Send className="w-2.5 h-2.5 text-accent" />
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {(isTyping || formStep === "submitting") && (
                <div className="flex justify-start">
                  <div className="flex items-start">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 sm:mr-2.5 mt-1 border border-gray-200">
                      <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    </div>
                    <div className="px-4 py-3 sm:px-5 sm:py-4 rounded-[1.2rem] sm:rounded-[1.5rem] bg-white shadow-sm border border-gray-100 rounded-tl-none flex space-x-1.5 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.span 
                          key={i}
                          animate={{ 
                            y: [0, -5, 0],
                            opacity: [0.4, 1, 0.4] 
                          }} 
                          transition={{ 
                            repeat: Infinity, 
                            duration: 0.8, 
                            ease: "easeInOut",
                            delay: i * 0.15 
                          }} 
                          className="w-1.5 h-1.5 rounded-full bg-accent" 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Modern Detached Input Field - Optimized for Mobile */}
            <div className="px-4 sm:px-5 py-5 sm:py-6 bg-white border-t border-gray-50 relative z-20 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
              <form 
                onSubmit={handleSend} 
                className={`flex items-center space-x-2 p-1 pl-4 sm:pl-5 bg-[#f8f9fb] rounded-full border transition-all duration-300 ${
                  inputDisabled ? 'opacity-70 grayscale-[0.2]' : 'border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] focus-within:border-accent focus-within:shadow-[0_4px_20px_rgba(0,0,0,0.08)] focus-within:bg-white'
                }`}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isWaitingForOption ? "Pick an option..." : "Ask anything..."}
                  disabled={inputDisabled}
                  className="flex-1 bg-transparent py-2.5 sm:py-3 text-[14px] sm:text-[14.5px] text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed font-medium"
                />
                <button
                  type="submit"
                  disabled={inputDisabled || !inputValue.trim()}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-accent text-primary flex items-center justify-center shadow-lg hover:shadow-accent/30 hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-30 transition-all duration-300 group overflow-hidden relative"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5 sm:w-4.5 sm:h-4.5 sm:group-hover:translate-x-1 sm:group-hover:-translate-y-1 transition-transform duration-300 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optimized Notification Bubble for Mobile */}
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="absolute bottom-[88px] right-0 flex flex-col items-end space-y-3 mb-0 z-40 w-max pointer-events-auto pr-3 sm:pr-2"
          >
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-[1.5rem] rounded-br-lg shadow-[0_15px_40px_rgba(0,0,0,0.15)] p-4 border border-gray-100 cursor-pointer relative flex items-center space-x-3 sm:space-x-4 max-w-[280px] sm:max-w-sm group"
              onClick={() => { setIsOpen(true); setShowNotification(false); setHasUnread(false); }}
            >
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-md shadow-accent/20">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 pr-4 sm:pr-6">
                <div className="text-[14px] sm:text-[15px] font-bold text-gray-900 leading-tight">Need any help? 👋</div>
                <div className="text-[11px] font-medium text-gray-500 mt-0.5">We respond instantly</div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setShowNotification(false); }}
                className="absolute -top-1.5 -right-1.5 p-1.5 bg-white shadow-md text-gray-400 hover:text-gray-700 rounded-full border border-gray-100 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      {!isOpen && (
        <div className="pointer-events-auto h-16 w-16 relative mb-4 mr-4 sm:mb-0 sm:mr-0">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0, 0.2, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-accent rounded-full blur-md"
          />
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setIsOpen(!isOpen); setShowNotification(false); if (!isOpen) setHasUnread(false); }}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-accent rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(212,175,55,0.3)] text-primary hover:bg-accent/90 transition-all relative z-50 border border-white/20 active:shadow-none"
            aria-label="Toggle chatbot"
          >
            {/* Badge */}
            <AnimatePresence>
              {hasUnread && !isOpen && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full z-10"
              />
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key="chat"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
              >
                <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      )}
    </div>
  );
}
