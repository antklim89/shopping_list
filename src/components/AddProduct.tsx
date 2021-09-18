import { FunctionalComponent, h } from 'preact';

import { AddIcon } from './icons';
import { useStore } from './StoreProvider';


const AddProduct: FunctionalComponent = () => {
    const store = useStore();
    return (
        <button
            className="AddProduct"
            type="button"
            onClick={() => store.addProduct()}
        >
            <span className="AddProduct__text">Add Product</span>
            <span className="AddProduct__icon"><AddIcon /></span>
        </button>
    );
};

export default AddProduct;
