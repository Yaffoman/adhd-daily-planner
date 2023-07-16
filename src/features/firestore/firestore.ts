import {initializeApp} from "firebase/app"
import {
    getFirestore,
    CollectionReference,
    collection,
    type DocumentData,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore'
import type {Persona, Task} from "./models";
import type {TaskModel} from "../task/domain/task";


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
export const TEST_USER_ID = `${import.meta.env.mode}-user`
export const testDoc = doc(personasCol, TEST_USER_ID)

export async function getPersona() {
    const parseDoc = await getDoc(testDoc);
    return parseDoc.data() as Persona;
}

export async function updatePersona(persona: Persona) {
    return setDoc(testDoc, {...persona}, {merge: true});
}

export async function deletePersona() {
    return await deleteDoc(testDoc);
}

const tasksCol = createCollection<Task>('personas_tasks')
const taskdoc = doc(tasksCol, TEST_USER_ID)

export async function updatePersonaTasks(task: Task) {
    return setDoc(taskdoc, task)
}

export async function getPersonaTasks() {
    const parseDoc = await getDoc(doc(tasksCol, TEST_USER_ID));
    return parseDoc.data() as Task;
}

export async function deletePersonaTasks() {
    return deleteDoc(taskdoc)
}