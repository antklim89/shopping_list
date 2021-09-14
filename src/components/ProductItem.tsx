import { observer } from 'mobx-react-lite';
import { FunctionalComponent, h } from 'preact';
import { useRef } from 'preact/hooks';

import { useStore } from './StoreProvider';

import CartIcon from '~/assets/cart.svg';
import DeleteIcon from '~/assets/delete.svg';
import DoneIcon from '~/assets/done.svg';
import type { ProductItemStore } from '~/store/ProductItemStore';
import style from '~/styles/ProductItem.module.scss';
import type { Unit } from '~/types/Unit';


const ProductItem: FunctionalComponent<{ product: ProductItemStore }> = ({ product }) => {
    const store = useStore();
    const ref = useRef<HTMLLIElement>(null);

    return (
        <li
            className={`${style.item} ${style.appearanceStyle}`}
            ref={ref}
        >
            <input
                className={style.name}
                disabled={product.isBought}
                placeholder="Enter product name..."
                type="text"
                value={product.name}
                onChange={(e) => product.update({ name: e.currentTarget.value })}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                }}
            />
            <div className={style.isBought}>
                { product.isBought
                    ? (
                        <button type="button" onClick={() => product.update({ isBought: false })}>
                            <img alt="done" className="icon" src={DoneIcon} />
                        </button>
                    )
                    : (
                        <button type="button" onClick={() => product.update({ isBought: true })}>
                            <img alt="done" className="icon" src={CartIcon} />
                        </button>
                    ) }
            </div>
            <input
                className={style.qte}
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
                className={style.unit}
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
            <button
                className={style.deleteBtn}
                type="button"
                onClick={() => {
                    ref.current?.classList.remove(style.appearanceStyle);
                    ref.current?.classList.add(style.removeStyle);
                    setTimeout(() => {
                        store.removeProduct(product);
                    }, 190);
                }}
            >
                <img alt="delete" className="icon" src={DeleteIcon} />
            </button>
        </li>
    );
};

export default observer(ProductItem);
