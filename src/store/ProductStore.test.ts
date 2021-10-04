/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import { reaction, toJS } from 'mobx';

import { ProductItemStore } from './ProductItemStore';
import { ProductStore } from './ProductStore';

import { CURRENT_COLLECTION_STORE_ID } from '~/constants';
import { setup } from '~/test.setup';
import { getIdSearchParam } from '~/utils';
import { getCurrentCollectionStorage } from '~/utils/storage';


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
            expect(store.collections.length).eq(4);
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
            expect(store.collections).to.have.length(4);
            expect(store.products[0]).to.have.property('id', productFromURL.id);
        });
    });

    it('#createCollection', () => {
        const react = chai.spy();

        const store = new ProductStore();

        reaction(() => store.currentCollection, react);
        const newCollectionName = 'NEW_COLLECTION';

        store.createCollection(newCollectionName);

        expect(store.collections).to.have.length(4);
        const newCollection = store.collections.find((col) => col.name === newCollectionName);

        expect(newCollection).not.null;
        if (!newCollection) throw new Error('ERRROR');

        expect(store.currentCollectionId).to.eq(newCollection.id);
        expect(store.currentCollection.name).to.eq(newCollectionName);
        expect(newCollection.id).to.eq(getCurrentCollectionStorage());
        expect(newCollection.id).to.eq(getIdSearchParam());

        expect(react).to.have.been.called.exactly(1);
    });

    it('#addProduct', () => {
        const react = chai.spy();

        const store = new ProductStore();

        reaction(() => toJS(store.products), react);

        store.addProduct();
        expect(store.products).to.have.length(2);

        expect(react).to.have.been.called.exactly(1);
    });
});
