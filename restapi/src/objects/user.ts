import {DatabaseManager} from "../utils/manager";

/*export interface TUser = {
    readonly id: string,
    firstname: string,
    lastname: string
};*/

export class User extends DatabaseManager<User>{
    readonly id: string;
    _firstname: string;
    _lastname: string;
    constructor(firstname: string, lastname: string) {
        super();
        this.firstname = firstname;
    };

    get firstname(): string{
        return this._firstname;
    }
    set firstname(firstname: string){
        this._firstname = firstname;
    }
}

/*export class UserManager extends DatabaseManager<User>{

}*/
