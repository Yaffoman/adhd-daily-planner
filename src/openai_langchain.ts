import {Configuration, OpenAIApi} from "openai";
import {OpenAI} from "langchain/llms/openai";



const formatInstructions = "Format instructions: \n" +
    "1. The persona object should be a json object with the following fields: name, occupation, skills, experience, and education. \n" +
    "2. The name field should be a string. \n" +
    "3. The occupation field should be a string. \n" +
    "4. The skills field should be an array of strings. \n" +
    "5. The experience field should be an array of strings. \n" +
    "6. The education field should be an array of strings. \n" +
    "Here is a sample response:" +
    "{\"Name\": \"John Doe\",\n  \"Occupation\": \"Software Engineer\",\n  \"Skills\": [\n    \"Programming Languages: Proficient in TypeScript/JavaScript, Python, Golang, and Dart.\",\n    \"Web Development: Experienced in Node.js, Svelte, Next.js, React, Flutter, and Django.\",\n    \"Design: Skilled in web design, mobile design, and Adobe XD.\",\n    \"Communication: Strong written and verbal communication skills, including technical writing and presenting.\",\n    \"Leadership and Project Management: Demonstrated ability to lead teams and manage projects effectively.\"\n  ],\n  \"Experience\": [\n    \"Has a solid background in software engineering with a focus on developing and maintaining high-load services.\",\n    \"Demonstrates strong skills in managing the testing and deployment of new software versions\",\n    \"Started his career as a junior developer where he honed his skills in software application development and debugging.\"\n  ],\n  \"Education\": [\n    \"Holds a Bachelor of Science degree in Computer Science.\"\n  ]}";

const basePrompt = "Use the following resume to create a persona object as described in the formatting instructions. Only respond with the json object.";

export async function chatRequest(promptText) {
    const modelConfig = {
        model: "gpt-3.5-turbo",
        temperature: 1,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY
    }
    const openai = new OpenAI(modelConfig);
    const fullPrompt = basePrompt + "\n" + formatInstructions + "\n" + promptText;
    console.log("ooga booga")
    const response = await openai.call(fullPrompt);
    console.log(response)
}