<script lang="ts">
    import { goto } from "$app/navigation";

    let resume = '';

    function handleSubmit() {
        console.log('Submitting resume...');
        goto('/taskList');
    }
</script>

<div class="flex flex-col">
    <textarea bind:value={resume} name="resume" id="" cols="30" rows="10" placeholder="Copy / Paste Resume here..." class="rounded-lg px-4 py-2 placeholder:text-primary placeholder:text-opacity-50 text-primary"></textarea>
    <button class="px-3 py-1.5 bg-blue-base rounded hover:bg-blue-hover text-white h-[40px] w-36 mx-auto mt-6" on:click={handleSubmit}>Submit Resume</button>
</div>