<script lang="ts">
    import { TaskList } from "../domain/taskList";
    import TaskCard from "../../task/view/TaskCard.svelte";

</script>

{#if $TaskList.tasks.length > 0}
    <div class="flex flex-col my-5">
        {#each $TaskList.tasks as task}
            <TaskCard {task} />
        {/each}
    </div>
{:else}
    <div class="opacity-50 text-center text-2xl font-medium text-white mt-20">No tasks for the day</div>
{/if}