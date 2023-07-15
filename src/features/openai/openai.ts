import {Configuration, OpenAIApi} from "openai";
import {sampleResume} from "./sample";


const formatPersonaInstructions = "Format instructions: \n" +
    "1. The persona object should be a json object with the following fields: name, occupation, skills, experience, and education. \n" +
    "2. The name field should be a string. \n" +
    "3. The occupation field should be a string. \n" +
    "4. The skills field should be an array of strings. \n" +
    "5. The experience field should be an array of strings. \n" +
    "6. The education field should be an array of strings. \n" +
    "Here is a sample response:" +
    "{\"Name\": \"John Doe\",\n  \"Occupation\": \"Software Engineer\",\n  \"Skills\": [\n    \"Programming Languages: Proficient in TypeScript/JavaScript, Python, Golang, and Dart.\",\n    \"Web Development: Experienced in Node.js, Svelte, Next.js, React, Flutter, and Django.\",\n    \"Design: Skilled in web design, mobile design, and Adobe XD.\",\n    \"Communication: Strong written and verbal communication skills, including technical writing and presenting.\",\n    \"Leadership and Project Management: Demonstrated ability to lead teams and manage projects effectively.\"\n  ],\n  \"Experience\": [\n    \"Has a solid background in software engineering with a focus on developing and maintaining high-load services.\",\n    \"Demonstrates strong skills in managing the testing and deployment of new software versions\",\n    \"Started his career as a junior developer where he honed his skills in software application development and debugging.\"\n  ],\n  \"Education\": [\n    \"Holds a Bachelor of Science degree in Computer Science.\"\n  ]}";

const basePersonaPrompt = "Use the following resume to create a persona object as described in the formatting instructions. Only respond with the json object.";

export async function generatePersona(resume) {

    const fullPrompt = basePersonaPrompt + "\n" + formatPersonaInstructions + "\n Here is my resume:\n" + resume;
    console.log("Input Prompt", fullPrompt)
    const response = await basicChatRequest(fullPrompt);
    console.log("ChatGPT Response: ", response)
    return response
}


const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

export async function conversationRequest(messages, model = "gpt-4") {
    const modelConfig = {
        model: model,
        temperature: 1,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    }
    const response = await openai.createChatCompletion({
        ...modelConfig, messages: messages
    });
    return response.data.choices[0].message;
}

async function basicChatRequest(prompt, model = "gpt-3.5-turbo") {
    const modelConfig = {
        model: model,
        temperature: 1,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    }
    const response = await openai.createChatCompletion({
        ...modelConfig, messages: [
            {role: "user", content: prompt},
        ]
    });
    return response.data.choices[0].message.content;
}
