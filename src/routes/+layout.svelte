<script lang="ts">
    import "../app.css";
    import Popup from "../features/shared/components/Popup.svelte";
    import { Popups } from "../features/shared/domain/popups";
    
</script>

<main class="h-full w-full bg-primary">
    <slot />    
</main>

{#if $Popups.currentPopup}
    <Popup id={$Popups.queue[0]} popup={$Popups.currentPopup} />
{/if}