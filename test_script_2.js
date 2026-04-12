const fs = require("fs");
let content = fs.readFileSync("d:\\DelphinAssociates\\components\\FloatingChatbot_fixed.tsx", "utf8");

content = content.replace(/tier === .very-low.\s*\?\s*.bg-white border-gray-300 hover:bg-gray-100 active:scale-100 text-gray-900.\s*:\s*(\(tier === .high. && !reducedMotion)/g, "$1");
content = content.replace(/tier === .very-low.\s*\?\s*.bg-white border-gray-300.\s*:\s*(\(tier === .high. && !reducedMotion)/g, "$1");

fs.writeFileSync("d:\\DelphinAssociates\\components\\FloatingChatbot.tsx", content);

