import Entity, { type EntityProps } from "../../../architecture/entity";
import Model from "../../../architecture/model";
import { Task, TaskModel } from "../../task/domain/task";

interface TaskListProps extends EntityProps {
    tasks?: TaskModel[];
}

export class TaskListState extends Entity<TaskListProps> {
    readonly tasks: TaskModel[];

    constructor(params: TaskListProps) {
        super(params.fetchState);
        this.tasks = params.tasks ?? [];
    }

    getTasks() : TaskModel[] {
        return this.tasks;
    }

    copyWith(params: Partial<TaskListProps>): TaskListState {
        return new TaskListState({
            ...this,
            ...params,
        });
    }
}

class _TaskListModel extends Model<TaskListState> {
    constructor(initialValue: TaskListState) {
        super(initialValue);
    }

    addTask(task: Task): void {
        const model = new TaskModel(task);
        this.update((state) => state.copyWith({ tasks: [...state.tasks, model] }));
    }

    removeTask(task: TaskModel): void {
        this.update((state) => state.copyWith({ tasks: state.tasks.filter((t) => t.state.title !== task.state.title) }));
    }

    
}

export const TaskList = new _TaskListModel(new TaskListState({tasks: []}));