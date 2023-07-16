import {type ChatCompletionResponseMessage, Configuration, OpenAIApi} from "openai";
import {basePersonaPrompt, formatPersonaInstructions, taskBreakdownPrompt, taskContextPrompt} from "./prompts";


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

export async function conversationRequest(messages, model = "gpt-3.5-16k"): Promise<ChatCompletionResponseMessage> {
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
    console.log(response)
    return response.data.choices[0].message.content;
}

export async function taskBreakdown(taskContext: string): Promise<string> {

    const modelConfig = {
        model: 'gpt-4',
        temperature: 1,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    }
    console.log(taskContext)

    const response = await openai.createChatCompletion({
        ...modelConfig, messages: [{role: 'system', content: taskBreakdownPrompt}, {role: 'user', content: taskContext}]
    });

    return response.data.choices[0].message.content

}