import { FunctionComponent, h } from 'preact';

import Header from './components/Header';
import ProductList from './components/ProductList';
import StoreProvider from './components/StoreProvider';


const App: FunctionComponent = () => {

    return (
        <StoreProvider>
            <Header />
            <ProductList />
        </StoreProvider>
    );
};

export default App;
