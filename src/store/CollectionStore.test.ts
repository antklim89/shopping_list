import chai, { expect } from 'chai';
import { reaction } from 'mobx';

import { ProductStore } from './ProductStore';

import { CURRENT_COLLECTION_STORE_ID } from '~/constants';
import '~/test.setup';


const react = chai.spy();


describe('CollectionStore', () => {
    describe('#setCurrentCollection', () => {
        it('normal set', () => {
            const store = new ProductStore();
            const [firstCollectionStore, secondCollectionStore] = store.collections;

            reaction(() => store.currentCollection, react);

            firstCollectionStore.setCurrentCollection();
            expect(firstCollectionStore).eq(store.currentCollection);
            expect(firstCollectionStore.id).eq(store.currentCollection.id);
            expect(localStorage.getItem(CURRENT_COLLECTION_STORE_ID)).eq(store.currentCollection.id);

            secondCollectionStore.setCurrentCollection();
            expect(secondCollectionStore).eq(store.currentCollection);
            expect(secondCollectionStore.id).eq(store.currentCollection.id);
            expect(localStorage.getItem(CURRENT_COLLECTION_STORE_ID)).eq(store.currentCollection.id);

            expect(react).to.have.been.called.exactly(2);
        });
    });
});
