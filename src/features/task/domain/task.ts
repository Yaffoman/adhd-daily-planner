import Entity, { type EntityProps } from "../../../architecture/entity";
import Model from "../../../architecture/model";
import Utils from "../../../utils/utils";
import { Popups } from "../../shared/domain/popups";


interface TaskProps extends EntityProps {
    title: string;
    parentTask?: TaskModel;
    context?: string;
    isComplete?: boolean;
    subTasks?: TaskModel[];
    timeEstimate?: string;
}


export class Task extends Entity<TaskProps> {
    
    
    readonly title: string;
    readonly context: string;
    readonly parentTask: TaskModel;
    readonly isComplete: boolean;
    readonly subTasks: TaskModel[];
    readonly timeEstimate: string;

    constructor(params: TaskProps) {
        super(params.fetchState);
        this.title = params.title;
        this.context = params.context ?? 'No additional context provided.';
        this.parentTask = params.parentTask ?? null;
        this.isComplete = params.isComplete ?? false;
        this.subTasks = params.subTasks ?? [];
        this.timeEstimate = params.timeEstimate ?? "";
    }



    copyWith(params: Partial<TaskProps>): Task {
        return new Task({
            ...this,
            ...params,
        });
    }
}

export class TaskModel extends Model<Task> {
    constructor(initialValue: Task) {
        super(initialValue);
    }

    markComplete(isComplete: boolean): void {
        this.update((state) => state.copyWith({ isComplete: isComplete }));
    }

    addContext(context: string): void {
        this.update((state) => state.copyWith({ context: context }));
    }

    addSubTask(subTask: Task): void {
        this.update((state) => state.copyWith({ subTasks: [...state.subTasks, new TaskModel(subTask)] }));
    }
}