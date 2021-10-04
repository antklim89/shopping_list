import { autorun, IObservableArray, makeAutoObservable, observable } from 'mobx';
import { v4 } from 'uuid';

import { CollectionStore } from './CollectionStore';
import { IProductItem, ProductItemStore } from './ProductItemStore';

import { CURRENT_COLLECTION_STORE_ID } from '~/constants';
import isUUID from '~/utils/isUUID';


export class ProductStore {
    constructor() {
        for (let index = 0; index < localStorage.length; index += 1) {
            const storeId = localStorage.key(index);
            if (!isUUID(storeId)) continue;
            const productsString = localStorage.getItem(storeId);
            if (!productsString) continue;

            try {
                const data = JSON.parse(productsString);
                if ('name' in data && 'products' in data) {
                    this.collections.push(new CollectionStore(storeId, data.name, this));
                }
            } catch (error) {
                continue;
            }
        }

        this.currentCollectionId = new URLSearchParams(location.search).get('id')
            || localStorage.getItem(CURRENT_COLLECTION_STORE_ID)
            || this.collections[0].id
            || v4();

        this.fromLocalStorage();
        this.fromUrl();

        makeAutoObservable(this, {}, { autoBind: true });

        autorun(() => {
            localStorage.setItem(CURRENT_COLLECTION_STORE_ID, this.currentCollectionId);
        });
    }

    public products: IObservableArray<ProductItemStore> = observable.array()

    public collections: CollectionStore[] = observable.array()

    public currentCollectionId: string

    public get currentCollection(): CollectionStore {
        const currentCollection = this.collections.find((collection) => (
            collection.id === this.currentCollectionId
        ));

        if (!currentCollection) {
            const id = this.currentCollectionId;
            const newCurrentCollection = new CollectionStore(id, 'Products collection', this);
            this.collections.push(newCurrentCollection);
            return newCurrentCollection;
        }

        return currentCollection;
    }


    private fromLocalStorage(): void {
        const productsString = localStorage.getItem(this.currentCollection.id);
        if (!productsString) {
            localStorage.setItem(
                this.currentCollection.id,
                JSON.stringify({ name: '', products: [] }),
            );
            return;
        }
        try {
            const { products }: {products: IProductItem[]} = JSON.parse(productsString);
            const productStores = products.map((prod) => new ProductItemStore(prod));
            this.products.replace(productStores);
        } catch (error) {
            console.error('Load from localStorage Error: \n', error);
        }
    }

    private toLocalStorage(): void {
        localStorage.setItem(this.currentCollection.id, JSON.stringify(this.products));
    }

    private fromUrl(): void {
        const base64 = new URLSearchParams(location.search).get('products');
        if (!base64 || base64.length === 0) {
            window.history.replaceState(null, '', btoa('[]'));
            return;
        }
        try {
            const productsString = atob(base64);
            const productsList: IProductItem[] = JSON.parse(productsString);
            const productsListStore = productsList.map((product) => new ProductItemStore(product));
            this.products.replace(productsListStore);
        } catch (error) {
            console.error('Load from url Error: \n');
        }
    }

    private toUrl(): void {
        window.history.replaceState(null, '', `#${btoa(JSON.stringify(this.products))}`);
    }
}
