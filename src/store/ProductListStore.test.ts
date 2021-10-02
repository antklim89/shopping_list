import { ProductListStore, STORE_NAME } from './ProductListStore';


describe('ProductListStore.test', () => {
    it('create', () => {
        const store = new ProductListStore();
        store.addProduct();
        console.debug('store: \n', store.products);

    });
});
