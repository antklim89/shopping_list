import {
    autorun, IObservableArray, makeAutoObservable, observable, reaction, runInAction,
} from 'mobx';
import { v4 } from 'uuid';

import { CollectionStore } from './CollectionStore';
import { IProductItem, ProductItemStore } from './ProductItemStore';

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

    addProduct(): void {
        this.products.unshift(new ProductItemStore());
    }

    // removeProduct(product: ProductItemStore): void {
    //     this.products.remove(product);
    // }

    clearProducts(): void {
        this.products.clear();
    }


    // toggleAllBougth(): void {
    //     const isAllBougth = this.products.every((product) => product.isBought);
    //     this.products.forEach((product) => {
    //         product.isBought = !isAllBougth;
    //     });
    // }

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
}
