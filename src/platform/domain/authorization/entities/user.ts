
import * as Foundation from '../../../../foundation';

export interface IUser extends Foundation.IDomainEntity {
    id: string;
    name: string;
    password: string;
}

export const USERS: Array<IUser> = [
    { id: 'c9b20bc6-ab8f-4eba-b735-97492e7fa2a1', name: 'slidingapps', password: 'secret' },
    { id: '4b9aaa14-a015-4975-9997-efed52291cb9', name: 'express', password: 'silent' }
];
