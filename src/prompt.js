export function buildPrompt(diff) {
  return `
You are a senior engineer reviewing a git diff.

You MUST return ALL sections below. Do not omit any section.

If a section has no content, write "None".

STRICT OUTPUT FORMAT (follow exactly):

=== SUMMARY ===
- Max 3 bullet points

=== SUGGESTED COMMIT MESSAGE ===
- One concise commit message (single line, imperative tone), reword and use summary if needed.

=== RISKS ===
- Max 5 bullet points

=== IMPROVEMENTS ===
- Max 5 bullet points

=== TESTS ===
- Max 5 bullet points

Rules:
- Do NOT skip any section
- Do NOT add extra sections
- Do NOT add explanations outside sections
- Keep total response under 150 words
- Be concise and specific

Git diff:
${diff}
`;
}
