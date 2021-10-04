/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import { reaction } from 'mobx';

import { ProductStore } from './ProductStore';

import { CURRENT_COLLECTION_STORE_ID } from '~/constants';
import { setup } from '~/test.setup';
import { getIdSearchParam } from '~/utils';
import { getProductsFromStorage } from '~/utils/storage';


describe('CollectionStore', () => {
    beforeEach(setup);

    it('#setCurrentCollection', () => {
        const react = chai.spy();

        const store = new ProductStore();
        const [, secondCollectionStore, thirdCollectionStore] = store.collections;

        reaction(() => store.currentCollection, react);

        secondCollectionStore.setCurrentCollection();
        expect(secondCollectionStore).eq(store.currentCollection);
        expect(secondCollectionStore.id).eq(store.currentCollection.id);
        expect(localStorage.getItem(CURRENT_COLLECTION_STORE_ID)).eq(store.currentCollection.id);
        expect(getIdSearchParam()).eq(store.currentCollection.id);

        thirdCollectionStore.setCurrentCollection();
        expect(thirdCollectionStore).eq(store.currentCollection);
        expect(thirdCollectionStore.id).eq(store.currentCollection.id);
        expect(localStorage.getItem(CURRENT_COLLECTION_STORE_ID)).eq(store.currentCollection.id);
        expect(getIdSearchParam()).eq(store.currentCollection.id);

        expect(react).to.have.been.called.exactly(2);
    });

    it('#rename', () => {
        const react = chai.spy();

        const store = new ProductStore();
        const [collectionStore] = store.collections;

        reaction(() => collectionStore.name, react);

        const newName = 'NEW_NAME';
        collectionStore.rename(newName);

        expect(react).to.have.been.called.exactly(1);
        expect(collectionStore.name).to.equal(newName);
        expect(getProductsFromStorage(collectionStore.id)).to.have.property('name', newName);
    });

    it('#delete', () => {
        const react = chai.spy();
        const store = new ProductStore();

        reaction(() => store.collections.length, react);

        const { currentCollection } = store;
        currentCollection.delete();
        expect(currentCollection.id).not.eq(store.currentCollection.id);
        expect(store.collections.length).eq(2);

        const [firstCollectionStore, secondCollectionStore] = store.collections;
        expect(firstCollectionStore.canDelete).to.be.true;

        firstCollectionStore.delete();
        expect(store.collections.length).eq(1);
        expect(firstCollectionStore.canDelete).to.be.false;

        secondCollectionStore.delete();
        expect(store.collections.length).eq(1);


        expect(react).to.have.been.called.exactly(2);
    });
});
