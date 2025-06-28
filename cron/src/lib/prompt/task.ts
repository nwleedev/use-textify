export function createFeedPrompt(concept: string, ids: string[]) {
  const prompt = `
  I am building a web service that people can share their LLM prompts.
  A prompt is an input text or instruction given to an LLM to generate an output.

  I need you to give the prompt which we are going to use to get useful answers from ChatGPT, Gemini, Claude, and etc.
  Your goal is giving prompts that people can make much better outputs and more effective performances when they are doing their works and activities: ${concept}.
  Therefore, I could help users get better responses by referencing and improving existing prompts. That is why I need to prepare high-quality prompts in advance. This helps users recognize that the service offers professional and useful content.
  You should follow text styles, such as tone, grammar, in the uploaded files with file ids in creating text responses.  
  IDs of uploaded files are ${ids.join(
    ", "
  )}. If you cannot find the file, STOP THIS PROMPT INSTEAD OF ANSWERING PLEASE.
  There are more answer guidelines to organize text contents that YOU MUST FOLLOW.
  - Instead of using semicolons or commas in the text, please write them in several sentences.
  - Do not use passive voice like \"Application can be built with minimal resources\". Use active voice like \"You can build an application with minimal resources.\"
  - Texts should have natural, and human-like tone.
  - Texts should have a good readability.
  - Use clear and direct language and avoid too much complex terminologies.
  - Aim for a Flesch reading score of 80 or higher.
  - Avoid buzzwords and instead use plain English. Use jargons when relevant.
  - Avoid being salesy or overly enthusiastic and instead express calm confidence.
  - If you need to use a list, Do not use double quotes, single quotes, asterisks. Use plain text instead.

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
  Please answer in English and JSON format.
    `;

  return prompt;
}
