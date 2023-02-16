import { LazyMotion, domAnimation } from 'framer-motion';
import { FunctionComponent } from 'preact';

import Header from './components/Header';
import ProductList from './components/ProductList';
import StoreProvider from './components/StoreProvider';


const App: FunctionComponent = () => {
    return (
        <LazyMotion strict features={domAnimation}>
            {/* @ts-expect-error preact type error */}
            <StoreProvider>
                <Header />
                <ProductList />
            </StoreProvider>
        </LazyMotion>
    );
};

export default App;
