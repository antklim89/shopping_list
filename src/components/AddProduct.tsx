
// import { ReactComponent as AddIcon } from '../assets/add.svg';
import { FunctionalComponent, h } from 'preact';

import style from '../styles/AddProduct.module.scss';

import { useStore } from './StoreProvider';


const AddProduct: FunctionalComponent = () => {
    const store = useStore();
    return (
        <button
            className={style.root}
            type="button"
            onClick={() => store.addProduct()}
        >
            {/* <AddIcon className="icon" /> */}
            <span className={style.text}>Add Product</span>
        </button>
    );
};

export default AddProduct;
