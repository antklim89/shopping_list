import { reaction } from 'mobx';
import { createContext, FunctionalComponent, h } from 'preact';
import { useContext, useEffect, useMemo } from 'preact/hooks';

import { ProductListStore } from '~/store/ProductListStore';


const Context = createContext({} as ProductListStore);

const StoreProvider: FunctionalComponent = ({ children }) => {
    const store = useMemo(() => new ProductListStore(), []);

    useEffect(() => reaction(
        () => JSON.stringify(store.products),
        (productsString) => localStorage.setItem('store', productsString),
    ), []);

    return (
        <Context.Provider value={store}>
            {children}
        </Context.Provider>
    );
};

export const useStore = (): ProductListStore => useContext(Context);

export default StoreProvider;
