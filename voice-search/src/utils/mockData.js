// Simulated search database
export const searchDatabase = [
    { text: "find me a red dress", popularity: 100 },
    { text: "find me a black jacket", popularity: 90 },
    { text: "find me running shoes", popularity: 85 },
    { text: "find me wireless headphones", popularity: 80 },
    { text: "find me a laptop", popularity: 75 },
    { text: "find me summer clothes", popularity: 70 },
  ];
  
  export function getAutocompleteSuggestions(query) {
    const normalizedQuery = query.toLowerCase();
    return searchDatabase
      .filter(item => item.text.toLowerCase().includes(normalizedQuery))
      .sort((a, b) => b.popularity - a.popularity)
      .map(item => item.text)
      .slice(0, 5);
  }