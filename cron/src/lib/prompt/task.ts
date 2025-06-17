export function createFeedPrompt(concept: string) {
  const prompt = `
  I am building a web service that people can share their LLM prompts.
  A prompt is an input text or instruction given to an LLM to generate an output.
  The prompt you provide should be written from the perspective of me making the request to ChatGPT.
  You should give a prompt that can help people when they are doing this activity: ${concept}.
  I want to help users get better responses by referencing and improving existing prompts. So I need to prepare high-quality prompts in advance. This helps users recognize that the service offers professional and useful content.
  
  You should follow text styles, such as tone, grammer, in the uploaded files with file ids in creating text responses. Instead of using semicolons or commas in the text, please write them in short sentences.
  Prompts include a title, a short description, a main prompt, tags, notices, and variables.
  Please write the main prompt consisting of over 80 words as much as possible.
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
