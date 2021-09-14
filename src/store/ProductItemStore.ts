import { makeAutoObservable } from 'mobx';

import type { IProductItem, NewProductItem, UpdateProductItem } from '../types/IProductItem';
import type { Unit } from '../types/Unit';


export class ProductItemStore implements IProductItem {
    id: number

    name: string;

    qty: number;

    isBought = false;

    unit: Unit;

    constructor(product: NewProductItem) {
        this.id = Math.random();
        this.name = product.name;
        this.qty = product.qty;
        this.unit = product.unit;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    update(product: UpdateProductItem): void {
        Object.assign(this, product);
    }
}
