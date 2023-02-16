import { reaction } from 'mobx';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { ProductStore } from './ProductStore';

import { setup } from '~/test.setup';
import type { Unit } from '~/types';


describe('ProductItemStore', () => {
    beforeEach(setup);

    it('#update', () => {
        const react = vi.fn();
        const react2 = vi.fn();

        const store = new ProductStore();

        const [product] = store.products;

        reaction(() => product.name, react);
        reaction(() => product.qty, react2);

        product.update({ isBought: false, name: 'NEW_NAME', qty: 418, unit: 'liter' as Unit });
        expect(react).toHaveBeenCalledTimes(1);
        expect(react2).toHaveBeenCalledTimes(1);

        product.update({ isBought: false, qty: 500, unit: 'liter' as Unit });
        expect(react).toHaveBeenCalledTimes(1);
        expect(react2).toHaveBeenCalledTimes(2);
    });

    it('#remove', () => {
        const store = new ProductStore();

        const [product] = store.products;

        expect(store.products).toHaveLength(1);
        product.remove();
        expect(store.products).toHaveLength(0);
    });
});
