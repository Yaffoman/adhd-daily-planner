<script lang="ts">
    import { goto } from "$app/navigation";
    import {getPersona, updatePersona} from "../../../api/firestore";
    import type {Persona} from "../../../api/models";

    let resume = '';

    async function handleSubmit() {
        console.log('Submitting resume...');
        let currentPersona = getPersona();
        if (!currentPersona) {
            console.error('No persona found');
            return;
        }
        else{
            let resp = await fetch("/api/openai/resume", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ resume }),
            });
            let data = await resp.json()
            await updatePersona(data as Persona)
        }

        // goto('/taskList');
    }
</script>

<div class="flex flex-col">
    <textarea bind:value={resume} cols="30" rows="10" placeholder="Copy / Paste Resume here..." class="rounded-lg px-4 py-2 placeholder:text-primary placeholder:text-opacity-50 text-primary bg-white"></textarea>
    <button class="px-3 py-1.5 bg-blue-base rounded hover:bg-blue-hover text-white h-[40px] w-36 mx-auto mt-6" on:click={handleSubmit}>Submit Resume</button>
</div>