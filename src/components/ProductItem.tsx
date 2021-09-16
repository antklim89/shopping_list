import { observer } from 'mobx-react-lite';
import { FunctionalComponent, h } from 'preact';
import { useRef } from 'preact/hooks';

import { CartIcon, DeleteIcon, DoneIcon } from './icons';
import { useStore } from './StoreProvider';

import type { ProductItemStore } from '~/store/ProductItemStore';
import style from '~/styles/ProductItem.module.scss';
import type { Unit } from '~/types/Unit';


const ProductItem: FunctionalComponent<{ product: ProductItemStore }> = ({ product }) => {
    const store = useStore();
    const ref = useRef<HTMLLIElement>(null);

    return (
        <li
            className={`${style.product} ${style.appearanceStyle}`}
            ref={ref}
        >
            <input
                className={`${style.product__name} ${style.item} input`}
                disabled={product.isBought}
                placeholder="Enter product name..."
                type="text"
                value={product.name}
                onChange={(e) => product.update({ name: e.currentTarget.value })}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                }}
            />

            <input
                className={`${style.product__qty} ${style.item} input`}
                disabled={product.isBought}
                min={1}
                type="number"
                value={product.qty}
                onInput={(e) => {
                    const value = parseInt(e.currentTarget.value, 10);
                    if (Number.isNaN(value)) product.update({ qty: 0 });
                    else product.update({ qty: value });
                }}
            />

            <select
                className={`${style.product__unit} ${style.item} input`}
                disabled={product.isBought}
                value={product.unit}
                onChange={(e) => product.update({ unit: e.currentTarget.value as Unit })}
            >
                <option value="kg">kg</option>
                <option value="mg">mg</option>
                <option value="gram">gram</option>
                <option value="liter">liter</option>
                <option value="ml">ml</option>
                <option value="piece">piece</option>
            </select>

            <div className={`${style.product__actions} ${style.item}`} >
                <button
                    className="btn"
                    type="button"
                    onClick={() => product.update({ isBought: !product.isBought })}
                >
                    {
                        product.isBought
                            ? <DoneIcon />
                            : <CartIcon />
                    }
                </button>

                <button
                    className="btn delete"
                    type="button"
                    onClick={() => {
                        ref.current?.classList.remove(style.appearanceStyle);
                        ref.current?.classList.add(style.removeStyle);
                        setTimeout(() => {
                            store.removeProduct(product);
                        }, 190);
                    }}
                >
                    <DeleteIcon />
                </button>
            </div>
        </li>
    );
};

export default observer(ProductItem);
