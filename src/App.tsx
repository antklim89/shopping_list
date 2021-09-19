import { LazyMotion, domAnimation } from 'framer-motion';
import { FunctionComponent, h } from 'preact';

import Header from './components/Header';
import ProductList from './components/ProductList';
import StoreProvider from './components/StoreProvider';


const App: FunctionComponent = () => {

    return (
        <LazyMotion strict features={domAnimation}>
            <StoreProvider>
                <Header />
                <ProductList />
            </StoreProvider>
        </LazyMotion>
    );
};

export default App;
