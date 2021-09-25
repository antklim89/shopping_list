import { IObservableArray, makeAutoObservable, observable, runInAction } from 'mobx';
import { v4 } from 'uuid';

import { IProductItem, ProductItemStore } from './ProductItemStore';

import type { CollectionName } from '~/types/CollectionName';


export const STORE_NAME = 'SHOPPING_LIST';
const CURRENT_COLLECTION_STORE_NAME = 'CURRENT_COLLECTION';

export class ProductListStore {
    constructor() {
        this.getCurrentCollectionFromStorage();

        this.fromLocalStorage();
        this.fromUrl();

        this.getCollectionNamesFromStorage();

        makeAutoObservable(this, {}, { autoBind: true });
    }

    products: IObservableArray<ProductItemStore> = observable.array()

    currentCollection: CollectionName = `${STORE_NAME}:New collection:${v4()}`;

    collectionNames: IObservableArray<CollectionName> = observable.array()


    get base64Products(): string {
        const productsString = JSON.stringify(this.products);
        return btoa(productsString);
    }

    addProduct(): void {
        this.products.unshift(new ProductItemStore());
    }

    removeProduct(product: ProductItemStore): void {
        this.products.remove(product);
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

    async fromFile(files: FileList | null): Promise<void> {
        if (!files || files.length < 1) return;
        const [file] = files;
        if (file.type !== 'application/json' || !(/.*\.json$/i).test(file.name)) return;
        try {
            const fileText = await file.text();
            const fileJson: IProductItem[] = JSON.parse(fileText);
            const products = fileJson.map((product) => new ProductItemStore(product));
            runInAction(() => this.products.replace(products));

        } catch (error) {
            console.error('Load from file Error: \n', error);
        }
    }

    toFile(): void {
        const blob = new Blob([JSON.stringify(this.products)]);
        const fileName = `Product List - ${new Date()}.json`;

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.append(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(link.href), 7000);
    }

    fromLocalStorage(): void {
        const productsBase64 = localStorage.getItem(this.currentCollection);
        if (!productsBase64) {
            localStorage.setItem(this.currentCollection, 'W10=');
            return;
        }
        try {
            const productsJSONString = atob(productsBase64);
            const productsObjects: IProductItem[] = JSON.parse(productsJSONString);
            const products = productsObjects.map((prod) => new ProductItemStore(prod));
            this.products.replace(products);
        } catch (error) {
            console.error('Load from localStorage Error: \n');
        }
    }

    toLocalStorage(): void {
        localStorage.setItem(this.currentCollection, this.base64Products);
    }


    fromUrl(): void {
        const base64 = location.hash.substring(1);
        if (base64.length === 0) {
            window.history.replaceState(null, '', '#W10=');
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

    toUrl(): void {
        window.history.replaceState(null, '', `#${this.base64Products}`);
    }


    private getCollectionNamesFromStorage() {
        let index = 0;
        let storeKey = localStorage.key(0);
        while (storeKey) {
            if (storeKey.startsWith(STORE_NAME)) {
                this.collectionNames.push(storeKey as CollectionName);
            }
            index += 1;
            storeKey = localStorage.key(index);
        }
    }

    getCurrentCollectionFromStorage(): void {
        const currentCollection = localStorage.getItem(CURRENT_COLLECTION_STORE_NAME) as CollectionName | null;
        if (currentCollection) {
            this.currentCollection = currentCollection;
        } else {
            this.setCurrentCollectionStorage();
            this.addCollection(this.currentCollection);
        }
    }

    setCurrentCollectionStorage(): void {
        localStorage.setItem(CURRENT_COLLECTION_STORE_NAME, this.currentCollection);
    }

    addCollection(newCollectionName: string): void {
        if (newCollectionName.length < 2) return;
        this.currentCollection = `${STORE_NAME}:${newCollectionName}:${v4()}`;
        this.collectionNames.push(this.currentCollection);
        this.products.clear();
        localStorage.setItem(this.currentCollection, 'W10=');
        window.history.replaceState(null, '', '#W10=');
    }

    removeCollection(collectionName: CollectionName): void {
        if (this.collectionNames.length < 2) return;
        localStorage.removeItem(collectionName);
        this.collectionNames.remove(collectionName);

        const [firstCollection] = this.collectionNames;
        this.currentCollection = firstCollection;
    }

    renameCollection(newCollectionName: string): void {
        localStorage.removeItem(CURRENT_COLLECTION_STORE_NAME);
        this.currentCollection = `${STORE_NAME}:${newCollectionName}:${v4()}`;
        localStorage.setItem(CURRENT_COLLECTION_STORE_NAME, this.currentCollection);
    }

    selectCollection(collectionName: CollectionName): void {
        this.currentCollection = collectionName;
        this.fromLocalStorage();
    }
}
