import { Configuration, OpenAIApi } from 'openai';

// Remember to replace with your OpenAI key


export async function POST ( {request} ) {
    const configuration = new Configuration({
        apiKey: import.meta.env.VITE_OPENAI_KEY_GPT4,
    });

    const openai = new OpenAIApi(configuration);
    const { task, context } = await request.json();
    console.log(task, context)

    try {
        const result = await openai.createChatCompletion({
            model: 'gpt-4',
            max_tokens: 512,
            messages: [
                {
                    role: 'system',
                    content: `Your role is to take in a task and it's context, break it down into sub-tasks, and provide a time estimation for each.

                    The user will send you data in the following format:
                    Task: [task_title]
                    Context: [any relevant context]

                    Your output should be in JSON format. The time estimation should be in hours:minutes:seconds format.
                    
                    Here is the output format:
                    
                    {
                      "task": [task_title],
                      "sub-tasks": [
                        {
                          "task": [sub-task_1_title],
                          "estimated_time": "00:30:00"
                        },
                        {
                          "task": [sub-task_n_title],
                          "estimated_time": "00:30:00"
                        }
                      ]
                    }`
                },
                {
                    role: 'user',
                    content: `Task: ${task} \n Context: ${context}`
                }
            ],
        });

        const output = result.data.choices[0].message.content;
        try {
          const parsedOutput = JSON.parse(output);

          return new Response(JSON.stringify({ success: true, data: { 'task': parsedOutput['task'], 'subtasks': parsedOutput['sub-tasks']} }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (error) {
          console.log('Failed parsing output from OpenAI:', output);
          throw error;
        }
        
      } catch (error) {
        console.error('Failed getting response from OpenAI:', error);
        
        return new Response(JSON.stringify({ success: false, message: 'Failed getting response from OpenAI' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
    }
}
