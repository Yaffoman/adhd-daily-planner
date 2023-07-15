import {initializeApp} from "firebase/app"
import {getFirestore, CollectionReference, collection, type DocumentData, doc, setDoc, getDoc} from 'firebase/firestore'
import type {Persona} from "./models";

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


export async function getPersona(id: string) {
    const parseDoc = await getDoc(doc(personasCol, id));
    return parseDoc.data() as Persona;
}

export async function updatePersona(id: string, persona: Persona) {
    const myDoc = doc(personasCol, id)
    return setDoc(myDoc, persona);
}

