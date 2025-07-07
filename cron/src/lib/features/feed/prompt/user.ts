export function createUserPromptLegacy(topic: string) {
  return `
I am building a web service that people can share their LLM prompts.
A prompt is an input text or instruction given to an LLM to generate an output.

I need you to give the prompt which we are going to use to get useful answers from ChatGPT, Gemini, Claude, and etc.
Your goal is giving prompts that people can make much better outputs and more effective performances when they are doing their works and activities.
<works_and_activities>
${topic}
</works_and_activities>
Therefore, I could help users get better responses by referencing and improving existing prompts. That is why I need to prepare high-quality prompts in advance. This helps users recognize that the service offers professional and useful content.
Prompts include a title, a short description, a main prompt, tags, notices, and variables.
Please write the main prompt consisting of over 80-200 words as much as possible.
If the concept is wide-spread, you should divide into multiple and nested sub tasks, write the main prompt that can assist these nested tasks and the top topic.
For the short description, if it is like "This prompt gives ...", please write it except for the part of "This prompt gives".
The list of tags at the prompt is a list of words. Each tag should have the length of 16 characters or less.
Variables are the variables required for prompts. Each variable item must consist of a variable and a variable description. A variable description is a single sentence consisting of 14-16 words about what a variable does. 
The main prompt should use variables listed in variable list.
For example, If there are variables "text" or "title", it means that prompt have to use these variables like "... {{text}} ..." or "... {{title}} ...".
Notices are not an additional input to the prompt. Notices are used to specify what you should be aware of before using the data that you prompt. For example, a notice would be like "LLM can make mistakes.". Do not include "LLM can make mistakes." directly.
Each notice is a single sentence consisting of 10-12 words.
  `;
}

export function createUserPrompt(topic: string, category: string) {
  return `<topic_to_prompt_task>
Create a high-quality, practical prompt that helps users get genuinely useful results when asking AI about this topic.

<user_topic>
${topic}
</user_topic>

<topic_category>
${category}
</topic_category>

<creation_requirements>
<effectiveness_goals>
- Address the real problem behind this topic
- Provide specific, actionable guidance
- Include relevant context and constraints
- Specify clear success criteria and output format
- Make the prompt immediately usable by someone facing this challenge
</effectiveness_goals>

<search_optimization_goals>
- Include keywords professionals in this field would search for
- Address common pain points and challenges naturally
- Use industry-standard terminology alongside accessible language
- Structure content to rank well for related searches
- Include specific use cases and application scenarios
</search_optimization_goals>

<human_authenticity_goals>
- Write with natural variation and conversational flow
- Include personal insights and practical wisdom
- Use industry-specific knowledge and real-world considerations
- Add authentic imperfections that feel genuinely human
- Incorporate decision-making frameworks and trade-offs
</human_authenticity_goals>
</creation_requirements>

<output_structure>
- Prompts include a title, a short description, a main prompt, tags, notices, and variables.
- Please write the main prompt consisting of over 80-200 words as much as possible.
- If the topic is wide-spread, you should divide into multiple and nested sub tasks, write the main prompt that can assist these nested tasks and the top topic.
- For the short description, if it is like "This prompt gives ...", please write it except for the part of "This prompt gives".
- The list of tags at the prompt is a list of words. Each tag should have the length of 16 characters or less.
- Variables are the variables required for prompts. Each variable item must consist of a variable and a variable description. A variable description is a single sentence consisting of 14-16 words about what a variable does. 
- The main prompt should use variables listed in variable list.
- For example, If there are variables "text" or "title", it means that prompt have to use these variables like "... {{text}} ..." or "... {{title}} ...".
- Notices are not an additional input to the prompt. Notices are used to specify what you should be aware of before using the data that you prompt. For example, a notice would be like "LLM can make mistakes.". Do not include "LLM can make mistakes." directly.
- Each notice is a single sentence consisting of 10-12 words.
</output_structure>

Create a prompt that feels like expert advice from a knowledgeable professional while being highly discoverable and immediately practical.
</topic_to_prompt_task>`;
}
