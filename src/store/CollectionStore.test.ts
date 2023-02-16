import { reaction } from 'mobx';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { ProductStore } from './ProductStore';

import { CURRENT_COLLECTION_STORE_ID } from '~/constants';
import { setup } from '~/test.setup';
import { getCollectionIdFromUrl, getCollectionFromStorage } from '~/utils';


describe('CollectionStore', () => {
    beforeEach(setup);

    it('#select', () => {
        const react = vi.fn();

        const store = new ProductStore();
        const [firstCollectionStore, secondCollectionStore, thirdCollectionStore] = store.collections;

        reaction(() => store.currentCollection, react);

        expect(store.products[0].name).toEqual(firstCollectionStore.name);

        secondCollectionStore.select();
        expect(store.products[0].name).toEqual(secondCollectionStore.name);
        expect(secondCollectionStore).toEqual(store.currentCollection);
        expect(secondCollectionStore.id).toEqual(store.currentCollection.id);
        expect(localStorage.getItem(CURRENT_COLLECTION_STORE_ID)).toEqual(store.currentCollection.id);
        expect(getCollectionIdFromUrl()).toEqual(store.currentCollection.id);

        thirdCollectionStore.select();
        expect(store.products[0].name).toEqual(thirdCollectionStore.name);
        expect(thirdCollectionStore).toEqual(store.currentCollection);
        expect(thirdCollectionStore.id).toEqual(store.currentCollection.id);
        expect(localStorage.getItem(CURRENT_COLLECTION_STORE_ID)).toEqual(store.currentCollection.id);
        expect(getCollectionIdFromUrl()).toEqual(store.currentCollection.id);

        expect(react).toHaveBeenCalledTimes(2);
    });

    it('#rename', () => {
        const react = vi.fn();

        const store = new ProductStore();
        const [collectionStore] = store.collections;

        reaction(() => collectionStore.name, react);

        const newName = 'NEW_NAME';
        collectionStore.rename(newName);

        expect(react).toHaveBeenCalledTimes(1);
        expect(collectionStore.name).toEqual(newName);
        expect(getCollectionFromStorage(collectionStore.id)).toHaveProperty('name', newName);
    });

    it('#delete', () => {
        const react = vi.fn();
        const store = new ProductStore();

        reaction(() => store.collections.length, react);

        const { currentCollection } = store;
        currentCollection.delete();

        expect(getCollectionFromStorage(currentCollection.id)).toBeNull();
        expect(currentCollection.id).not.toEqual(store.currentCollection.id);
        expect(store.collections.length).toEqual(2);

        const [firstCollectionStore, secondCollectionStore] = store.collections;
        expect(firstCollectionStore.canDelete).toBeTruthy();

        firstCollectionStore.delete();
        expect(store.collections.length).toEqual(1);
        expect(firstCollectionStore.canDelete).toBeFalsy();
        expect(getCollectionFromStorage(firstCollectionStore.id)).toBeNull();

        secondCollectionStore.delete();
        expect(store.collections.length).toEqual(1);
        expect(getCollectionFromStorage(secondCollectionStore.id)).not.toBeNull();


        expect(react).toHaveBeenCalledTimes(2);
    });
});
