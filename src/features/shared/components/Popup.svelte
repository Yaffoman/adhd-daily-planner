<script lang="ts">
    import { fly } from 'svelte/transition';
    import { Popups, POPUP_REMOVE_DELAY, type PopupData } from '../domain/popups';
    export let id: string;
    export let popup: PopupData;

    let active: boolean = true;
    let dismissable: boolean = false;
    let hovering: boolean = false;

    setTimeout(makeDismissable, popup.lifetime ?? 4000);

    function makeDismissable() {
        if (hovering) {
            dismissable = true;
        } else {
            dismiss();
        }
    }

    function dismiss() {
        if (!active) return;
        Popups.remove(id);
        active = false;
    }

    function hoverDismiss() {
        if (dismissable) {
            dismiss();
        } else {
            hovering = false;
        }
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    transition:fly={{ y: 40, duration: POPUP_REMOVE_DELAY }}
    on:mouseenter={() => (hovering = true)}
    on:mouseleave={hoverDismiss}
    class="z-50 absolute left-0 bottom-12 flex items-center w-screen justify-center pointer-events-none">
    <button
        tabindex={-1}
        class:bg-red-base={popup.isError}
        class:bg-blue-base={!popup.isError}
        class:backdrop-blur-xl={!popup.isError}
        class:text-gold-base={popup.isWarning}
        class="pointer-events-auto flex flex-row py-3 px-6 rounded-md items-center max-w-[50%] text-white font-medium"
        on:click={dismiss}>
        {#if popup.icon}
            <i class="material-icons mr-2">{popup.icon}</i>
        {/if}
        <p class="break-all text-sm">
            {popup.message}
        </p>
    </button>
</div>

<style>
    i {
        font-size: 15px;
    }
</style>
