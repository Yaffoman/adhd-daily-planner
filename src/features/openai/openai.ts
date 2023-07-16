import {type ChatCompletionResponseMessage, Configuration, OpenAIApi} from "openai";
import {basePersonaPrompt, formatPersonaInstructions, taskContextPrompt} from "./prompts";


export async function generatePersona(resume) {

    const fullPrompt = basePersonaPrompt + "\n" + formatPersonaInstructions + "\n Here is my resume:\n" + resume;
    console.log("Input Prompt", fullPrompt)
    const response = await basicChatRequest(fullPrompt);
    console.log("ChatGPT Response: ", response)
    return response
}


const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY_GPT4,
});
const openai = new OpenAIApi(configuration);

export async function conversationRequest(messages, model = "gpt-4"): Promise<ChatCompletionResponseMessage> {
    console.log('Message: ', messages)
    const modelConfig = {
        model: model,
        temperature: 1,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    }
    const response = await openai.createChatCompletion({
        ...modelConfig, messages: [{role: 'system', content: taskContextPrompt}, ...messages]
    });

    console.log(response);
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
