import { chatbotKnowledge } from "./data/chatbotKnowledge";

const getAnswerFromKnowledgeBase = (question: string) => {
  if (!question) return "FALLBACK";
  
  const q = question.toLowerCase().replace(/[^\w\s]/g, "");
  const words = q.split(/\s+/).filter(w => w.length > 1);
  
  const stopwords = ["the", "this", "that", "those", "these", "they", "them", "from", "with", "about", "could", "would", "should", "can", "you", "tell", "want", "know", "please", "more", "info", "information", "details", "help", "give", "show", "what", "where", "when", "who", "how", "is", "are", "was", "were", "be", "been", "being", "in", "on", "at", "to", "for", "of", "with", "by", "an", "as"];
  const filteredWords = words.filter(w => !stopwords.includes(w));

  const searchWords = filteredWords.length > 0 ? filteredWords : words;

  let bestMatch: { item: any; score: number } = { item: null, score: 0 };

  chatbotKnowledge.forEach(item => {
    let score = 0;
    
    item.keywords.forEach(keyword => {
      searchWords.forEach(word => {
        if (word === keyword) {
          score += 10;
        } else if (word.length > 3 && keyword.length > 3) {
          if (word.includes(keyword) || keyword.includes(word)) {
            score += 3;
          }
        }
      });
    });

    if (score > bestMatch.score) {
      bestMatch = { item, score };
    }
  });

  if (bestMatch.score >= 5) {
    return bestMatch.item.answer;
  }
  
  return "FALLBACK";
};

const testCases = [
  { q: "Who is the founder?", keyMatch: "established in 1999 by Mr. Delphin P. Stanley" },
  { q: "Tell me about delphin associates history", keyMatch: "over 25 years of impeccable industry experience" },
  { q: "What is your motto?", keyMatch: "You Dream We Build" },
  { q: "Do you build churches?", keyMatch: "CSI St Mark's Church" },
  { q: "Tell me about industrial projects", keyMatch: "Ford Alliance Group" },
  { q: "residential flat in T Nagar", keyMatch: "elite apartments and standalone villas" },
  { q: "educational school projects", keyMatch: "Peri College campus expansion" },
  { q: "What services do you provide?", keyMatch: "Residential Construction, Industrial & Commercial" },
  { q: "Do you offer structural consultancy?", keyMatch: "soil testing, structural design" },
  { q: "Where are you located?", keyMatch: "headquartered in Chennai" },
  { q: "How long does a project take?", keyMatch: "11-14 months" },
  { q: "Can I get a free consultation?", keyMatch: "economical yet high-quality" },
  { q: "What about quality and safety?", keyMatch: "100% quality assurance" },
  { q: "How can I contact you?", keyMatch: "+91 98412 43345" },
  { q: "Do you do house renovations?", keyMatch: "extensive renovation and modernization" },
  { q: "Can you help with CMDA approval?", keyMatch: "navigating the legal landscape" },
  { q: "Tell me about your team", keyMatch: "highly experienced management and technical professionals" },
  { q: "Who is Sundar Singh?", keyMatch: "Management Team Leader" },
  { q: "Who is Darwin Rholland?", keyMatch: "leads our Technical Division" },
  { q: "Who is Godwin?", keyMatch: "experienced engineer with 10 years" },
  { q: "Who is Janarthanan?", keyMatch: "skilled engineer with 10 years" },
  { q: "Who is John Griffin?", keyMatch: "dedicated engineer with 6 years" },
  { q: "Who is Glenn Grifton?", keyMatch: "young professional engineer with 4 years" },
  { q: "something random", keyMatch: "FALLBACK" }
];

let failedTests: any[] = [];

testCases.forEach((tc, i) => {
  const result = getAnswerFromKnowledgeBase(tc.q);
  const cleanResult = result.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags
  const isPass = tc.keyMatch === "FALLBACK" ? cleanResult === "FALLBACK" : cleanResult.toLowerCase().includes(tc.keyMatch.toLowerCase());
  
  if (!isPass) {
    failedTests.push({ index: i + 1, q: tc.q, expected: tc.keyMatch, got: cleanResult.substring(0, 100) + "..." });
  }
});

if (failedTests.length > 0) {
  console.log(`FAILED_TESTS_START`);
  failedTests.forEach(ft => {
    console.log(`FAIL[${ft.index}]: "${ft.q}" | EXPECTED: "${ft.expected}" | GOT: "${ft.got}"`);
  });
  console.log(`FAILED_TESTS_END`);
  process.exit(1);
} else {
  console.log("ALL_TESTS_PASSED!");
  process.exit(0);
}
