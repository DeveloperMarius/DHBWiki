import {User} from "../objects/user";

export interface IDatabaseManager<T>{
    getById(id: string): T,
    delete(id: string): boolean,
    create(object: T): T|null,
    getAll(): T[],
    update(key: string, value: any): boolean
}

export class DatabaseManager<T> implements IDatabaseManager<T>{
    delete(id: string): boolean{
        return false;
    }

    create(object: T): T | null {
        return undefined;
    }

    getAll(): T[] {
        return [];
    }

    getById(id: string): T {
        return ;
    }

    update(key: string, value: any): boolean {
        return false;
    }
}