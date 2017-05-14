
import * as Foundation from '../../../../foundation';

export interface IUser extends Foundation.IRepresentation {
    id: string;
    name: string;
}

export class User implements IUser {

    constructor(id: string, name: string) {
        this.$$id = id;
        this.$$name = name;
    }

    private $$id: string;
    public get id(): string { return this.$$id; }

    private $$name: string;
    public get name(): string { return this.$$name; }
}
