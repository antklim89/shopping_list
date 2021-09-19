import { FunctionComponent, h } from 'preact';
// import { useEffect } from 'preact/hooks';

import Header from './components/Header';
import ProductList from './components/ProductList';
import StoreProvider from './components/StoreProvider';


const App: FunctionComponent = () => {
    // useEffect(() => window.history.replaceState(null, '', '/'), []);

    return (
        <StoreProvider>
            <Header />
            <ProductList />
        </StoreProvider>
    );
};

export default App;
