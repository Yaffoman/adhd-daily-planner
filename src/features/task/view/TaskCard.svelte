<script lang="ts">
    import {fade, fly, slide} from "svelte/transition";
    import type {TaskModel} from "../domain/task";
    import { onMount } from "svelte";
    import Subtask from "./Subtask.svelte";

    export let task: TaskModel;
    export let depth: number = 0;



    let remainingTime = '';
    let subtasksOpen = false;
    


    function updateRemainingTime() {
        console.log('Updating remaining time')
        const remainingTotalMinutes = $task.subTasks.filter(subtask => !subtask.state.isComplete).length * 15;
        const remainingHours = Math.floor(remainingTotalMinutes / 60);
        const remainingMinutes = remainingTotalMinutes % 60;

        // Check for no time remaining
        if (remainingHours == 0 && remainingMinutes == 0) {
            remainingTime = 'None';

            // Mark the task as complete
            task.markComplete(true);
            return;
        }
        remainingTime = `${remainingHours ? remainingHours + ' Hrs' : ''} ${remainingMinutes ? remainingMinutes + ' Min' : ''}`;
    }




    function handleClick() {
        subtasksOpen = !subtasksOpen;
    }

    onMount(() =>{
        updateRemainingTime();
    }); 

</script>

<div class="flex flex-col">
    <div class="flex flex-col w-full sm:w-3/4 md:w-2/3 mx-auto">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="flex flex-row bg-secondary rounded-md drop-shadow text-white text-md w-full mx-auto z-10 mt-3 {!subtasksOpen ? 'px-[18px] py-[14px]' : 'px-4 py-3'} relative hover:cursor-pointer" class:opacity-20={$task.isComplete} on:click={handleClick} class:border-ice={subtasksOpen} class:border-2={subtasksOpen} class:border-opacity-72={subtasksOpen} class:p-0.5={!subtasksOpen}>
            <button class:bg-slate-800={!$task.isComplete} class:hover:bg-slate-700={!$task.isComplete} class:bg-ice={$task.isComplete} class="rounded-full border-2 border-ice border-opacity-75 hover:cursor-pointer h-6 w-6 min-h-[1.5rem] min-w-[1.5rem] max-h-6 max-w-6 my-auto" on:click|stopPropagation={() => task.markComplete(!$task.isComplete)}/>
            <div class="flex flex-col ml-3 my-auto select-none" class:line-through={$task.isComplete}>
                <p class="font-medium">{task.state.title}</p>
                <span class="text-sm opacity-[90%] mt-1">Remaining Time: {remainingTime}</span>
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
                <Subtask task={subTask} isSubTask={true} depth={depth + 1} on:taskCompleted={updateRemainingTime}/>
            {/each}
        </div>

    {/if}
</div>
<style>
    button.arrow-icon {
        font-size: 28px;
    }
  
</style>
