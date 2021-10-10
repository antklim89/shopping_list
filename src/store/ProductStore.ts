import {
    autorun, IObservableArray, makeAutoObservable, observable, reaction, runInAction,
} from 'mobx';
import { v4 } from 'uuid';

import { CollectionStore } from './CollectionStore';
import { ProductItemStore } from './ProductItemStore';

import type { UUID } from '~/types';
import {
    getProductsFromFile,
    getIdSearchParam,
    getProductsSearchParam,
    getSearchParam,
    isUUID,
    setSearchParams,
    saveProductsToFile,
} from '~/utils';
import {
    getCurrentCollectionStorage,
    getFromStorage,
    setCurrentCollectionStorage,
    setStorage,
} from '~/utils/storage';


export class ProductStore {
    constructor() {
        this.currentCollectionId = getIdSearchParam() || getCurrentCollectionStorage() || v4();

        const searchParams = getSearchParam();
        const storage = getFromStorage(this.currentCollectionId);


        if (searchParams) {
            this.fromUrl();
            setStorage(this.currentCollectionId, { products: searchParams.products });
        } else if (storage) {
            this.fromLocalStorage();
            setSearchParams({ products: storage.products });
        } else {
            setSearchParams({});
            setStorage(this.currentCollectionId, {});
        }

        this.initCollections();

        makeAutoObservable(this, {}, { autoBind: true });

        autorun(() => {
            setCurrentCollectionStorage(this.currentCollectionId);
            setSearchParams({ id: this.currentCollectionId });
        });

        reaction(
            () => this.currentCollectionId,
            () => this.fromLocalStorage(),
        );

        reaction(
            () => JSON.stringify(this.products),
            () => {
                setStorage(this.currentCollectionId, { products: this.products });
                setSearchParams({ products: this.products });
            },
        );
    }

    private initCollections(): void {
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

    addProduct(): void {
        this.products.unshift(new ProductItemStore({}, this));
    }

    clearProducts(): void {
        this.products.clear();
    }

    toggleAllBougth(): void {
        const isAllBougth = this.products.every((product) => product.isBought);
        this.products.forEach((product) => {
            product.isBought = !isAllBougth;
        });
    }

    createCollection(name: string): void {
        const newCollectionStore = new CollectionStore(v4(), name, this);
        this.collections.unshift(newCollectionStore);
        setStorage(newCollectionStore.id, { name });
        this.currentCollectionId = newCollectionStore.id;
        this.products.clear();
    }

    private fromLocalStorage(): void {
        try {
            const data = getFromStorage(this.currentCollectionId);
            if (!data) return;
            const productStores = data.products.map((product) => new ProductItemStore(product, this));
            this.products.replace(productStores);
        } catch (error) {
            console.error('Load from localStorage Error: \n', error);
        }
    }


    private fromUrl(): void {
        try {
            const productsList = getProductsSearchParam();

            if (!productsList || productsList.length === 0) {
                return;
            }

            const productsListStore = productsList.map((product) => new ProductItemStore(product, this));
            this.products.replace(productsListStore);
        } catch (error) {
            console.error('Load from url Error: \n');
        }
    }

    async fromFile(files: FileList | null): Promise<void> {
        if (!files || files.length < 1) return;
        const [file] = files;
        if (file.type !== 'application/json' || !(/.*\.json$/i).test(file.name)) return;

        try {
            const fileProducts = await getProductsFromFile(file);
            runInAction(() => {
                const newCollectionStore = new CollectionStore(v4(), fileProducts.name, this);
                this.collections.push(newCollectionStore);
                setStorage(newCollectionStore.id, { name: fileProducts.name, products: fileProducts.products });
                this.currentCollectionId = newCollectionStore.id;

                const productStores = fileProducts.products.map((product) => new ProductItemStore(product, this));
                this.products.replace(productStores);
            });
        } catch (error) {
            console.error('Load from file error: \n', error);
        }
    }

    toFile(): void {
        saveProductsToFile(this.currentCollection.name, this.products);
    }
}
