export function parseSections(text) {
  const sections = {
    summary: "None",
    risks: "None",
    improvements: "None",
    tests: "None"
  };

  const patterns = {
    summary: /=== SUMMARY ===([\s\S]*?)(?===|$)/,
    risks: /=== RISKS ===([\s\S]*?)(?===|$)/,
    improvements: /=== IMPROVEMENTS ===([\s\S]*?)(?===|$)/,
    tests: /=== TESTS ===([\s\S]*?)(?===|$)/
  };

  for (const key in patterns) {
    const match = text.match(patterns[key]);
    if (match) {
      sections[key] = match[1].trim();
    }
  }

  return sections;
}
