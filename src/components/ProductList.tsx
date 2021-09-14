import { observer } from 'mobx-react-lite';
import { FunctionalComponent, h } from 'preact';

import style from '../styles/ProductList.module.scss';

import { ProductItem } from './ProductItem';
import { useStore } from './StoreProvider';


export const ProductList: FunctionalComponent = observer(() => {
    const { products } = useStore();
    return (
        <div className={style.root}>
            <ul>
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </ul>
        </div>
    );
});
