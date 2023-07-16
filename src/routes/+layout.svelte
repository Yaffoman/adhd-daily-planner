<script lang="ts">
    import "../features/firestore/firestore";
    import "../app.css";
    import Popup from "../features/shared/components/Popup.svelte";
    import { Popups } from "../features/shared/domain/popups";
    import {deletePersona, getPersona} from "../features/firestore/firestore";
    import {goto} from "$app/navigation";
    import { onMount } from "svelte";
    import { CurrentUser, UserModel, User } from "../features/user/domain/user";

    let isLoading = true;

    async function handleReset() {
        await deletePersona();
        await goto("/");
    }

    onMount(async () => {
        // This is where you would fetch your user data or validate auth status
        getPersona().then((persona) => {
            if (!persona) {
                goto('/resume');
            } else {
                // @ts-ignore
                CurrentUser.set(new UserModel(new User(persona)));
                goto('/taskList');
            }
            isLoading = false;
        }).catch((e) => {
            console.log(e);
            goto('/resume');
        })
    });
</script>

{#if isLoading}
    Loading
{:else}
    <main class="h-full w-full bg-primary">
        <button class="absolute right-1 top-1 px-3 py-1.5 bg-red-base float-right rounded hover:bg-red-hover text-white h-[40px] ml-auto w-36"  on:click={handleReset}>Reset Demo</button>
        <slot />
    </main>

    {#if $Popups.currentPopup}
        <Popup id={$Popups.queue[0]} popup={$Popups.currentPopup} />
    {/if}
{/if}

