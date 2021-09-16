import { FunctionalComponent, h } from 'preact';

import style from '../styles/AddProduct.module.scss';

import { AddIcon } from './icons';
import { useStore } from './StoreProvider';


const AddProduct: FunctionalComponent = () => {
    const store = useStore();
    return (
        <button
            className={style.root}
            type="button"
            onClick={() => store.addProduct()}
        >
            <span className={style.text}>Add Product</span>
            <span className={style.icon}><AddIcon /></span>
        </button>
    );
};

export default AddProduct;
