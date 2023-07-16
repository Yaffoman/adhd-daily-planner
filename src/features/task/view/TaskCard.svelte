<script lang="ts">
    import { fade, fly, slide } from "svelte/transition";
    import Utils from "../../../utils/utils";
    import LoadingIndicator from "../../shared/components/LoadingIndicator.svelte";
    import Modal from "../../shared/components/Modal.svelte";
    import type {  TaskModel } from "../domain/task";

    export let task: TaskModel;
    export let isSubTask: boolean = false;
    export let depth: number = 0;

    let subtasksOpen = false;
    let focusMode = false;

    function handleClick() {
        // If subtask enter focus mode, if top level expand subtasks
        if (isSubTask) {
            focusMode = true;
        } else {
            subtasksOpen = !subtasksOpen;
        }
    }

</script>

<div class="flex flex-col">
    {#if isSubTask}
        <div class="h-3 w-1 mr-5 ml-auto z-0 depth-{depth % 6}"/>
    {/if}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="flex flex-row px-4 py-3 bg-secondary rounded-md drop-shadow text-white text-md w-full sm:w-3/4 md:w-1/2 mx-auto border-2 border-opacity-75 border-secondary z-10 {isSubTask ? '': 'mt-3'} relative" class:opacity-20={$task.isComplete} on:click={handleClick}>
        <button class:bg-slate-800={!$task.isComplete} class:hover:bg-slate-700={!$task.isComplete} class:bg-ice={$task.isComplete} class="rounded-full border-2 border-ice border-opacity-75 hover:cursor-pointer h-6 w-6 min-h-[1.5rem] min-w-[1.5rem] max-h-6 max-w-6 my-auto" on:click={() => task.markComplete(!$task.isComplete)}/>
        <div class="flex flex-col ml-3" class:line-through={$task.isComplete}>
            <p class="font-medium">{task.state.title}</p>
            <!-- <p>Estimated Time: {$task.timeEstimate}</p> -->
            <p class="text-sm mt-1">{$task.context !== 'No additional context provided.' ? $task.context : ''}</p>
            <!-- <p class="text-sm mt-1">{$task.context}</p> -->
        </div>
        {#if $task.subTasks.length > 0}
            <button
                class:rotate-90={!subtasksOpen}
                class="material-icons ease-out duration-300 arrow-icon opacity-75 cursor-pointer select-none">
                arrow_drop_down
            </button>
        {/if}
        
        </div>
    {#if subtasksOpen}
        <div transition:slide={{duration: 250}}>
            {#each task.state.subTasks as subTask}
                <svelte:self task={subTask} isSubTask={true} depth={depth + 1}/>
            {/each}
        </div>
        
    {/if}
</div>

<!-- Enter Focus Mode -->
<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    transition:fade={{duration: 250}}
    class="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur px-10"
    class:hidden={!focusMode}
    on:click={() => focusMode = false}
    >
    <h1 class="text-white text-5xl font-medium pt-10 text-center mt-36">Focus Mode</h1>
    <h2 class="mx-auto mt-10 text-2xl">Task</h2>
    <h2 class="mx-auto text-2xl">{task.state.title}</h2>
</div>

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
