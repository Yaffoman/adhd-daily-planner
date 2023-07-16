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
    const fifteenMinutesInSeconds = 15 * 60;


    let focusMode = false;
    let time = fifteenMinutesInSeconds;
    let timer = null;
    let timerExpired = false;

    function updateRemainingTime() {
        // Mark the task as complete 
        task.markComplete(!$task.isComplete)

        // Dispatch event for parent
        dispatch('taskCompleted', { isCompleted: $task.isComplete });
    }

    function handleClick() {
        focusMode = true;
    }

    function startTimer() {
        timer = setInterval(() => {
            time--;
            if (time <= 0) {
                clearInterval(timer)
                timerExpired = true;
            }
        }, 1000);
    }

    function resetTimer() {
        time = 15 * 60;
        clearInterval(timer);
        timer = null;
    }

    function stopTimer() {
        clearInterval(timer);
        timer = null;

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
<!-- Enter Focus Mode -->
<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if focusMode}
    <div
            transition:fade={{duration: 200}}
            class="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur px-10 justify-between flex flex-col"
            class:hidden={!focusMode}
            on:click={() => {focusMode = false; stopTimer()}}
    >
        <div>
            <h1 class="text-white text-5xl font-medium pt-10 text-center mt-36">Focus Mode</h1>
            <div class="w-full h-px min-h-[1px] bg-white opacity-10 my-5"/>
            <div class="pl-8">
            <h2 class="mx-auto mt-10 text-4xl text-white">Task</h2>
            <h2 class="mx-auto text-2xl text-white mb-5">{task.state.title}</h2>
            <h2 class="mx-auto text-4xl text-white">Notes</h2>
            <h2 class="mx-auto text-2xl text-white">{task.state.context}</h2>
            </div>
            <div class="flex justify-center flex-col items-center">

                <h1 class="mx-auto mt-10 text-[168px] text-white my-2" class:animate-pulse={timerExpired} style="animation-duration: 1.3s">
                    {Math.floor(time / 60) < 10 ? "0" : ""}{Math.floor(time / 60)}:
                    {time % 60 < 10 ? "0" : ""}{time % 60}</h1>
                <div>
                    <button on:click|stopPropagation={timer ? stopTimer : startTimer}
                            class="bg-ice rounded-full px-5 hover:cursor-pointer min-h-[1.5rem] min-w-[1.5rem] h-12"
                    >
                        {timer ? "Stop Timer" : "Start Timer"}
                    </button>
                    {#if time !== fifteenMinutesInSeconds}
                    <button on:click|stopPropagation={resetTimer} transition:fade={{duration: 200}}
                            class="bg-slate-400 rounded-full px-2 hover:cursor-pointer min-h-[1.5rem] min-w-[1.5rem] h-12 w-fit"
                    >
                        Reset
                    </button>
                        {/if}
                </div>
            </div>
        </div>


        <div class="flex justify-center p-5">
            <button class="text-white rounded bg-red-base w-fit px-2 text-1xl" on:click={() => focusMode = false}>
                Exit
            </button>
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
