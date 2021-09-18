import { IObservableArray, makeAutoObservable, observable, runInAction } from 'mobx';

import { IProductItem, ProductItemStore } from './ProductItemStore';


export class ProductListStore {

    constructor() {
        const productsString = localStorage.getItem('store');
        const productsObjects: IProductItem[] = productsString ? JSON.parse(productsString) : [];
        const products = productsObjects.map((prod) => new ProductItemStore(prod));
        this.products = observable.array(products);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    products: IObservableArray<ProductItemStore>

    addProduct(): void {
        this.products.unshift(new ProductItemStore());
    }

    removeProduct(product: ProductItemStore): void {
        this.products.remove(product);
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
        if (!files) return;
        const [file] = files;
        try {
            const fileText = await file.text();
            const fileJson: IProductItem[] = JSON.parse(fileText);
            const products = fileJson.map((product) => new ProductItemStore(product));
            runInAction(() => this.products.replace(products));

        } catch (error) {
            console.error('File upload error:', error);
        }
    }
}
