<script src="ts">
    import { Task } from "../../task/domain/task";
    import { TaskList } from "../domain/taskList";


    let taskInput = '';

    function handleSubmit() {
        if (taskInput !== '') {
            console.log('Adding task: ', taskInput);

            const task = new Task({title: taskInput});
            TaskList.addTask(task);

            taskInput = '';
        }
    }

</script>

<div class="flex flex-row w-full items-center sm:w-3/4 md:w-1/2 mx-auto mt-auto mb-5">
    <input bind:value={taskInput} type="text" placeholder="Write a Medium blog..." class="py-2 px-4 rounded w-full">
    <button class="px-3 py-1.5 bg-blue-base rounded hover:bg-blue-hover text-white h-[40px] ml-2 w-36" on:click={handleSubmit}>Add Task</button>
</div>
