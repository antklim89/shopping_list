import type { STORE_NAME } from '~/constants';


export type CollectionName = `${typeof STORE_NAME}:${string}:${string}`;
