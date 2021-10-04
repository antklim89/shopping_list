import { isUUID } from './isUUID';

import type { IProductItem } from '~/store/ProductItemStore';
import type { UUID } from '~/types';


interface UrlProducts {
    id: string;
    products: IProductItem[];
}

export function setSearchParams(newParams: Partial<UrlProducts>): void {
    const searchParams = new URLSearchParams(location.search);

    if (newParams.id) searchParams.set('id', newParams.id);
    if (newParams.products) searchParams.set('products', btoa(JSON.stringify(newParams.products)));

    window.history.replaceState(null, '', `?${searchParams}`);
}

export function getProductsSearchParam(): IProductItem[] | null {
    const base64 = new URLSearchParams(location.search).get('products');
    if (!base64) return null;
    const productsString = atob(base64);
    const productsList: IProductItem[] = JSON.parse(productsString);
    return productsList;
}

export function getIdSearchParam(): UUID | null {
    const id = new URLSearchParams(location.search).get('id');
    return isUUID(id) ? id : null;
}
