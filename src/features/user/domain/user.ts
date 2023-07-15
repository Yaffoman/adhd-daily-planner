import { writable } from "svelte/store";
import type { EntityProps } from "../../../architecture/entity";
import Entity from "../../../architecture/entity";
import Model from "../../../architecture/model";

export const CurrentUser = writable<UserModel>(null);
interface UserProps extends EntityProps {
    name: string;
    occupation: string;
    skills: string[];
    experience: string[];
    education: string[];
}

export class User extends Entity<UserProps> {
    readonly name: string;
    readonly occupation: string;
    readonly skills: string[];
    readonly experience: string[];
    readonly education: string[];

    constructor(params: UserProps) {
        super(params.fetchState);
        this.name = params.name;
        this.occupation = params.occupation;
        this.skills = params.skills;
        this.experience = params.experience;
        this.education = params.education;
    }

    copyWith(params: Partial<UserProps>): User {
        return new User({
            ...this,
            ...params,
        });
    }
}

export class UserModel extends Model<User> {
    constructor(initialValue: User) {
        super(initialValue);
    }
}

