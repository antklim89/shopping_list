import { ProductItemStore } from './store/ProductItemStore';
import type { ProductStore } from './store/ProductStore';
import { setCollectionToStorage, setCurrentCollectionToStorage } from './utils/storageHandlers';


export const setup = (): void => {
    history.pushState(null, '', '/');
    localStorage.clear();

    setCurrentCollectionToStorage('111-aaa-aaa-aaa-aaa');

    setCollectionToStorage('111-aaa-aaa-aaa-aaa', {
        name: 'TEST 1',
        products: [new ProductItemStore({ name: 'TEST 1' }, {} as ProductStore)],
    });
    setCollectionToStorage('222-bbb-bbb-bbb-bbb', {
        name: '',
        products: [new ProductItemStore({ name: '' }, {} as ProductStore)],
    });
    setCollectionToStorage('333-bbb-bbb-bbb-bbb', {
        name: 'TEST 3',
        products: [new ProductItemStore({ name: 'TEST 3' }, {} as ProductStore)],
    });

    localStorage.setItem('invalid-ddd-ddd-ddd-ddd', '[]');
};
