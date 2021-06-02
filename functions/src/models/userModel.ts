import { IRefStorable } from './dataStoreModel';

export interface User extends IRefStorable {
    name: string;
    age: number;
    hobby: string[];
    walletId: Wallet;
}

export interface Wallet extends IRefStorable {
    funds: number;
}
