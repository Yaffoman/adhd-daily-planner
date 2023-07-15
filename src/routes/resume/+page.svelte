<script lang="ts">
    import ResumeInput from '../../features/user/view/ResumeInput.svelte';
import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<main class="h-full w-full lg:w-1/2 text-white pt-10 px-10 mx-auto">
    <div class="flex flex-col h-full lg:justify-center">
        <h1 class="text-4xl font-medium">Welcome!</h1>
        <h3 class="pt-3">Before we get started organizing your day, please copy / paste your resume below so we can begin to create a persona that will help the AI better break down tasks.</h3>
        <div class="w-full h-px min-h-[1px] bg-white opacity-10 my-5" />
        <ResumeInput />
    </div>
</main>
