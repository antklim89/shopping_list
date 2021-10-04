import { m } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { FunctionalComponent, h } from 'preact';

import { CartIcon, DeleteIcon, DoneIcon } from './icons';

import type { ProductItemStore } from '~/store/ProductItemStore';
import type { Unit } from '~/types/Unit';


const ProductItem: FunctionalComponent<{ product: ProductItemStore }> = ({ product }) => {
    return (
        <m.li
            animate={{ x: 0, opacity: 1 }}
            className="ProductItem"
            exit={{ x: '100vh', opacity: 0 }}
            initial={{ x: '-100vh', opacity: 0 }}
        >
            <input
                className="ProductItem__name input item"
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
                className="ProductItem__qty item input"
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
                className="ProductItem__unit item input"
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

            <div className="ProductItem__actions item" >
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
                    onClick={() => product.remove()}
                >
                    <DeleteIcon />
                </button>
            </div>
        </m.li>
    );
};

export default observer(ProductItem);
