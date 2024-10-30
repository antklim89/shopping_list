import type { units } from './constants';


export interface ListType {
  name: string;
  items: Record<string, ListItemType>;
}

export interface ListItemType {
  name: string;
  qty: number;
  unit: typeof units[number];
  selected: boolean;
}

export interface ListShareType {
  id: string;
  list: ListType;
}
