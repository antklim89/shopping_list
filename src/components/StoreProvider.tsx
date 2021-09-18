import { reaction } from 'mobx';
import { createContext, FunctionalComponent, h } from 'preact';
import { useContext, useEffect, useMemo } from 'preact/hooks';

import { PropductStore } from '~/store/Store';


const Context = createContext({} as PropductStore);

const StoreProvider: FunctionalComponent = ({ children }) => {
    const store = useMemo(() => new PropductStore(), []);

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

export const useStore = (): PropductStore => useContext(Context);

export default StoreProvider;
