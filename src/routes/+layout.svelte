<script lang="ts">
    import {initializeApp} from "firebase/app"
    import { getFirestore, type DocumentData, collection, type CollectionReference } from "firebase/firestore";


    import "../app.css";
    import Popup from "../features/shared/components/Popup.svelte";
    import { Popups } from "../features/shared/domain/popups";
    import type { Persona } from "../features/firestore/models";

    const firebaseConfig = {
    apiKey: "AIzaSyB1zm8u3Yi8YmpEopuRDAtmhAkG2wpqutk",
    authDomain: "adhd-daily-planner.firebaseapp.com",
    projectId: "adhd-daily-planner",
    storageBucket: "adhd-daily-planner.appspot.com",
    messagingSenderId: "828459083998",
    appId: "1:828459083998:web:0a0d3c2f85d20aad153a4f"
}

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app)
    const createCollection = <T = DocumentData>(collectionName: string) => {
        return collection(firestore, collectionName) as CollectionReference<T>
    }
    export const personasCol = createCollection<Persona>('personas')
    
</script>

<main class="h-full w-full bg-primary">
    <slot />    
</main>

{#if $Popups.currentPopup}
    <Popup id={$Popups.queue[0]} popup={$Popups.currentPopup} />
{/if}