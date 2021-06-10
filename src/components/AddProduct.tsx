import { FC } from 'react';

import { useStore } from './StoreProvider';


export const AddProduct: FC = () => {
    const store = useStore();
    return (
        <div>
            <button
                type="button"
                onClick={() => store.addProduct()}
            >
                Add
            </button>
        </div>
    );
};
