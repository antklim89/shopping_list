import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { reaction } from 'mobx';

import { ProductListStore } from './ProductListStore';


chai.use(spies);

const react = chai.spy();

describe('ProductListStore.test', () => {
    it('create', () => {
        const store = new ProductListStore();
        store.addProduct();

        reaction(
            () => store.products[0].qty,
            react,
        );
        store.products[0].update({ qty: 2 });
        store.products[0].update({ qty: 4 });

        expect(react).to.have.been.called.exactly(2);
        expect(react).to.have.been.first.called.with(2);
        expect(react).to.have.been.second.called.with(4);

    });
});
