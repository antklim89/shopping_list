import { makeAutoObservable } from 'mobx';

import type { ProductStore } from './ProductStore';


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
}
