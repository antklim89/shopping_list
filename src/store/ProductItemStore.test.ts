import chai, { expect } from 'chai';
import { reaction } from 'mobx';

import { ProductStore } from './ProductStore';

import { setup } from '~/test.setup';
import type { Unit } from '~/types';


describe('ProductItemStore', () => {
    beforeEach(setup);

    it('#update', () => {
        const react = chai.spy();
        const react2 = chai.spy();

        const store = new ProductStore();

        const [product] = store.products;

        reaction(() => product.name, react);
        reaction(() => product.qty, react2);

        product.update({ isBought: false, name: 'NEW_NAME', qty: 418, unit: 'liter' as Unit });
        expect(react).to.have.been.called.exactly(1);
        expect(react2).to.have.been.called.exactly(1);

        product.update({ isBought: false, qty: 500, unit: 'liter' as Unit });
        expect(react).to.have.been.called.exactly(1);
        expect(react2).to.have.been.called.exactly(2);
    });
});
