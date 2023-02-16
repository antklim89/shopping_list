import { createContext, FunctionalComponent } from 'preact';
import { useContext, useMemo } from 'preact/hooks';

import { ProductStore } from '~/store/ProductStore';


const Context = createContext({} as ProductStore);

const StoreProvider: FunctionalComponent = ({ children }) => {
    const store = useMemo(() => new ProductStore(), []);

    return (
        <Context.Provider value={store}>
            {children}
        </Context.Provider>
    );
};

export const useStore = (): ProductStore => useContext(Context);

export default StoreProvider;
