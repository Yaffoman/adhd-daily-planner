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
    timeEstimate?: number;
}


export class Task extends Entity<TaskProps> {
    
    
    readonly title: string;
    readonly context: string;
    readonly parentTask: TaskModel;
    readonly isComplete: boolean;
    readonly subTasks: TaskModel[];
    readonly timeEstimate: number;

    constructor(params: TaskProps) {
        super(params.fetchState);
        this.title = params.title;
        this.context = params.context ?? 'No additional context provided.';
        this.parentTask = params.parentTask ?? null;
        this.isComplete = params.isComplete ?? false;
        this.subTasks = params.subTasks ?? [];
        this.timeEstimate = params.timeEstimate ?? 0;
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

    async generateSubTasks(isSubTask: boolean): Promise<void> {
        const response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task: this.state.title,
                context: this.state.context,
            }),
        });

        if (response.ok) {
            // Parse the response body as JSON
            console.log(response)
            const jsonResponse = await response.json();

            // Create subTask models from the response
            const subTasks = jsonResponse.data.subtasks.map((subTask: any) => new TaskModel(new Task({title: subTask.task, timeEstimate: Utils.parseTime(subTask.estimated_time), parentTask: this})));

            // Get total time estimate
            let totalTimeEstimate = 0;
            subTasks.forEach((subTask) => {
                totalTimeEstimate += subTask.state.timeEstimate;
            });

            // Update the state
            this.update((state) => state.copyWith({ subTasks: subTasks, timeEstimate: totalTimeEstimate }));
        } else {
            // Show
            Popups.add({
                message: 'Error generating subtasks, please try again',
            })
        }
    }
}