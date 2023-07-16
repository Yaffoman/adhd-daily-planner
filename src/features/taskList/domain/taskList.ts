import Entity, { type EntityProps } from "../../../architecture/entity";
import Model from "../../../architecture/model";
import { updatePersonaTasks } from "../../firestore/firestore";
import { Task, TaskModel } from "../../task/domain/task";

interface TaskListProps extends EntityProps {
    tasks?: TaskModel[];
}
interface TaskBreakdown {
    task: string;
    subtasks: SubtaskBreakdown[];
}

interface SubtaskBreakdown {
    task: string;
    estimated_time: string;
    notes?: string;
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

    parseTaskBreakdownAndAdd(breakdown: TaskBreakdown): void {
        updatePersonaTasks(breakdown);
        const task = new TaskModel(new Task ({title: breakdown.task}))
        breakdown.subtasks.forEach((subtask) => {
            task.addSubTask(new Task({title: subtask.task}));
        });
        this.update((state) => state.copyWith({ tasks: [...state.tasks, task] }));
    }
    
}

export const TaskList = new _TaskListModel(new TaskListState({tasks: []}));