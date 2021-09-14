import type { Unit } from './Unit';


export interface IProductItem {
    id: number;
    name: string;
    qty: number;
    isBought: boolean;
    unit: Unit;
}

export type NewProductItem = Omit<IProductItem, 'id' | 'isBought'>

export type UpdateProductItem = Partial<Omit<IProductItem, 'id'>>
