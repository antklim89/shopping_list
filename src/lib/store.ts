import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { List, ListItem } from './types';
import { generateId } from './utils';


export const defaultListItem: ListItem = {
  name: '',
  qty: 0,
  unit: 'piece',
  selected: false,
};

export const defaultList: List = {
  name: '',
  items: {},
};


export interface ListStore {
  lists: Record<string, List>;
  currentListId: string;
  listCreate: () => void;
  listSetName: (listId: string, newName: string) => void;
  listRevome: (listId: string) => void;
  listItemAdd: (listId: string) => void;
  listSetCurrentId: (listId: string) => void;
  listItemUpdate: (listId: string, listItemId: string, newData: Partial<ListItem>) => void;
  listItemDelete: (listId: string, listItemId: string) => void;
  listItemSelectAll: (listId: string) => void;
}

export const useStore = create(persist<ListStore>(set => ({
  lists: {},
  currentListId: generateId(),

  listCreate: () => set((state) => {
    const listId = generateId();

    return {
      lists: {
        ...state.lists,
        [listId]: defaultList,
      },
      currentListId: listId,
    };
  }),

  listSetName: (listId, newName) => set((state) => {
    const list = state.lists[listId] || defaultList;

    return {
      lists: {
        ...state.lists,
        [listId]: {
          ...list,
          name: newName,
        },
      },
    };
  }),

  listRevome: listId => set((state) => {
    const newLists = Object.fromEntries(Object.entries(state.lists).filter(([key]) => key !== listId));
    const newCurrentListId = listId === state.currentListId
      ? Object.keys(newLists)[0] ?? generateId()
      : state.currentListId;

    return {
      currentListId: newCurrentListId,
      lists: newLists,
    };
  }),

  listSetCurrentId: listId => set(() => {
    return {
      currentListId: listId,
    };
  }),

  listItemAdd: listId => set((state) => {
    const list = state.lists[listId] || defaultList;

    return {
      lists: {
        ...state.lists,
        [listId]: {
          ...list,
          items: {
            ...list.items,
            [generateId()]: defaultListItem,
          },
        },
      },
    };
  }),

  listItemUpdate: (listId, listItemId, newData) => set((state) => {
    const list = state.lists[listId] || defaultList;

    const listItem = list.items[listItemId] || defaultListItem;

    return {
      lists: {
        ...state.lists,
        [listId]: {
          ...list,
          items: {
            ...list.items,
            [listItemId]: { ...listItem, ...newData },
          },
        },
      },
    };
  }),

  listItemDelete: (listId, listItemId) => set((state) => {
    const list = state.lists[listId];
    if (list == null) return state;

    return {
      lists: {
        ...state.lists,
        [listId]: {
          ...list,
          items: Object.fromEntries(Object.entries(list.items).filter(([key]) => key !== listItemId)),
        },
      },
    };
  }),

  listItemSelectAll: listId => set((state) => {
    const list = state.lists[listId];
    if (list == null) return state;

    const isAllSelected = Object.entries(list.items).every(([_, listItem]) => listItem.selected);

    const newItems = isAllSelected
      ? Object.fromEntries(Object.entries(list.items).map(([key, listItem]) => [key, { ...listItem, selected: false }]))
      : Object.fromEntries(Object.entries(list.items).map(([key, listItem]) => [key, { ...listItem, selected: true }]));

    return {
      lists: {
        ...state.lists,
        [listId]: {
          ...list,
          items: newItems,
        },
      },
    };
  }),
}), {
  name: 'shopping-list',
  version: 1,
}));
