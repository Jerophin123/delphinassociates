import { chatbotKnowledge } from "./data/chatbotKnowledge";

const debugMatch = (question: string) => {
  const q = question.toLowerCase().replace(/[^\w\s]/g, "");
  const words = q.split(/\s+/).filter(w => w.length > 1);
  const stopwords = ["the", "this", "that", "those", "these", "they", "them", "from", "with", "about", "could", "would", "should", "can", "you", "tell", "want", "know", "please", "more", "info", "information", "details", "help", "give", "show", "what", "where", "when", "who", "how"];
  const filteredWords = words.filter(w => !stopwords.includes(w));
  const searchWords = filteredWords.length > 0 ? filteredWords : words;

  console.log(`Query: "${question}"`);
  console.log(`Words: [${words.join(", ")}]`);
  console.log(`Filtered: [${filteredWords.join(", ")}]`);
  console.log(`Search Words: [${searchWords.join(", ")}]`);

  let results = [];

  chatbotKnowledge.forEach((item, index) => {
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
    if (score > 0) {
      results.push({ index, score, keywords: item.keywords.slice(0, 3) });
    }
  });

  results.sort((a, b) => b.score - a.score);
  console.log("Top matches:");
  results.slice(0, 3).forEach(r => {
    console.log(`  ItemID ${r.index}: Score ${r.score} (Keys: ${r.keywords.join(", ")})`);
  });
  
  if (results.length > 0 && results[0].score >= 3) {
    console.log(`Winner: ItemID ${results[0].index}`);
  } else {
    console.log("No match found (Score < 3)");
  }
};

debugMatch("Who is the founder?");
debugMatch("Tell me about delphin associates history");
