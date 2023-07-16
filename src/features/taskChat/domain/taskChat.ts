import Entity, { type EntityProps } from "../../../architecture/entity";
import Model from "../../../architecture/model";
import { TaskList } from "../../taskList/domain/taskList";
import { ChatRole, Message, MessageModel } from "./message";

interface TaskChatProps extends EntityProps {
    messages: MessageModel[];
}

export class TaskChatEntity extends Entity<TaskChatProps> {
    readonly messages: MessageModel[];

    constructor(params: TaskChatProps) {
        super(params.fetchState);
        this.messages = params.messages;
    }

    copyWith(params: Partial<TaskChatProps>): TaskChatEntity {
        return new TaskChatEntity({
            ...this,
            ...params,
        });
    }
}

export class TaskChatModel extends Model<TaskChatEntity> {
    constructor(initialValue: TaskChatEntity) {
        super(initialValue);
    }

    async addMessageAndGetAssistantResponse(message: MessageModel): Promise<null | string> {
        this.update((state) => state.copyWith({ messages: [...state.messages, message] }));

        const currentMessages = this.state.messages.map((message) => {
            return message.toJSON();
        });

        const response = await fetch('/api/openai/taskChat', {
            method: 'POST',
            body: JSON.stringify({ messages: currentMessages }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)

            const assistantMessage = data.data;

            // Check for [JSON READY] tag
            if (assistantMessage.content.includes('[JSON READY]')) {
                this.update((state) => state.copyWith({ messages: [...state.messages, new MessageModel(new Message({role: ChatRole.ASSISTANT, content: 'That\'s all the information I need thank you, I will begin to break down your task now.'}))] }));
                return assistantMessage.content.replace('[JSON READY]', '');
            }

            this.update((state) => state.copyWith({ messages: [...state.messages, new MessageModel(new Message(assistantMessage))] }));
            return null;
        } else {
            console.log('ur an idiot');
            return null;
        }
    }

    async breakdownTask(gptPrompt: string) {
        const response = await fetch('/api/openai/taskBreakdown', {
            method: 'POST',
            body: JSON.stringify({ context: gptPrompt }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)

            const taskBreakdown = data.data;
            // extract the json from this text, assuming first and last brackets are the json
            const parsedText = taskBreakdown.substring(taskBreakdown.indexOf('{'), taskBreakdown.lastIndexOf('}') + 1);
            const taskBreakdownObject = JSON.parse(parsedText);

            
            TaskList.parseTaskBreakdownAndAdd(taskBreakdownObject);
            // Create and add task objects here.
        }
    }


}