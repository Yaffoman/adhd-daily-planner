<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { createEventDispatcher } from 'svelte';


    export let show = false;

    const dispatch = createEventDispatcher();


    function handleEscape(e: KeyboardEvent) {
        if(e.key !== 'Escape') return;
        show = false;
        dispatch('close');
    }

    function remove(e: Event) {
        // @ts-ignore
        if (e.target.id !== 'modal-container') return;
        show = false;
        dispatch('close');
    }
</script>

<svelte:window on:keydown={handleEscape}/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    transition:fade={{ duration: 300 }}
    on:click={remove}
    class="z-50 absolute top-0 left-0 h-full w-full p-12 md:p-24 flex bg-[#121212] bg-opacity-50"
    class:hidden={!show}
    class:block={show}
    id="modal-container"
    >
    <div
        transition:fly={{y: 40, duration: 300}}
        class="m-auto">
        <slot/>
    </div>
</div>