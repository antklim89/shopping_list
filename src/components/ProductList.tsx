import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import style from '../styles/ProductList.module.scss';

import { ProductItem } from './ProductItem';
import { useStore } from './StoreProvider';


export const ProductList: FC = observer(() => {
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
