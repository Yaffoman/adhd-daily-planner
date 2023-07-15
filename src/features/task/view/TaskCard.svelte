<script lang="ts">
    import { fly, slide } from "svelte/transition";
    import Utils from "../../../utils/utils";
    import LoadingIndicator from "../../shared/components/LoadingIndicator.svelte";
    import Modal from "../../shared/components/Modal.svelte";
    import type {  TaskModel } from "../domain/task";

    export let task: TaskModel;
    export let isSubTask: boolean = false;
    export let depth: number = 0;

    let open = false;
    let loading = false;
    let showModal = false;
    let taskContext = '';



    function handleGenerateSubTasks() {
        showModal = false;
        loading = true;

        task.addContext(taskContext);

        task.generateSubTasks(isSubTask).then(() => {
            loading = false;
        });
    }
</script>

<div class="flex flex-col">
    {#if isSubTask}
        <div class="h-3 w-1 mr-5 ml-auto z-0 depth-{depth % 6}"/>
    {/if}
    <div class="flex flex-row px-4 py-3 bg-secondary rounded-md drop-shadow text-white text-md w-full sm:w-3/4 md:w-1/2 mx-auto border-2 border-opacity-75 border-secondary z-10 {isSubTask ? '': 'mt-3'} relative" class:opacity-20={$task.isComplete}>
        <button class:bg-slate-800={!$task.isComplete} class:hover:bg-slate-700={!$task.isComplete} class:bg-ice={$task.isComplete} class="rounded-full border-2 border-ice border-opacity-75 hover:cursor-pointer h-6 w-6 min-h-[1.5rem] min-w-[1.5rem] max-h-6 max-w-6 my-auto" on:click={() => task.markComplete(!$task.isComplete)}/>
        <div class="flex flex-col ml-3" class:line-through={$task.isComplete}>
            <p class="">Task: {task.state.title}</p>
            <p>Estimated Time: {Utils.formatTime($task.timeEstimate)}</p>
        </div>
        {#if $task.subTasks.length === 0}
            {#if !loading}
                <button class="material-icons ml-auto my-auto cursor-pointer" title="Generate Sub-tasks" on:click={() => showModal = true}>list</button>
            {:else}
                <LoadingIndicator />
            {/if}
        {:else if $task.subTasks.length > 0}
            <button
                class:rotate-90={!open}
                on:click={() => open = !open}
                class="absolute material-icons ease-out duration-300 arrow-icon right-2 top-5 opacity-75 cursor-pointer select-none">
                arrow_drop_down
            </button>
        {/if}
        
    </div>
    {#if open}
        <div transition:slide={{duration: 250}}>
            {#each task.state.subTasks as subTask}
                <svelte:self task={subTask} isSubTask={true} depth={depth + 1}/>
            {/each}
        </div>
        
    {/if}
</div>

<Modal show={showModal} on:close={() => showModal = false}>
    <div class="flex flex-col bg-white rounded-lg p-8 w-full">
        <h1 class="text-xl font-bold text-primary">Add Task Context</h1>
        <p class="text-primary mt-2 font-medium text-sm">Add any relavant context for the task that allows the AI to better break it down into subtasks.</p>
        <textarea bind:value={taskContext} class="py-4 px-4 rounded w-full mt-5 border border-primary" placeholder="Task Context" />
        <button class:opacity-50={taskContext.length === 0} class:cursor-not-allowed={taskContext.length === 0} class:hover:bg-blue-hover={taskContext.length > 0} class="px-3 py-1.5 bg-blue-base rounded  text-white h-[40px] mt-5 w-36" on:click={handleGenerateSubTasks} disabled={taskContext.length === 0}>Submit</button>
    </div>
    
</Modal>

<style>
    button.arrow-icon {
        font-size: 28px;
    }

    .depth-0 {
        background-color: #FF7772;
    }

    .depth-1 {
        background-color: #ACC4EA;
    }

    .depth-2 {
        background-color: #E39C70;
    }

    .depth-3 {
        background-color: #66D6A5;
    }

    .depth-4 {
        background-color: #FFD371;
    }

    .depth-5 {
        background-color: #6E79FF;
    }
</style>
