import {doc, setDoc, getDoc} from 'firebase/firestore'

import { personasCol } from "../../../../features/firestore/firestore";
import type { Persona } from "../../../../features/firestore/models";

const TEST_USER_ID = "test-user"

export async function GET(): Promise<Response> {
    const parseDoc = await getDoc(doc(personasCol, TEST_USER_ID));

    const persona = parseDoc.data() as Persona;

    return new Response(JSON.stringify({success: true, data: persona}));
}

export async function POST({request}): Promise<Response> {
    try {
        const {persona} = await request.json();
        const myDoc = doc(personasCol, TEST_USER_ID)
        setDoc(myDoc, persona);

        return new Response(JSON.stringify({success: true}));
    } catch (e) {
        return new Response(JSON.stringify({success: false, error: e}));
    }

}