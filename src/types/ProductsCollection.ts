import type { UUID } from './UUID';

import type { IProductItem } from '~/store/ProductItemStore';


export interface ProductsCollection {
    id: UUID
    name: string;
    products: IProductItem[];
}
