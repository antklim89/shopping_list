import chai, { expect } from 'chai';
import { v4 } from 'uuid';

import { ProductItemStore } from './ProductItemStore';
import { ProductStore } from './ProductStore';

import { CURRENT_COLLECTION_STORE_ID } from '~/constants';
import { setup } from '~/test.setup';


const storeIdFromStorage = 'aaa-aaa-aaa-aaa-aaa';
const storeIdNotFromStorage = 'bbb-aaa-aaa-aaa-aaa';
const storeIdFromURL = 'ccc-aaa-aaa-aaa-aaa';

const productFromStorage = new ProductItemStore({ name: 'fromStorage' });
const productFromURL = new ProductItemStore({ name: 'fromURL' });


describe('ProductStore', () => {
    beforeEach(setup);

    describe('constructor', () => {
        it('in localStorage', () => {
            localStorage.setItem(storeIdFromStorage, JSON.stringify({ name: '', products: [] }));
            localStorage.setItem(CURRENT_COLLECTION_STORE_ID, storeIdFromStorage);

            const store = new ProductStore();

            expect(store.currentCollection.id).eq(storeIdFromStorage);
            expect(store.collections.length).eq(3);
        });

        it('not in localStorage', () => {
            localStorage.setItem(CURRENT_COLLECTION_STORE_ID, storeIdNotFromStorage);
            const store = new ProductStore();

            expect(store.currentCollection.id).eq(storeIdNotFromStorage);
        });

        it('from URL', () => {
            const searchParams = new URLSearchParams('');
            searchParams.set('id', storeIdFromURL);

            history.pushState(null, '', `?${searchParams}`);
            const store = new ProductStore();

            expect(store.currentCollection.id).eq(storeIdFromURL);
        });

        it('get products from local storage', () => {
            localStorage.setItem(
                storeIdFromStorage,
                JSON.stringify({ name: 'new product', products: [productFromStorage] }),
            );
            localStorage.setItem(CURRENT_COLLECTION_STORE_ID, storeIdFromStorage);

            const store = new ProductStore();

            expect(store.products).to.have.length(1);
            expect(store.products[0]).to.have.property('id', productFromStorage.id);
            expect(store.products[0]).to.have.property('name', productFromStorage.name);
            expect(store.products[0]).to.have.property('qty', productFromStorage.qty);
            expect(store.products[0]).to.have.property('unit', productFromStorage.unit);
            expect(store.products[0]).to.have.property('isBought', productFromStorage.isBought);
        });

        it('get products from url', () => {
            const base64Products = new URLSearchParams('');
            base64Products.set('products', btoa(JSON.stringify([productFromURL])));
            base64Products.set('id', 'url-xxx-xxx-xxx-xxx');
            history.pushState(null, '', `?${base64Products}`);

            const store = new ProductStore();

            expect(store.products).to.have.length(1);
            expect(store.collections).to.have.length(3);
            expect(store.products[0]).to.have.property('id', productFromURL.id);
        });
    });
});
