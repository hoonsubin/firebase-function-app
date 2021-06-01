import { IStorableBase } from './dataStoreModel';

export interface RequestPayload<T> {
    body: T;
}

export interface Request<T extends IStorableBase> extends RequestPayload<T> {
    params: { [key: string]: string };
}

export interface ResponseData<T> {
    status: 'success' | 'error';
    message: string;
    data?: T;
}

// server response code
export enum ResponseStatus {
    Success = 200,
    ClientError = 400,
    InternalError = 500,
}
