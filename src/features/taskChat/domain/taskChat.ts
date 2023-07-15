import Entity, { type EntityProps } from "../../../architecture/entity";
import Model from "../../../architecture/model";
import type { MessageModel } from "./message";

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
}