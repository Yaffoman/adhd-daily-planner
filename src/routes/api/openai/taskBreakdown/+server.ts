import { taskBreakdown } from '../../../../features/openai/openai.js';

export async function POST ( {request} ): Promise<Response>  {
    try {
        const { context } = await request.json();
        const message = await taskBreakdown(context)
        return new Response (JSON.stringify({ success: true, data: message}));
    } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e }));
    }
    
}