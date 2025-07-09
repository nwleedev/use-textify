export function createUserPrompt(issue: string, category: string) {
  return `
I need help creating an effective prompt for AI assistants (Claude, ChatGPT, Gemini) to solve the following issue:

## My Issue:
${issue}

## Category: ${category}
First, analyze the category "${category}" and determine what domain, expertise, or type of tasks this category typically involves. Use this context to inform your prompt recommendations.

## What I need from you:
Please create a comprehensive, well-structured prompt that I can use with AI assistants to get the best possible results for my issue. The prompt should incorporate proven prompt engineering principles for superior AI outputs:

### Essential Elements to Include:
1. **Maximum Specificity** - Replace any vague language with precise, detailed instructions
2. **Clear Structure** - Use headers, bullet points, and logical organization
3. **Rich Context** - Provide relevant background, constraints, and success criteria
4. **Role Definition** - Assign the AI a specific expert role and expertise level
5. **Output Optimization** - Specify exact format, length, and quality requirements
6. **Concrete Examples** - Include specific examples of desired outcomes when helpful
7. **Validation Framework** - Include ways to verify and measure success

### Critical Prompt Engineering Principles:
- **Specificity over generality** - Every instruction should be concrete and actionable
- **Progressive complexity** - Break complex tasks into sequential, manageable steps
- **Context-driven constraints** - Provide boundaries that guide AI decision-making
- **Format specification** - Define exact output structure and presentation
- **Quality standards** - Include measurable criteria for acceptable results
- **Error handling** - Anticipate edge cases and provide guidance

## Structure of each response.
- Feeds include a title, a description, a prompt, tags, notices, and variables.
- Title: Title should be SEO optmizied and concise.
- Description: Description shoild be SEO optimized. Given the description, if it is like "This prompt gives ...", please write it except for the part of "This prompt gives".
- Prompt: Please write the prompt consisting of over 200 words as much as possible. If the topic is wide-spread, you should divide to multiple steps and format into the nested list, and each list item should be longer than 35 words.
- Tags: The list of tags at the prompt is a list of words. Each tag should have the length of 16 characters or less. Tags should be under than 10 tags.
- Variables: Variables are the variables required for prompts. Each variable item must consist of a variable and a variable description. A variable description is a single sentence consisting of 14-16 words about what a variable does. The prompt should use variables listed in variable list. For example, If there are variables "text" or "title", it means that prompt have to use these variables like "... {text} ..." or "... {title} ...".
- Notices: Notices are used to specify what you should be aware of before using the data that you prompt. For example, a notice would be like "LLM can make mistakes.". Do not include "LLM can make mistakes." directly. Remember notices are not an additional input to the prompt. Each notice is a single sentence consisting of 10-12 words.

Focus on creating a prompt that consistently produces high-quality, actionable results that directly solve my problem. Emphasize techniques that maximize AI comprehension and output quality.`;
}
