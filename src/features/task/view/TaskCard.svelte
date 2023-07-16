<script lang="ts">
    import {fade, fly, slide} from "svelte/transition";
    import type {TaskModel} from "../domain/task";

    export let task: TaskModel;
    export let isSubTask: boolean = false;
    export let depth: number = 0;
    const fifteenMinutesInSeconds = 15 * 60;
    let open = false;
    let loading = false;
    let showModal = false;
    let taskContext = '';
    const remainingTotalMinutes = task ? task.state.subTasks.filter(subtask => !subtask.state.isComplete).length * 15 : 0;
    const remainingHours = Math.floor(remainingTotalMinutes / 60);
    const remainingMinutes = remainingTotalMinutes % 60;
    const remainingTime = `${remainingHours ? remainingHours + ' Hrs' : ''} ${remainingMinutes ? remainingMinutes + ' Min' : ''}`;
    let subtasksOpen = false;
    let focusMode = false;
    let time = fifteenMinutesInSeconds;
    let timer = null;
    let timerExpired = false;


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
    <div class="flex flex-col w-full sm:w-3/4 md:w-2/3 mx-auto">
        {#if isSubTask}
            <div class="h-3 w-1 mr-[30px] ml-auto z-0 depth-{depth % 6}"/>
        {/if}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="flex flex-row bg-secondary rounded-md drop-shadow text-white text-md w-full mx-auto z-10 {isSubTask ? '': 'mt-3'} {!subtasksOpen ? 'px-[18px] py-[14px]' : 'px-4 py-3'} relative hover:cursor-pointer" class:opacity-20={$task.isComplete} on:click={handleClick} class:border-ice={subtasksOpen && !isSubTask} class:border-2={subtasksOpen && !isSubTask} class:border-opacity-72={subtasksOpen && !isSubTask} class:p-0.5={!subtasksOpen && !isSubTask}>
            <button class:bg-slate-800={!$task.isComplete} class:hover:bg-slate-700={!$task.isComplete} class:bg-ice={$task.isComplete} class="rounded-full border-2 border-ice border-opacity-75 hover:cursor-pointer h-6 w-6 min-h-[1.5rem] min-w-[1.5rem] max-h-6 max-w-6 my-auto" on:click={() => task.markComplete(!$task.isComplete)}/>
            <div class="flex flex-col ml-3 my-auto select-none" class:line-through={$task.isComplete}>
                <p class="font-medium">{task.state.title}</p>
                <p>Time Remaining: {remainingTime}</p>
                <!-- <p>Estimated Time: {$task.timeEstimate}</p> -->
                <p class="text-sm mt-1">{$task.context !== 'No additional context provided.' ? $task.context : ''}</p>
                <!-- <p class="text-sm mt-1">{$task.context}</p> -->
            </div>
            {#if $task.subTasks.length > 0}
                <button
                    class:rotate-90={!subtasksOpen}
                    class="material-icons ease-out duration-300 arrow-icon opacity-75 cursor-pointer select-none ml-auto">
                    arrow_drop_down
                </button>
            {/if}
            
        </div>
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
                    <button on:click|stopPropagation={resetTimer} transition:fade={{x: 100, duration: 200}}
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
