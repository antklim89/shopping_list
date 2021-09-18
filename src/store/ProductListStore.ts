import { IObservableArray, makeAutoObservable, observable, runInAction } from 'mobx';

import { IProductItem, ProductItemStore } from './ProductItemStore';


export class ProductListStore {

    constructor() {
        this.fromLocalStorage();
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
            console.error('File upload error:', error);
        }
    }

    fromLocalStorage(): void {
        const productsString = localStorage.getItem('store');
        const productsObjects: IProductItem[] = productsString ? JSON.parse(productsString) : [];
        const products = productsObjects.map((prod) => new ProductItemStore(prod));
        this.products.replace(products);
    }

    toLocalStorage(): void {
        const productsString = JSON.stringify(this.products);
        localStorage.setItem('store', productsString);
    }
}
