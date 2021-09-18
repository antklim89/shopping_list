import { observer } from 'mobx-react-lite';
import { FunctionalComponent, h } from 'preact';

import Actions from './Actions';
import ProductItem from './ProductItem';
import { useStore } from './StoreProvider';


const ProductList: FunctionalComponent = observer(() => {
    const { products } = useStore();

    return (
        <div className="ProductList">
            <Actions />
            <ul className="ProductList__list">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </ul>
        </div>
    );
});

export default ProductList;
