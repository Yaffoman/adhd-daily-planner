import { conversationRequest } from "../../../../features/openai/openai";

export async function POST ( {request} ): Promise<Response>  {
    try {
        console.log('we in this bitch')
        const { messages } = await request.json();
        const message = await conversationRequest(messages)
        return new Response (JSON.stringify({ success: true, data: message}));
    } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e }));
    }
    
}