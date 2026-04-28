import { create, type ExtractState } from 'zustand';
import { persist } from 'zustand/middleware';

import type { ListItemType, ListType } from './types';
import { generateId } from './utils';

export const defaultListItem: ListItemType = {
  name: '',
  qty: 0,
  unit: 'piece',
  selected: false,
};

export const defaultList: ListType = {
  name: '',
  items: {},
};

export const useStore = create(
  persist(
    () => ({
      lists: {} as Record<string, ListType>,
      currentListId: generateId(),
    }),
    {
      name: 'shopping-list',
      version: 1,
    },
  ),
);

export function getCurrentListItemsLength(state: ListStore): number {
  const items = state.lists[state.currentListId]?.items;
  return items ? Object.entries(items).length : 0;
}

export function getListsLength(state: ListStore): number {
  return Object.values(state.lists).length;
}

export function checkIsAllSelected(state: ListStore): boolean {
  const list = state.lists[state.currentListId];
  if (list == null) return false;
  return Object.values(list.items).every(listItem => listItem.selected);
}

export function listCreate() {
  useStore.setState(state => {
    const listId = generateId();

    return {
      lists: { ...state.lists, [listId]: defaultList },
      currentListId: listId,
    };
  });
}

export const listLoad = (listId: string, list: ListType) => {
  useStore.setState(state => {
    return {
      lists: { ...state.lists, [listId]: list },
    };
  });
};

export const listSetName = (listId: keyof ListStore['lists'], newName: string) => {
  useStore.setState(state => {
    const list = state.lists[listId] || defaultList;

    return {
      lists: {
        ...state.lists,
        [listId]: { ...list, name: newName },
      },
    };
  });
};

export const listRemove = (listId: keyof ListStore['lists']) => {
  useStore.setState(state => {
    const newLists = Object.fromEntries(Object.entries(state.lists).filter(([key]) => key !== listId));
    const newCurrentListId =
      listId === state.currentListId ? (Object.keys(newLists)[0] ?? generateId()) : state.currentListId;

    return {
      currentListId: newCurrentListId,
      lists: newLists,
    };
  });
};

export const listSetCurrentId = (listId: keyof ListStore['lists']) => {
  useStore.setState(() => {
    return {
      currentListId: listId,
    };
  });
};

export const listItemAdd = (listId: keyof ListStore['lists']) => {
  useStore.setState(state => {
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
  });
};

export const listItemUpdate = (
  listId: keyof ListStore['lists'],
  listItemId: string,
  newData: Partial<ListItemType>,
) => {
  useStore.setState(state => {
    const list = state.lists[listId] || defaultList;
    const listItem = list.items[listItemId] || defaultListItem;

    return {
      lists: {
        ...state.lists,
        [listId]: { ...list, items: { ...list.items, [listItemId]: { ...listItem, ...newData } } },
      },
    };
  });
};

export const listItemDelete = (listId: keyof ListStore['lists'], listItemId: string) => {
  useStore.setState(state => {
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
  });
};

export const listItemSelectAll = (listId: keyof ListStore['lists']) => {
  useStore.setState(state => {
    const list = state.lists[listId];
    if (list == null) return state;

    const isAllSelected = Object.values(list.items).every(listItem => listItem.selected);

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
  });
};

export type ListStore = ExtractState<typeof useStore>;
