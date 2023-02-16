import { makeAutoObservable } from 'mobx';

import type { ProductStore } from './ProductStore';

import type { UUID } from '~/types';
import { removeCollectionFromStorage, setCollectionToStorage } from '~/utils';


export class CollectionStore {
    constructor(
        public id: UUID,
        public name: string,
        public productStore: ProductStore,
    ) {
        makeAutoObservable(this, {}, { autoBind: true });
    }


    toJSON(): Omit<this, 'productStore'> {
        const { productStore: _, ...rest } = this;
        return rest;
    }

    public select(): void {
        this.productStore.currentCollectionId = this.id;
    }

    public rename(newName: string): void {
        this.name = newName;

        setCollectionToStorage(this.id, { name: newName });
    }

    public delete(): void {
        if (!this.canDelete) return;
        this.productStore.collections.remove(this);

        const [firstCollection] = this.productStore.collections;
        this.productStore.currentCollectionId = firstCollection.id;
        removeCollectionFromStorage(this.id);
    }

    get canDelete(): boolean {
        return this.productStore.collections.length > 1;
    }
}
