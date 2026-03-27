// Mock the knowledge base for testing
const chatbotKnowledge = [
  {
    keywords: ["team", "staff", "engineers", "management"],
    answer: "TEAM_GENERAL"
  },
  {
    keywords: ["sundar singh", "management leader"],
    answer: "SUNDAR_SINGH"
  },
  {
    keywords: ["darwin rholland", "technical leader"],
    answer: "DARWIN_RHOLLAND"
  },
  {
    keywords: ["godwin", "planning engineer"],
    answer: "GODWIN"
  }
];

const getAnswerFromKnowledgeBase = (question: string) => {
  if (!question) return "FALLBACK";
  
  const q = question.toLowerCase().replace(/[^\w\s]/g, "");
  const words = q.split(/\s+/).filter(w => w.length > 1);
  
  const stopwords = ["the", "this", "that", "those", "these", "they", "them", "from", "with", "about", "could", "would", "should", "can", "you", "tell", "want", "know", "please", "more", "info", "information", "details", "help", "give", "show", "what", "where", "when", "who", "how"];
  const filteredWords = words.filter(w => !stopwords.includes(w));

  const searchWords = filteredWords.length > 0 ? filteredWords : words;

  let bestMatch: { item: any; score: number } = { item: null, score: 0 };

  chatbotKnowledge.forEach(item => {
    let score = 0;
    
    item.keywords.forEach(keyword => {
      searchWords.forEach(word => {
        if (word === keyword) {
          score += 5;
        } else if (word.includes(keyword) || (keyword.length > 3 && keyword.includes(word))) {
          score += 2;
        }
      });
    });

    if (score > bestMatch.score) {
      bestMatch = { item, score };
    }
  });

  if (bestMatch.score >= 3) {
    return bestMatch.item.answer;
  }
  
  return "FALLBACK";
};

// Test cases
const tests = [
  { q: "Tell me about your team", expected: "TEAM_GENERAL" },
  { q: "Who is Sundar Singh?", expected: "SUNDAR_SINGH" },
  { q: "Tell me about Darwin Rholland", expected: "DARWIN_RHOLLAND" },
  { q: "Is Godwin an engineer?", expected: "GODWIN" },
  { q: "technical division head", expected: "DARWIN_RHOLLAND" },
  { q: "someone not in the team", expected: "FALLBACK" }
];

tests.forEach(({ q, expected }) => {
  const result = getAnswerFromKnowledgeBase(q);
  console.log(`Query: "${q}"`);
  console.log(`Expected: ${expected}, Got: ${result}`);
  if (result === expected) {
    console.log("PASS");
  } else {
    console.log("FAIL");
  }
  console.log("---");
});
