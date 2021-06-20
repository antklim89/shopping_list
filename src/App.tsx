import { FC, useEffect } from 'react';

import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { StoreProvider } from './components/StoreProvider';
import style from './styles/App.module.scss';


export const App: FC = () => {
    useEffect(() => window.history.replaceState(null, '', '/'), []);

    return (
        <div className={style.root}>
            <StoreProvider>
                <Header />
                <ProductList />
            </StoreProvider>
        </div>
    );
};
