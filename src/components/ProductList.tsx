import { observer } from 'mobx-react-lite';
import { FunctionalComponent, h } from 'preact';

import style from '../styles/ProductList.module.scss';

import ProductItem from './ProductItem';
import { useStore } from './StoreProvider';


const ProductList: FunctionalComponent = observer(() => {
    const { products } = useStore();

    return (
        <div className={style.container}>
            <ul className={style.list}>
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </ul>
        </div>
    );
});

export default ProductList;
