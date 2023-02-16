/* eslint-disable no-prototype-builtins */
import type { ProductsCollection } from '~/types';


export function isProductCollection(collection: unknown): collection is ProductsCollection {
    return typeof collection === 'object' && collection
        ? (
            collection.hasOwnProperty('name') && collection.hasOwnProperty('products') && collection.hasOwnProperty('id')
        )
        : false;
}
