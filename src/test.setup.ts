import chai from 'chai';
import spies from 'chai-spies';


import { ProductItemStore } from './store/ProductItemStore';

import { CURRENT_COLLECTION_STORE_ID } from '~/constants';


chai.use(spies);


export const setup = (): void => {
    history.pushState(null, '', '/');
    localStorage.clear();

    localStorage.setItem(CURRENT_COLLECTION_STORE_ID, '111-aaa-aaa-aaa-aaa');

    localStorage.setItem(
        '111-aaa-aaa-aaa-aaa',
        JSON.stringify({
            name: 'TEST 1',
            products: [new ProductItemStore({ name: 'TEST 1' })],
        }),
    );
    localStorage.setItem(
        '222-bbb-bbb-bbb-bbb',
        JSON.stringify({
            name: '',
            products: [new ProductItemStore({ name: '' })],
        }),
    );
    localStorage.setItem(
        '333-bbb-bbb-bbb-bbb',
        JSON.stringify({
            name: 'TEST 3',
            products: [new ProductItemStore({ name: 'TEST 3' })],
        }),
    );

    localStorage.setItem('444-ddd-ddd-ddd-ddd', '[]');
};
