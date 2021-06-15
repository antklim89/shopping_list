import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { ReactComponent as CartIcon } from '../assets/cart.svg';
import { ReactComponent as DoneIcon } from '../assets/done.svg';
import { ProductItemStore } from '../store/ProductItemStore';
import style from '../styles/ProductItem.module.scss';
import { Unit } from '../types/Unit';

import { useStore } from './StoreProvider';


export const ProductItem: FC<{ product: ProductItemStore }> = observer(({ product }) => {
    const store = useStore();

    return (
        <div>
            <li className={style.item}>
                <div className={style.isBought}>
                    {product.isBought ? (
                        <button type="button" onClick={() => product.update({ isBought: false })}>
                            <DoneIcon />
                        </button>
                    ) : (
                        <button type="button" onClick={() => product.update({ isBought: true })}>
                            <CartIcon />
                        </button>
                    )}
                </div>
                <input
                    className={style.name}
                    disabled={product.isBought}
                    placeholder="Enter product name..."
                    type="text"
                    value={product.name}
                    onChange={(e) => product.update({ name: e.target.value })}
                    onKeyPress={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
                />
                <input
                    className={style.qte}
                    disabled={product.isBought}
                    min={1}
                    type="text"
                    value={product.qty}
                    onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (Number.isNaN(value)) product.update({ qty: 0 });
                        else product.update({ qty: value });
                    }}
                />
                <select
                    className={style.unit}
                    defaultValue={product.unit}
                    disabled={product.isBought}
                    onChange={(e) => product.update({ unit: e.target.value as Unit })}
                >
                    <option value="kg">kg</option>
                    <option value="mg">mg</option>
                    <option value="l">l</option>
                    <option value="ml">ml</option>
                    <option value="piece">piece</option>
                </select>
                <button
                    className={style.deleteBtn}
                    type="button"
                    onClick={() => store.removeProduct(product)}
                >
                    &times;

                </button>
            </li>
        </div>
    );
});
