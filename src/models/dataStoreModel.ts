import { DocumentReference, DocumentData } from '@google-cloud/firestore';

/**
 * Base interface for all objects that are storable
 */
export interface IRefStorable extends DocumentData {
    readonly id: string;
    docRef: DocumentReference;
}
