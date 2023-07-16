import Entity, { type EntityProps } from "../../../architecture/entity";
import Model from "../../../architecture/model";
import { Message, MessageModel } from "./message";

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

    async addMessageAndGetAssistantResponse(message: MessageModel): Promise<void> {
        this.update((state) => state.copyWith({ messages: [...state.messages, message] }));

        const currentMessages = this.state.messages.map((message) => {
            return message.toJSON();
        });

        const response = await fetch('/api/openai/taskChat', {
            method: 'POST',
            body: JSON.stringify({ messages: currentMessages }),
        })

        if (response.ok) {
            const data = await response.json();
            console.log(data)

            const assistantMessage = data.data;

            this.update((state) => state.copyWith({ messages: [...state.messages, new MessageModel(new Message(assistantMessage))] }));
        } else {
            console.log('ur an idiot')
        }
        

    }


}