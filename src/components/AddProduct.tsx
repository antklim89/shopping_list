import { FC } from 'react';

import { ReactComponent as AddIcon } from '../assets/add.svg';
import style from '../styles/AddProduct.module.scss';

import { useStore } from './StoreProvider';


export const AddProduct: FC = () => {
    const store = useStore();
    return (
        <button
            className={style.root}
            type="button"
            onClick={() => store.addProduct()}
        >
            <AddIcon className="icon" />
            <span className={style.text}>Add Product</span>
        </button>
    );
};
