import { reaction, toJS } from 'mobx';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { ProductItemStore } from './ProductItemStore';
import { ProductStore } from './ProductStore';

import { setup } from '~/test.setup';
import {
    getCollectionIdFromUrl,
    getProductsFromUrl,
    setCollectionToUrl,
    getCurrentCollectionFromStorage,
    getCollectionFromStorage,
    setCollectionToStorage,
    setCurrentCollectionToStorage,
} from '~/utils';


const storeIdFromStorage = 'aaa-aaa-aaa-aaa-aaa';
const storeIdNotFromStorage = 'bbb-aaa-aaa-aaa-aaa';
const storeIdFromURL = 'ccc-aaa-aaa-aaa-aaa';

const productFromStorage = new ProductItemStore({ name: 'fromStorage' }, {} as ProductStore);
const productFromURL = new ProductItemStore({ name: 'fromURL' }, {} as ProductStore);


describe('ProductStore', () => {
    beforeEach(setup);

    describe('constructor', () => {
        beforeEach(setup);
        it('normal init', () => {
            localStorage.clear();
            history.pushState(null, '', '/');
            const store = new ProductStore();

            expect(store.collections).toHaveLength(1);
        });

        it('in localStorage', () => {
            setCollectionToStorage(storeIdFromStorage, {});
            setCurrentCollectionToStorage(storeIdFromStorage);

            const store = new ProductStore();

            expect(store.currentCollection.id).toEqual(storeIdFromStorage);
            expect(store.collections.length).toEqual(4);
        });

        it('not in localStorage', () => {
            setCurrentCollectionToStorage(storeIdNotFromStorage);
            const store = new ProductStore();

            expect(store.currentCollection.id).toEqual(storeIdNotFromStorage);
        });

        it('from URL', () => {
            history.pushState(null, '', `#${btoa(JSON.stringify({ id: storeIdFromURL, products: [] }))}`);
            const store = new ProductStore();

            expect(store.currentCollection.id).toEqual(storeIdFromURL);
        });

        it('get products from local storage', () => {
            setCollectionToStorage(storeIdFromStorage, {
                id: storeIdFromStorage,
                name: 'new product',
                products: [productFromStorage],
            });
            setCurrentCollectionToStorage(storeIdFromStorage);

            const store = new ProductStore();

            expect(store.products).toHaveLength(1);
            expect(store.products[0]).toHaveProperty('id', productFromStorage.id);
            expect(store.products[0]).toHaveProperty('name', productFromStorage.name);
            expect(store.products[0]).toHaveProperty('qty', productFromStorage.qty);
            expect(store.products[0]).toHaveProperty('unit', productFromStorage.unit);
            expect(store.products[0]).toHaveProperty('isBought', productFromStorage.isBought);
        });

        it('get products from url', () => {
            setCollectionToUrl({ id: 'url-xxx-xxx-xxx-xxx', products: [productFromURL] });

            const store = new ProductStore();

            expect(store.products).toHaveLength(1);
            expect(store.collections).toHaveLength(4);
            expect(store.products[0]).toHaveProperty('id', productFromURL.id);
        });
    });

    it('#createCollection', () => {
        const react = vi.fn();

        const store = new ProductStore();

        reaction(() => store.currentCollection, react);
        const newCollectionName = 'NEW_COLLECTION';

        store.createCollection(newCollectionName);

        expect(getProductsFromUrl()).toHaveLength(0);
        expect(store.products).toHaveLength(0);
        expect(store.collections).toHaveLength(4);
        const newCollection = store.collections.find((col) => col.name === newCollectionName);

        expect(newCollection).not.toBeNull();
        if (!newCollection) throw new Error('ERRROR');

        expect(store.currentCollectionId).toEqual(newCollection.id);
        expect(store.currentCollection.name).toEqual(newCollectionName);
        expect(newCollection.id).toEqual(getCurrentCollectionFromStorage());
        expect(newCollection.id).toEqual(getCollectionIdFromUrl());

        expect(react).toHaveBeenCalledTimes(1);
    });

    it('#addProduct', () => {
        const react = vi.fn();

        const store = new ProductStore();

        reaction(() => toJS(store.products), react);

        expect(getCollectionFromStorage(store.currentCollectionId)?.products).toHaveLength(1);
        expect(getProductsFromUrl()).toHaveLength(1);

        store.addProduct();
        expect(store.products).toHaveLength(2);
        expect(getCollectionFromStorage(store.currentCollectionId)?.products).toHaveLength(2);
        expect(getProductsFromUrl()).toHaveLength(2);

        expect(react).toHaveBeenCalledTimes(1);
    });

    it('#clearProducts', () => {
        const react = vi.fn();

        const store = new ProductStore();

        reaction(() => toJS(store.products), react);

        expect(getCollectionFromStorage(store.currentCollectionId)?.products).toHaveLength(1);
        expect(store.products).toHaveLength(1);
        store.addProduct();
        store.addProduct();

        expect(getCollectionFromStorage(store.currentCollectionId)?.products).toHaveLength(3);
        expect(store.products).toHaveLength(3);

        store.clearProducts();

        expect(getCollectionFromStorage(store.currentCollectionId)?.products).toHaveLength(0);
        expect(store.products).toHaveLength(0);
        expect(react).toHaveBeenCalledTimes(3);
    });

    it('#toggleAllBougth', () => {
        const store = new ProductStore();

        store.addProduct();
        store.addProduct();

        store.products[1].update({ isBought: true });
        expect(store.products.every((prod) => prod.isBought)).toBeFalsy();

        store.toggleAllBougth();
        expect(store.products.every((prod) => prod.isBought)).toBeTruthy();

        store.toggleAllBougth();
        expect(store.products.every((prod) => prod.isBought)).toBeFalsy();
    });
});
