/* eslint-disable no-use-before-define */
import { makeAutoObservable } from 'mobx';
import { v4 } from 'uuid';

import type { ProductStore } from './ProductStore';

import type { UUID } from '~/types';
import { Unit } from '~/types/Unit';


export type INewProductItem = Partial<ProductItemStore>

export type IProductItem = Pick<INewProductItem, 'id' | 'name' | 'qty' | 'isBought' | 'unit'>

export type IUpdateProductItem = Pick<INewProductItem, | 'name' | 'qty' | 'isBought' | 'unit'>


export class ProductItemStore {
    id: UUID;

    name: string;

    qty: number;

    isBought: boolean;

    unit: Unit;

    constructor(product: INewProductItem, public productStore: ProductStore) {
        this.id = product.id || v4() as UUID;
        this.isBought = product.isBought || false;
        this.name = product.name || '';
        this.qty = product.qty || 1;
        this.unit = product.unit || Unit.piece;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    public toJSON(): IProductItem {
        const { id, name, qty, isBought, unit } = this;
        return { id, name, qty, isBought, unit };
    }

    public update(product: IUpdateProductItem): void {
        Object.assign(this, product);
    }

    public remove(): void {
        this.productStore.products.remove(this);
    }
}
