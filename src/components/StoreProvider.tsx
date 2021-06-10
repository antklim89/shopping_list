import { reaction } from 'mobx';
import {
    createContext, FC, useContext, useEffect,
} from 'react';

import { Store } from '../store/Store';


const Context = createContext({} as Store);

export const StoreProvider: FC = ({ children }) => {
    const store = new Store();

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
