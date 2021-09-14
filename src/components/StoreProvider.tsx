import { reaction } from 'mobx';
import { createContext, FunctionalComponent, h } from 'preact';
import { useContext, useEffect, useMemo } from 'preact/hooks';

import { Store } from '../store/Store';


const Context = createContext({} as Store);

export const StoreProvider: FunctionalComponent = ({ children }) => {
    const store = useMemo(() => new Store(), []);

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

export const useStore = (): Store => useContext(Context);
