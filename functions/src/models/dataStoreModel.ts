import { DocumentReference } from '@google-cloud/firestore';

/**
 * Base interface for all objects that are storable
 */
export interface IRefStorable extends DocumentReference {
    id: string;
}
