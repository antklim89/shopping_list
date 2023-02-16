import { FunctionalComponent } from 'preact';

import { AddIcon } from './icons';
import { useStore } from './StoreProvider';


const AddProduct: FunctionalComponent<h.JSX.HTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {
    const store = useStore();

    return (
        <button
            className={`AddProduct btn ${className}`}
            type="button"
            onClick={() => store.addProduct()}
            {...props}
        >
            <span className="AddProduct__text sm-hide">Add Product</span>
            <span className="AddProduct__icon lg-hide"><AddIcon /></span>
        </button>
    );
};

export default AddProduct;
