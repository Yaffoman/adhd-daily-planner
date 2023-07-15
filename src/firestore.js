import { initializeApp } from "firebase/app";
import { getFirestore, CollectionReference, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import {} from "./models";
const firebaseConfig = {
    apiKey: "AIzaSyB1zm8u3Yi8YmpEopuRDAtmhAkG2wpqutk",
    authDomain: "adhd-daily-planner.firebaseapp.com",
    projectId: "adhd-daily-planner",
    storageBucket: "adhd-daily-planner.appspot.com",
    messagingSenderId: "828459083998",
    appId: "1:828459083998:web:0a0d3c2f85d20aad153a4f"
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const createCollection = (collectionName) => {
    return collection(firestore, collectionName);
};
export const personasCol = createCollection('personas');
export async function getPersona(id) {
    const parseDoc = await getDoc(doc(personasCol, id));
    return parseDoc.data();
}
export async function updatePersona(id, persona) {
    const myDoc = doc(personasCol, id);
    return setDoc(myDoc, persona);
}
//# sourceMappingURL=firestore.js.map