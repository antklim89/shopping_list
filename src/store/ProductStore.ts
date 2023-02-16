import {
    autorun, IObservableArray, makeAutoObservable, observable, reaction, runInAction,
} from 'mobx';
import { v4 } from 'uuid';

import { CollectionStore } from './CollectionStore';
import { ProductItemStore } from './ProductItemStore';

import type { UUID } from '~/types';
import {
    getProductsFromFile,
    getCollectionIdFromUrl,
    getProductsFromUrl,
    getCollectionFromUrl,
    setCollectionToUrl,
    saveProductsToFile,
    getAllCollectionsFromStorage,
    getCurrentCollectionFromStorage,
    getCollectionFromStorage,
    setCurrentCollectionToStorage,
    setCollectionToStorage,
} from '~/utils';


export class ProductStore {
    constructor() {
        this.currentCollectionId = getCollectionIdFromUrl() || getCurrentCollectionFromStorage() || v4() as UUID;

        const urlProducts = getCollectionFromUrl();
        const storageProducts = getCollectionFromStorage(this.currentCollectionId);


        if (urlProducts) {
            this.fromUrl();
            setCollectionToStorage(this.currentCollectionId, { products: urlProducts.products });
        } else if (storageProducts) {
            this.fromLocalStorage();
            setCollectionToUrl({ products: storageProducts.products });
        } else {
            setCollectionToUrl({});
            setCollectionToStorage(this.currentCollectionId, {});
        }

        getAllCollectionsFromStorage().forEach(({ id, name }) => {
            this.collections.push(new CollectionStore(id, name, this));
        });

        makeAutoObservable(this, {}, { autoBind: true });

        autorun(() => {
            setCurrentCollectionToStorage(this.currentCollectionId);
            setCollectionToUrl({ id: this.currentCollectionId });
        });

        reaction(
            () => this.currentCollectionId,
            () => this.fromLocalStorage(),
        );

        reaction(
            () => JSON.stringify(this.products),
            () => {
                setCollectionToStorage(this.currentCollectionId, { products: this.products });
                setCollectionToUrl({ products: this.products });
            },
        );
    }

    public products: IObservableArray<ProductItemStore> = observable.array();

    public collections: IObservableArray<CollectionStore> = observable.array();

    public currentCollectionId: UUID;

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

    public addProduct(): void {
        this.products.unshift(new ProductItemStore({}, this));
    }

    public clearProducts(): void {
        this.products.clear();
    }

    public toggleAllBougth(): void {
        const isAllBougth = this.products.every((product) => product.isBought);
        this.products.forEach((product) => {
            product.isBought = !isAllBougth;
        });
    }

    public createCollection(name: string): void {
        const newCollectionStore = new CollectionStore(v4() as UUID, name, this);
        this.collections.unshift(newCollectionStore);
        setCollectionToStorage(newCollectionStore.id, { name });
        this.currentCollectionId = newCollectionStore.id;
        this.products.clear();
    }

    private fromLocalStorage(): void {
        try {
            const data = getCollectionFromStorage(this.currentCollectionId);
            if (!data) return;
            const productStores = data.products.map((product) => new ProductItemStore(product, this));
            this.products.replace(productStores);
        } catch (error) {
            console.error('Load from localStorage Error: \n', error);
        }
    }


    private fromUrl(): void {
        try {
            const productsList = getProductsFromUrl();

            if (!productsList || productsList.length === 0) {
                return;
            }

            const productsListStore = productsList.map((product) => new ProductItemStore(product, this));
            this.products.replace(productsListStore);
        } catch (error) {
            console.error('Load from url Error: \n');
        }
    }

    public async fromFile(files: FileList | null): Promise<void> {
        if (!files || files.length < 1) return;
        const [file] = files;
        if (file.type !== 'application/json' || !(/.*\.json$/i).test(file.name)) return;

        try {
            const fileProducts = await getProductsFromFile(file);
            runInAction(() => {
                const newCollectionStore = new CollectionStore(v4() as UUID, fileProducts.name, this);
                this.collections.push(newCollectionStore);
                setCollectionToStorage(
                    newCollectionStore.id,
                    { name: fileProducts.name, products: fileProducts.products },
                );
                this.currentCollectionId = newCollectionStore.id;

                const productStores = fileProducts.products.map((product) => new ProductItemStore(product, this));
                this.products.replace(productStores);
            });
        } catch (error) {
            console.error('Load from file error: \n', error);
        }
    }

    public toFile(): void {
        saveProductsToFile(this.currentCollection.name, this.products);
    }
}
