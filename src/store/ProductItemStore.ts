import { makeAutoObservable } from 'mobx';

import { IProductItem, NewProductItem } from '../types/IProductItem';
import { Unit } from '../types/Unit';


export class ProductItemStore implements IProductItem {
    id: number

    name: string;

    qty: number;

    unit: Unit;

    constructor(product: NewProductItem) {
        this.id = Math.random();
        this.name = product.name;
        this.qty = product.qty;
        this.unit = product.unit;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    update(product: Partial<NewProductItem>): void {
        Object.assign(this, product);
    }
}
