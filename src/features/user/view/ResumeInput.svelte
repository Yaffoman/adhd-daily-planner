<script lang="ts">
    import {goto} from "$app/navigation";
    import {getPersona, updatePersona} from "../../firestore/firestore";
    import type {Persona} from "../../firestore/models";
    import LoadingIndicator from "../../shared/components/LoadingIndicator.svelte";
    import { Popups } from "../../shared/domain/popups";
    import { CurrentUser, User, UserModel } from "../domain/user";

    let resume = '';
    let loading = false;

    async function handleSubmit() {
        console.log('Submitting resume...');
        loading = true;
        try {
            const resp = await fetch("/api/openai/resume", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({resume}),
            });
            const data = await resp.json()

            console.log("updating persona:", data)
            await updatePersona(data as Persona)

            // Create and set current user object
            const user = new UserModel(new User(data as Persona));
            CurrentUser.set(user);

            goto('/taskList');
        } catch(e) {
            loading = false;
            resume = '';
            Popups.add({
                isError: true,
                message: "Error creating User Persona from resume. Please try again.",
            })
        }
    }
</script>

<div class="flex flex-col">
    {#if !loading}
        <textarea bind:value={resume} cols="30" rows="10" placeholder="Copy / Paste Resume here..."
                class="rounded-lg px-4 py-2 placeholder:text-primary placeholder:text-opacity-50 text-primary bg-white"></textarea>
        <button class="px-3 py-1.5 bg-blue-base rounded hover:bg-blue-hover text-white h-[40px] w-36 mx-auto mt-6"
                on:click={handleSubmit}>Submit Resume
        </button>
    {:else}
        <div class="flex flex-row items-center animate-pulse relative mx-auto mt-5">
            <span class="text-lg font-medium">Processing Resume </span>
            <LoadingIndicator positioning='block ml-3 mb-1.5'/>
        </div>
    {/if}
</div>