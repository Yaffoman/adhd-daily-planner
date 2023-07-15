import {generatePersona} from "../../../../features/openai/openai";

export async function POST ( {request} ): Promise<Response>  {
    try {
        const { resume } = await request.json();
        return new Response (await generatePersona(resume));
    } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e }));
    }
    
}