import { FC } from 'react';

import { AddProduct } from './components/AddProduct';
import { ProductList } from './components/ProductList';
import { StoreProvider } from './components/StoreProvider';
import style from './styles/App.module.scss';


export const App: FC = () => {
    return (
        <div className={style.root}>
            <StoreProvider>
                <div>HELLO</div>
                <AddProduct />
                <ProductList />
                <div>FOOTER</div>
            </StoreProvider>
        </div>
    );
};
