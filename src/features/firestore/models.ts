export interface Persona{
    name: string;
    occupation: string;
    skills: string[];
    experience: string[];
    education: string[];
}

export function parsePersona(data: any): Persona{
    return {
        name: data.name,
        occupation: data.occupation,
        skills: data.skills,
        experience: data.experience,
        education: data.education,
    }
}