import { CURRENT_COLLECTION_STORE_ID } from '~/constants';
import type { IProductItem } from '~/store/ProductItemStore';


interface StorageProducts {
    name: string;
    products: IProductItem[];
}

export function getProductsFromStorage(id: string): StorageProducts|null {
    const productsString = localStorage.getItem(id);
    if (!productsString) return null;
    const data = JSON.parse(productsString);
    if (!('name' in data) || !('products' in data)) return null;
    return data as StorageProducts;
}

export function setProductsStorage(
    id: string,
    newData: Partial<StorageProducts>,
): void {
    const prev = getProductsFromStorage(id) || { name: 'Products collection', products: [] };
    localStorage.setItem(id, JSON.stringify({ ...prev, ...newData }));
}


export function getCurrentCollectionStorage(): string|null {
    return localStorage.getItem(CURRENT_COLLECTION_STORE_ID);
}

export function setCurrentCollectionStorage(newId: string): void {
    localStorage.setItem(CURRENT_COLLECTION_STORE_ID, newId);
}
