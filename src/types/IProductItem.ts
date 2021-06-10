import { Unit } from './Unit';


export interface IProductItem {
    id: number;
    name: string;
    qty: number;
    unit: Unit;
}

export type NewProductItem = Omit<IProductItem, 'id'>
