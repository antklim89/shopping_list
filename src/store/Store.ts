import { IObservableArray, makeAutoObservable, observable } from 'mobx';

import { ProductItemStore } from './ProductItemStore';

import type { IProductItem } from '~/types/IProductItem';
import { Unit } from '~/types/Unit';


function getProductsFromLocalstorage(): IObservableArray<ProductItemStore> {
    const productsString = localStorage.getItem('store');
    if (!productsString) return observable.array();
    const productsObjects: IProductItem[] = JSON.parse(productsString);
    const products = productsObjects.map((prod) => new ProductItemStore(prod));
    return observable.array(products);
}

export class PropductStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    products = getProductsFromLocalstorage()

    addProduct(): void {
        this.products.unshift(new ProductItemStore({
            name: '',
            qty: 1,
            unit: Unit.piece,
        }));
    }

    removeProduct(product: ProductItemStore): void {
        this.products.remove(product);
    }
}
