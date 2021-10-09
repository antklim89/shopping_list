import { v4 } from 'uuid';

import type { IProductItem } from '~/store/ProductItemStore';
import type { UUID } from '~/types';


interface UrlProducts {
    id: UUID;
    products: IProductItem[];
}

export function setSearchParams(newParams: Partial<UrlProducts>): void {
    const prev = getSearchParam() || { name: v4(), products: [] as IProductItem[] };
    const stringParams = JSON.stringify({ ...prev, ...newParams });
    const base64Params = btoa(stringParams);
    window.history.replaceState(null, '', `#${base64Params}`);
}

export function getSearchParam(): UrlProducts | null {
    const { hash } = location;
    if (!hash.startsWith('#')) return null;
    if (hash.length < 2) return null;
    const base64 = hash.substring(1);
    try {
        const productsString = atob(base64);
        const productsList: UrlProducts = JSON.parse(productsString);
        return productsList;
    } catch (error) {
        return null;
    }
}


export function getIdSearchParam(): UUID | null {
    const params = getSearchParam();
    if (!params) return null;
    return params.id;
}

export function getProductsSearchParam(): IProductItem[] | null {
    const params = getSearchParam();
    if (!params) return null;
    return params.products;
}
