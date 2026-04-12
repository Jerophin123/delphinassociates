const fs = require("fs");
let content = fs.readFileSync("d:\\DelphinAssociates\\components\\FloatingChatbot.tsx", "utf8");

content = content.replace(/\$\{tier === .very-low. \? .bg-white shadow-lg. : (\(tier === .high. && !reducedMotion \? .bg-white\/85 backdrop-blur-2xl border border-white\/30. : \(tier === .mid. && !reducedMotion\) \? .mid-glass-card-light. : .bg-white.\))\}/g, "${$1}");
content = content.replace(/\$\{tier === .very-low. \? .bg-white border-b border-gray-200. : (\(tier === .high. && !reducedMotion \? .bg-white\/10 border-b border-white\/20. : .bg-white.\))\}/g, "${$1}");
content = content.replace(/\{tier !== .very-low. &&/g, "{true &&");
content = content.replace(/\$\{tier === .very-low. \? .. : .animate-pulse.\}/g, "animate-pulse");
content = content.replace(/\$\{tier === .very-low. \? .bg-white. : (\(tier === .high. && !reducedMotion \? .bg-transparent. : .bg-\[\#fcfcfd\].\))\}/g, "${$1}");
content = content.replace(/\$\{tier === .very-low. \? .bg-accent text-black font-semibold. : (\(tier === .high. && !reducedMotion \? .bg-accent\/40 backdrop-blur-md border border-accent\/30 shadow-none. : .bg-accent.\))\}/g, "${$1}");
content = content.replace(/\$\{tier === .very-low. \? .bg-gray-50 border-gray-300. : (\(tier === .high. && !reducedMotion \? .liquid-glass-msg. : .bg-white.\))\}/g, "${$1}");
content = content.replace(/\$\{tier === .very-low. \? .bg-accent. : (\(tier === .high. && !reducedMotion \? .liquid-glass-btn-accent-invert. : \(tier === .mid. && !reducedMotion\) \? .mid-glass-btn-accent-invert. : .bg-accent text-primary hover:bg-\[\#b0912f\] hover:scale-105 active:scale-95.\))\}/g, "${$1}");
content = content.replace(/\$\{tier === .very-low. \? .. : .sm:group-hover:translate-x-1 sm:group-hover:-translate-y-1.\}/g, "sm:group-hover:translate-x-1 sm:group-hover:-translate-y-1");
content = content.replace(/whileHover=\{tier === .very-low. \? \{\} : (\{ y: -5 \})\}/g, "whileHover={$1}");
content = content.replace(/\$\{tier === .very-low. \? .bg-white border-gray-200 shadow-none. : (\(tier === .high. && !reducedMotion \? .bg-white\/95 backdrop-blur-xl border border-white\/50. : .bg-white border border-gray-100.\))\}/g, "${$1}");
content = content.replace(/tier === .low. \|\| tier === .very-low./g, "tier === \u0027low\u0027");
content = content.replace(/whileHover=\{tier === .very-low. \? \{\} : (\{ scale: 1.05, y: -2 \})\}/g, "whileHover={$1}");
content = content.replace(/\$\{tier === .very-low. \? .bg-accent text-black scale-100 shadow-none. : (\(tier === .high. && !reducedMotion \? .liquid-glass-btn-accent-invert. : \(tier === .mid. && !reducedMotion\) \? .mid-glass-btn-accent-invert. : .bg-accent text-primary border border-white\/20 hover:bg-accent\/90.\))\}/g, "${$1}");

fs.writeFileSync("d:\\DelphinAssociates\\components\\FloatingChatbot_fixed.tsx", content);
console.log("Replaced strings successfully");
