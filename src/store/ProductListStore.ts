import { IObservableArray, makeAutoObservable, observable, runInAction } from 'mobx';
import { v4 } from 'uuid';

import { IProductItem, ProductItemStore } from './ProductItemStore';


const STORE_NAME = 'SHOPPING_LIST';
const CURRENT_LIST_STORE_NAME = 'CURRENT_LIST';

export class ProductListStore {

    constructor() {
        this.getCurrentList();

        this.fromLocalStorage();
        this.fromUrl();

        this.getLists();

        makeAutoObservable(this, {}, { autoBind: true });
    }

    products: IObservableArray<ProductItemStore> = observable.array()


    addProduct(): void {
        this.products.unshift(new ProductItemStore());
    }

    removeProduct(product: ProductItemStore): void {
        this.products.remove(product);
    }

    clearList(): void {
        this.products.clear();
    }

    toggleBougth(): void {
        const isAllBougth = this.products.every((product) => product.isBought);
        this.products.forEach((product) => {
            product.isBought = !isAllBougth;
        });
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

    fromLocalStorage(): void {
        const productsBase64 = localStorage.getItem(`${this.currentList}`);
        if (!productsBase64 || productsBase64.length === 0) {
            this.toLocalStorage();
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
        localStorage.setItem(`${this.currentList}`, this.base64Products);
    }

    toUrl(): void {
        window.history.replaceState(null, '', `#${this.base64Products}`);
    }

    fromUrl(): void {
        const base64 = location.hash.substring(1);
        if (base64.length === 0) {
            this.toUrl();
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

    get base64Products(): string {
        const productsString = JSON.stringify(this.products);
        return btoa(productsString);
    }


    currentList = `${STORE_NAME}:New list:${v4()}`;

    lists: IObservableArray<string> = observable.array()

    private getLists() {
        let index = 0;
        let storeKey = localStorage.key(0);
        while (storeKey) {
            if (storeKey.startsWith(STORE_NAME)) {
                this.lists.push(storeKey);
            }
            index += 1;
            storeKey = localStorage.key(index);
        }
    }

    getCurrentList(): void {
        const currentList = localStorage.getItem(CURRENT_LIST_STORE_NAME);
        if (currentList) {
            this.currentList = currentList;
        } else {
            this.setCurrentList();
        }
    }

    setCurrentList(): void {
        localStorage.setItem(CURRENT_LIST_STORE_NAME, `${this.currentList}`);
    }

    addList(name: string): void {
        this.currentList = `${STORE_NAME}:${name}:${v4()}`;
        this.products.clear();
    }
}
