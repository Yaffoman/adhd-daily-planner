export interface Persona{
    name?: string;
    occupation?: string;
    skills?: string[];
    experience?: string[];
    education?: string[];
}

export interface Task{
    task: string;
    subtasks?: Task[]
}

export interface SubTask{
    title: string;
    estimated_time?: string;
    notes?: string;
}