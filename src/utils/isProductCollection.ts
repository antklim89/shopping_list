import type { ProductsCollection } from '~/types';


export function isProductCollection(collection: unknown): collection is ProductsCollection {
    return Boolean(((typeof collection === 'object') && collection)
        && 'name' in collection
        && 'products' in collection
        && 'id' in collection);
}
