import type { units } from './constants';


export interface List {
  name: string;
  items: Record<string, ListItem>;
}

export interface ListItem {
  name: string;
  qty: number;
  unit: typeof units[number];
  selected: boolean;
}

export interface FileList {
  id: string;
  list: List;
}
