<script lang="ts">
    import {fade, fly, slide} from "svelte/transition";
    import Utils from "../../../utils/utils";
    import LoadingIndicator from "../../shared/components/LoadingIndicator.svelte";
    import Modal from "../../shared/components/Modal.svelte";
    import type {TaskModel} from "../domain/task";
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";

    export let task: TaskModel;
    export let isSubTask: boolean = false;
    export let depth: number = 0;

    const dispatch = createEventDispatcher();

    let focusMode = false;

    function updateRemainingTime() {
        // Mark the task as complete 
        task.markComplete(!$task.isComplete)

        // Dispatch event for parent
        dispatch('taskCompleted', { isCompleted: $task.isComplete });
    }

    function handleClick() {
        focusMode = true;
    }

</script>

<div class="flex flex-col">
    <div class="flex flex-col w-full sm:w-3/4 md:w-2/3 mx-auto">
        {#if isSubTask}
            <div class="h-3 w-1 mr-[30px] ml-auto z-0 depth-{depth % 6}"/>
        {/if}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="flex flex-row bg-secondary rounded-md drop-shadow text-white text-md w-full mx-auto z-10 {isSubTask ? '': 'mt-3'} px-4 py-3 relative hover:cursor-pointer" class:opacity-20={$task.isComplete} on:click={handleClick}>
            <button class:bg-slate-800={!$task.isComplete} class:hover:bg-slate-700={!$task.isComplete} class:bg-ice={$task.isComplete} class="rounded-full border-2 border-ice border-opacity-75 hover:cursor-pointer h-6 w-6 min-h-[1.5rem] min-w-[1.5rem] max-h-6 max-w-6 my-auto" on:click|stopPropagation={updateRemainingTime}/>
            <div class="flex flex-col ml-3 my-auto select-none" class:line-through={$task.isComplete}>
                <p class="font-medium">{task.state.title}</p>
                <p class="text-sm mt-1 opacity-[90%]">{$task.context !== 'No additional context provided.' ? $task.context : ''}</p>
            </div>
        </div>
    </div>
</div>

<!-- Enter Focus Mode -->
<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if focusMode}
    <div
            transition:fade={{duration: 200}}
            class="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur px-10 justify-between flex flex-col"
            class:hidden={!focusMode}
            on:click={() => focusMode = false}
    >
        <div>
            <h1 class="text-white text-5xl font-medium pt-10 text-center mt-36">Focus Mode</h1>
            <div class="w-full h-px min-h-[1px] bg-white opacity-10 my-5"/>
            <h2 class="mx-auto mt-10 text-2xl text-white my-2">Task:&emsp;{task.state.title}</h2>
            <h2 class="mx-auto text-xl text-white">Additional Notes:&emsp;{task.state.context}</h2>
        </div>
        <div class="flex justify-center p-5">

            <button class="text-white rounded bg-red-base w-fit px-2 text-1xl" on:click={() => focusMode = false}>Stop Focus</button>
        </div>
    </div>

{/if}

<style>

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
