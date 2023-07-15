import { doc, setDoc, getDoc} from 'firebase/firestore'

import { personasCol } from "../../../../features/firestore/firestore";
import type { Persona } from "../../../../features/firestore/models";


export async function GET ( {request} ): Promise<Response> {
    const { id } = await request.json();
    const parseDoc = await getDoc(doc(personasCol, id));
    
    const persona = parseDoc.data() as Persona;

    return new Response(JSON.stringify({ success: true, data: persona }));
}

export async function POST ( {request} ): Promise<Response>  {
    try {
        const { id, persona } = await request.json();
        const myDoc = doc(personasCol, id)
        setDoc(myDoc, persona);

        return new Response(JSON.stringify({ success: true }));
    } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e }));
    }
    
}