import { FunctionComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';

import Header from './components/Header';
import ProductList from './components/ProductList';
import StoreProvider from './components/StoreProvider';
import style from './styles/App.module.scss';


const App: FunctionComponent = () => {
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

export default App;
