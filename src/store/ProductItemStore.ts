import { makeAutoObservable } from 'mobx';
import { v4 } from 'uuid';

import type { UUID } from '~/types';
import { Unit } from '~/types/Unit';


export type INewProductItem = Partial<ProductItemStore>

export type IProductItem = Pick<INewProductItem, 'id'|'name'|'qty'|'isBought'|'unit'>

export type IUpdateProductItem = Pick<INewProductItem, |'name'|'qty'|'isBought'|'unit'>


export class ProductItemStore {
    id: UUID

    name: string;

    qty: number;

    isBought: boolean;

    unit: Unit;

    constructor(product: INewProductItem = {}) {
        this.id = product.id || v4();
        this.isBought = product.isBought || false;
        this.name = product.name || '';
        this.qty = product.qty || 1;
        this.unit = product.unit || Unit.piece;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    update(product: IUpdateProductItem): void {
        Object.assign(this, product);
    }
}
