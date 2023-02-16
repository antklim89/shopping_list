import { v4 } from 'uuid';

import { isProductCollection } from './isProductCollection';

import { COLLECTION_DEFAULT_NAME } from '~/constants';
import type { IProductItem } from '~/store/ProductItemStore';
import type { ProductsCollection, UUID } from '~/types';


export function setCollectionToUrl(newCollection: Partial<ProductsCollection>): void {
    const prevCollection: ProductsCollection = getCollectionFromUrl()
        || { id: v4() as UUID, products: [], name: COLLECTION_DEFAULT_NAME };

    const stringParams = JSON.stringify({ ...prevCollection, ...newCollection });
    const base64Params = btoa(stringParams);
    window.history.replaceState(null, '', `#${base64Params}`);
}

export function getCollectionFromUrl(): ProductsCollection | null {
    const { hash } = location;
    if (!hash.startsWith('#')) return null;
    if (hash.length < 2) return null;
    const base64 = hash.substring(1);
    try {
        const productsString = atob(base64);
        const productsCollection = JSON.parse(productsString);
        if (!isProductCollection) return null;
        return productsCollection;
    } catch (error) {
        return null;
    }
}


export function getCollectionIdFromUrl(): UUID | null {
    const params = getCollectionFromUrl();
    if (!params) return null;
    return params.id;
}

export function getProductsFromUrl(): IProductItem[] | null {
    const collection = getCollectionFromUrl();
    if (!collection) return null;
    return collection.products;
}
