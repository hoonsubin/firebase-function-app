import { IStorableBase } from './dataStoreModel';

export interface User extends IStorableBase {
    name: string;
    age: number;
    hobby: string[];
}
