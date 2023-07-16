<script lang="ts">
    import { TaskList } from "../domain/taskList";
    import TaskCard from "../../task/view/TaskCard.svelte";
    import LoadingIndicator from "../../shared/components/LoadingIndicator.svelte";
    import { getPersonaTasks } from "../../firestore/firestore";
    import { onMount } from "svelte";

    let tasksLoading = true;

    onMount(async () => {
        // This is where you would fetch your user data or validate auth status
        getPersonaTasks().then((tasks) => {
            if (!tasks) {
                tasksLoading = false;
            } else {
                // @ts-ignore
                TaskList.parseTaskBreakdownAndAdd(tasks)                
            }
            tasksLoading = false;
        }).catch((e) => {
            console.log(e);
            tasksLoading = false;
        })
    });

</script>

{#if !tasksLoading}
    {#if $TaskList.tasks.length > 0}
        <div class="flex flex-col my-5">
            {#each $TaskList.tasks as task}
                <TaskCard {task} />
            {/each}
        </div>
    {:else}
        <div class="opacity-50 text-center text-2xl font-medium text-white mt-20">No tasks for the day</div>
    {/if}
{:else}
    <div class="flex flex-row items-center animate-pulse relative mx-auto">
        <span class="font-medium ml-auto">Loading Tasks</span>
        <LoadingIndicator positioning='block ml-3 mb-1.5 mr-auto'/>
    </div>
{/if}