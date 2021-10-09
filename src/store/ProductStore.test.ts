/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import { reaction, toJS } from 'mobx';

import { ProductItemStore } from './ProductItemStore';
import { ProductStore } from './ProductStore';

import { CURRENT_COLLECTION_STORE_ID } from '~/constants';
import { setup } from '~/test.setup';
import { getIdSearchParam, getProductsSearchParam, setSearchParams } from '~/utils';
import { getCurrentCollectionStorage, getFromStorage } from '~/utils/storage';


const storeIdFromStorage = 'aaa-aaa-aaa-aaa-aaa';
const storeIdNotFromStorage = 'bbb-aaa-aaa-aaa-aaa';
const storeIdFromURL = 'ccc-aaa-aaa-aaa-aaa';

const productFromStorage = new ProductItemStore({ name: 'fromStorage' }, { } as ProductStore);
const productFromURL = new ProductItemStore({ name: 'fromURL' }, { } as ProductStore);


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
            history.pushState(null, '', `#${btoa(JSON.stringify({ id: storeIdFromURL, products: [] }))}`);
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
            setSearchParams({ id: 'url-xxx-xxx-xxx-xxx', products: [productFromURL] });

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

        expect(getFromStorage(store.currentCollectionId)?.products).to.have.length(1);
        expect(getProductsSearchParam()).to.have.length(1);

        store.addProduct();
        expect(store.products).to.have.length(2);
        expect(getFromStorage(store.currentCollectionId)?.products).to.have.length(2);
        expect(getProductsSearchParam()).to.have.length(2);

        expect(react).to.have.been.called.exactly(1);
    });

    it('#clearProducts', () => {
        const react = chai.spy();

        const store = new ProductStore();

        reaction(() => toJS(store.products), react);

        expect(getFromStorage(store.currentCollectionId)?.products).to.have.length(1);
        expect(store.products).to.have.length(1);
        store.addProduct();
        store.addProduct();

        expect(getFromStorage(store.currentCollectionId)?.products).to.have.length(3);
        expect(store.products).to.have.length(3);

        store.clearProducts();

        expect(getFromStorage(store.currentCollectionId)?.products).to.have.length(0);
        expect(store.products).to.have.length(0);
        expect(react).to.have.been.called.exactly(3);
    });

    it('#toggleAllBougth', () => {
        const store = new ProductStore();

        store.addProduct();
        store.addProduct();

        store.products[1].update({ isBought: true });
        expect(store.products.every((prod) => prod.isBought)).to.be.false;

        store.toggleAllBougth();
        expect(store.products.every((prod) => prod.isBought)).to.be.true;

        store.toggleAllBougth();
        expect(store.products.every((prod) => prod.isBought)).to.be.false;
    });
});
