import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  defaultList,
  defaultListItem,
  type ListStore,
  listCreate,
  listItemAdd,
  listItemDelete,
  listItemUpdate,
  listRemove,
  listSetCurrentId,
  listSetName,
  useStore,
} from '@/lib/store';
import { generateId } from '@/lib/utils';

vi.mock('@/lib/utils', async a => ({
  ...(await a()),
  generateId: vi.fn(() => 'randomId'),
}));

const initState = useStore.getInitialState();
const getState = () => useStore.getState();
const populateState = (data: Partial<ListStore>) => useStore.setState(data);

beforeEach(() => {
  vi.resetAllMocks();
  useStore.setState(initState);
});

describe('listCreate', () => {
  it('should create a list', () => {
    vi.mocked(generateId).mockImplementation(() => 'randomId1');
    listCreate();

    expect(getState().currentListId).toStrictEqual('randomId1');
    expect(getState().lists.randomId1).toStrictEqual({ name: '', items: {} });

    vi.mocked(generateId).mockImplementation(() => 'randomId2');
    listCreate();

    expect(getState().currentListId).toStrictEqual('randomId2');
    expect(getState().lists.randomId1).toStrictEqual({ name: '', items: {} });
    expect(getState().lists.randomId2).toStrictEqual({ name: '', items: {} });
  });
});

describe('listSetName', () => {
  it('should set name of a list', () => {
    populateState({ lists: { collectionId: { name: 'name', items: {} } } });
    listSetName('collectionId', 'New Name');

    expect(getState().lists.collectionId).toStrictEqual({ name: 'New Name', items: {} });
  });
});

describe('listRemove', () => {
  it('should remove list', () => {
    populateState({
      currentListId: 'listId3',
      lists: {
        listId1: { name: 'name', items: {} },
        listId2: { name: 'name', items: {} },
        listId3: { name: 'name', items: {} },
      },
    });

    listRemove('listId3');
    expect(getState().lists).not.toHaveProperty('listId3');
    expect(getState().lists).toHaveProperty('listId1');
    expect(getState().lists).toHaveProperty('listId2');
    expect(getState().currentListId).toEqual('listId1');

    listRemove('listId1');
    expect(getState().lists).not.toHaveProperty('listId1');
    expect(getState().lists).toHaveProperty('listId2');
    expect(getState().currentListId).toEqual('listId2');

    listRemove('listId2');
    expect(getState().lists).not.toHaveProperty('listId2');
    expect(getState().currentListId).toEqual('randomId');
  });
});

describe('listSetCurrentId', () => {
  it('should set current list id', () => {
    populateState({ currentListId: 'oldListId' });
    listSetCurrentId('newListId');

    expect(getState().currentListId).toStrictEqual('newListId');
  });
});

describe('listItemAdd', () => {
  it('should add new list item', () => {
    vi.mocked(generateId).mockImplementation(() => 'randomId1');
    listItemAdd('listId');
    vi.mocked(generateId).mockImplementation(() => 'randomId2');
    listItemAdd('listId');

    expect(getState().lists.listId).toStrictEqual({
      ...defaultList,
      items: { randomId1: defaultListItem, randomId2: defaultListItem },
    });
  });
});

describe('listItemUpdate', () => {
  it('should update list item', () => {
    populateState({
      lists: { listId: { name: 'name', items: { listItemId: defaultListItem, extra: defaultListItem } } },
    });
    listItemUpdate('listId', 'listItemId', { name: 'Updated Name' });
    listItemUpdate('listId', 'listItemId', { qty: 6000 });
    listItemUpdate('listId', 'listItemId', {});

    expect(getState().lists.listId?.items).toHaveProperty('extra');
    expect(getState().lists.listId?.items.listItemId).toStrictEqual({
      name: 'Updated Name',
      qty: 6000,
      unit: 'piece',
      selected: false,
    });
  });

  it('should update if list does not exist', () => {
    listItemUpdate('listId', 'randomId', { name: 'Updated Name' });

    expect(getState().lists.listId?.items).toEqual({
      randomId: {
        selected: false,
        name: 'Updated Name',
        qty: 0,
        unit: 'piece',
      },
    });
  });
});

describe('listItemDelete', () => {
  it('should remove list item', () => {
    populateState({
      lists: { listId: { name: 'name', items: { listItemId: defaultListItem, extra: defaultListItem } } },
    });
    listItemDelete('listId', 'listItemId');

    expect(getState().lists.listId?.items).toHaveProperty('extra');
    expect(getState().lists.listId?.items).not.toHaveProperty('listItemId');
  });
});
