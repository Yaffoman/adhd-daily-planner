import Entity, { type EntityProps } from "../../../architecture/entity";
import Model from "../../../architecture/model";

export enum ChatRole {
    SYSTEM,
    ASSISTANT,
    USER,
}

interface MessageProps extends EntityProps {
    role: ChatRole;
    content: string;
}

export class Message extends Entity<MessageProps> {
    readonly role: ChatRole;
    readonly content: string;

    constructor(params: MessageProps) {
        super(params.fetchState);
        this.role = params.role;
        this.content = params.content;
    }

    copyWith(params: Partial<MessageProps>): Message {
        return new Message({
            ...this,
            ...params,
        });
    }
}

export class MessageModel extends Model<Message> {
    constructor(initialValue: Message) {
        super(initialValue);
    }
}