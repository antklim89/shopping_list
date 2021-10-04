import { makeAutoObservable } from 'mobx';

import type { ProductStore } from './ProductStore';

import { setProductsStorage } from '~/utils/storage';


export class CollectionStore {
    constructor(
        public id:string,
        public name:string,
        public productStore: ProductStore,
    ) {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setCurrentCollection(): void {
        this.productStore.currentCollectionId = this.id;
    }

    rename(newName: string): void {
        this.name = newName;

        setProductsStorage(this.id, { name: newName });
    }

    delete(): void {
        if (!this.canDelete) return;
        this.productStore.collections.remove(this);

        const [firstCollection] = this.productStore.collections;
        this.productStore.currentCollectionId = firstCollection.id;
    }

    get canDelete(): boolean {
        return this.productStore.collections.length > 1;
    }
}
