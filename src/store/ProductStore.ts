import { autorun, IObservableArray, makeAutoObservable, observable, reaction } from 'mobx';
import { v4 } from 'uuid';

import { CollectionStore } from './CollectionStore';
import { ProductItemStore } from './ProductItemStore';

import type { UUID } from '~/types';
import { getIdSearchParam, getProductsSearchParam, isUUID, setSearchParams } from '~/utils';
import {
    getCurrentCollectionStorage,
    getProductsFromStorage,
    setCurrentCollectionStorage,
    setProductsStorage,
} from '~/utils/storage';


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


        this.currentCollectionId = getIdSearchParam()
            || getCurrentCollectionStorage()
            || this.collections[0].id
            || v4();

        this.fromLocalStorage();
        this.fromUrl();

        makeAutoObservable(this, {}, { autoBind: true });

        autorun(() => {
            setCurrentCollectionStorage(this.currentCollectionId);
            setSearchParams({ id: this.currentCollectionId });
        });

        reaction(
            () => this.currentCollectionId,
            () => this.fromLocalStorage(),
        );
    }

    public products: IObservableArray<ProductItemStore> = observable.array()

    public collections: IObservableArray<CollectionStore> = observable.array()

    public currentCollectionId: UUID

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

    createCollection(name: string): void {
        const newCollectionStore = new CollectionStore(v4(), name, this);
        this.collections.push(newCollectionStore);
        this.currentCollectionId = newCollectionStore.id;
    }

    private fromLocalStorage(): void {
        try {
            const data = getProductsFromStorage(this.currentCollection.id);

            if (!data) {
                setProductsStorage(this.currentCollection.id, {});
                return;
            }

            const productStores = data.products.map((prod) => new ProductItemStore(prod));
            this.products.replace(productStores);
        } catch (error) {
            console.error('Load from localStorage Error: \n', error);
        }
    }


    private fromUrl(): void {
        try {
            const productsList = getProductsSearchParam();
            if (!productsList || productsList.length === 0) {
                setSearchParams({ products: [] });
                return;
            }
            const productsListStore = productsList.map((product) => new ProductItemStore(product));
            this.products.replace(productsListStore);
        } catch (error) {
            console.error('Load from url Error: \n');
        }
    }
}
