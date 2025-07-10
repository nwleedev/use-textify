export function createUserPrompt(issue: string, category: string) {
  return `
I need help creating an effective prompt for AI assistants (Claude, ChatGPT, Gemini) to solve the following issue:

## My Issue:
${issue}

## Category: ${category}
First, analyze the category "${category}" and determine what domain, expertise, or type of tasks this category typically involves. Use this context to inform your prompt recommendations.

## What I need from you:
Please create a comprehensive, well-structured prompt that I can use with AI assistants to get the best possible results for my issue. The prompt should incorporate proven prompt engineering principles for superior AI outputs:

Focus on creating a prompt that consistently produces high-quality, actionable results that directly solve my problem. Emphasize techniques that maximize AI comprehension and output quality.`;
}
