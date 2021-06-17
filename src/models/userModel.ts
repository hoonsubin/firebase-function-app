import { IRefStorable } from './dataStoreModel';
import { DocumentReference } from '@google-cloud/firestore';

export interface User extends IRefStorable {
    name: string;
    age: number;
    hobby: string[];
}

interface IProfileBase extends IRefStorable {
    name: string;
    email: string;
    tags: string[];
}

export class UserProfile implements IProfileBase {
    readonly collection = 'USER';
    name: string;
    email: string;
    tags: string[];
    docRef: DocumentReference;

    constructor(doc: DocumentReference, params: IProfileBase) {
        this.docRef = doc;
        this.name = params.name;
        this.email = params.email;
        this.tags = params.tags;
    }

    get id() {
        return this.docRef.id;
    }
}
