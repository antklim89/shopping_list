import { IObservableArray, makeAutoObservable, observable } from 'mobx';
import { v4 } from 'uuid';

import { CURRENT_COLLECTION_STORE_NAME, STORE_NAME } from './ProductStore';

import type { CollectionName } from '~/types/CollectionName';


export class CollectionStore {
    constructor() {
        const currentCollection = localStorage.getItem(CURRENT_COLLECTION_STORE_NAME);

        if (currentCollection) {
            const [key, name, id] = currentCollection.split(':');

            this.name = name;
            this.id = id;
            this.key = key as typeof STORE_NAME;
        } else {
            this.name = 'New collection';
            this.id = v4();
            this.key = STORE_NAME;

            this.storeNames.push(this.storeName);
        }


        this.setCollectionToStorage();
        this.getCollectionNamesFromStorage();

        makeAutoObservable(this, {}, { autoBind: true });
    }

    readonly storeNames: IObservableArray<CollectionName> = observable.array()

    readonly key: typeof STORE_NAME;

    public name: string;

    public id: string;

    public get storeName():CollectionName {
        return `${this.key}:${this.name}:${this.id}`;
    }

    public setCollectionToStorage(): void {
        localStorage.setItem(CURRENT_COLLECTION_STORE_NAME, this.storeName);
    }

    private getCollectionNamesFromStorage() {
        for (let index = 0; index < localStorage.length; index += 1) {
            const storeKey = localStorage.key(index);
            if (storeKey && storeKey.startsWith(STORE_NAME)) {
                this.storeNames.push(storeKey as CollectionName);
            }
        }
    }

    add(newCollectionName: string): void {
        if (newCollectionName.length < 2) return;
        this.name = newCollectionName;
        this.id = v4();
        this.storeNames.push(this.storeName);
        localStorage.setItem(this.storeName, 'W10=');
        window.history.replaceState(null, '', '#W10=');
    }

    select(storeName: CollectionName): void {
        const [, name, id] = storeName.split(':');
        this.name = name;
        this.id = id;
    }

    rename(storeName: CollectionName, newName: string): void {
        const prev = localStorage.getItem(storeName);
        localStorage.removeItem(storeName);
        this.name = newName;
        this.storeNames.splice(this.storeNames.findIndex((idx) => idx === storeName), 1, this.storeName);
        localStorage.setItem(this.storeName, prev || '');
    }
}
