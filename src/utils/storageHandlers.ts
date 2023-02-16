import { isProductCollection } from './isProductCollection';
import { isUUID } from './isUUID';

import { COLLECTION_DEFAULT_NAME, CURRENT_COLLECTION_STORE_ID } from '~/constants';
import type { ProductsCollection, UUID } from '~/types';


export function getCollectionFromStorage(id: string): ProductsCollection | null {
    const productsString = localStorage.getItem(id);
    if (!productsString) return null;
    const data = JSON.parse(productsString);
    if (!isProductCollection(data)) return null;
    return data;
}

export function setCollectionToStorage(
    id: UUID,
    newCollection: Partial<ProductsCollection>,
): void {
    const previousCollection: ProductsCollection = getCollectionFromStorage(id)
        || { name: COLLECTION_DEFAULT_NAME, products: [], id };

    localStorage.setItem(id, JSON.stringify({ ...previousCollection, ...newCollection }));
}

export function removeCollectionFromStorage(id: string): void {
    localStorage.removeItem(id);
}

export function getCurrentCollectionFromStorage(): UUID | null {
    const id = localStorage.getItem(CURRENT_COLLECTION_STORE_ID);
    return isUUID(id) ? id : null;
}

export function setCurrentCollectionToStorage(newId: string): void {
    localStorage.setItem(CURRENT_COLLECTION_STORE_ID, newId);
}

export function getAllCollectionsFromStorage(): ProductsCollection[] {
    const collections: ProductsCollection[] = [];
    for (let index = 0; index < localStorage.length; index += 1) {
        const storeId = localStorage.key(index);

        if (!isUUID(storeId)) continue;
        const productsString = localStorage.getItem(storeId);
        if (!productsString) continue;

        const collection = getCollectionFromStorage(storeId);
        if (collection) collections.push(collection);
    }
    return collections;
}
