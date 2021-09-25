import { reaction } from 'mobx';
import { createContext, FunctionalComponent, h } from 'preact';
import { useContext, useEffect, useMemo } from 'preact/hooks';

import { ProductListStore } from '~/store/ProductListStore';


const Context = createContext({} as ProductListStore);

const StoreProvider: FunctionalComponent = ({ children }) => {
    const store = useMemo(() => new ProductListStore(), []);

    useEffect(() => reaction(
        () => store.base64Products,
        () => {
            store.toLocalStorage();
            store.toUrl();
        },
    ), []);

    useEffect(() => reaction(
        () => store.currentCollection.storeName,
        () => store.currentCollection.setCollectionToStorage(),
    ), []);

    useEffect(() => reaction(
        () => store.currentCollection.id,
        () => store.fromLocalStorage(),
    ), []);

    return (
        <Context.Provider value={store}>
            {children}
        </Context.Provider>
    );
};

export const useStore = (): ProductListStore => useContext(Context);

export default StoreProvider;
