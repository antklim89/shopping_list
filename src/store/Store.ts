import { IObservableArray, makeAutoObservable, observable } from 'mobx';

import { IProductItem } from '../types/IProductItem';
import { Unit } from '../types/Unit';

import { ProductItemStore } from './ProductItemStore';


function getProductsFromLocalstorage(): IObservableArray<ProductItemStore> {
    const productsString = localStorage.getItem('store');
    if (!productsString) return observable.array();
    const productsObjects: IProductItem[] = JSON.parse(productsString);
    const products = productsObjects.map((p) => new ProductItemStore(p));
    return observable.array(products);
}

export class Store {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    products = getProductsFromLocalstorage()

    addProduct(): void {
        this.products.push(new ProductItemStore({
            name: 'New product',
            qty: 1,
            unit: Unit.piece,
        }));
    }

    removeProduct(product: ProductItemStore): void {
        this.products.remove(product);
    }
}
