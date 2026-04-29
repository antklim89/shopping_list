import type { units } from './constants';

export interface ListType {
  name: string;
  items: Record<string, ListItemType>;
}

export type Unit = (typeof units)[number];

export interface ListItemType {
  name: string;
  qty: number;
  unit: Unit;
  selected: boolean;
}

export interface ListShareType {
  id: string;
  list: ListType;
}
