<script lang="ts">
    import "../features/firestore/firestore";
    import "../app.css";
    import Popup from "../features/shared/components/Popup.svelte";
    import { Popups } from "../features/shared/domain/popups";
    import {deletePersona} from "../features/firestore/firestore";
    import {goto} from "$app/navigation";
    async function handleReset() {
        await deletePersona();
        await goto("/");
    }
</script>

<main class="h-full w-full bg-primary">
    <button class="px-3 py-1.5 bg-red-base float-right rounded hover:bg-red-hover text-white h-[40px] ml-auto w-36"  on:click={handleReset}>Reset Demo</button>
    <slot />
</main>

{#if $Popups.currentPopup}
    <Popup id={$Popups.queue[0]} popup={$Popups.currentPopup} />
{/if}