import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import {
  defaultList,
  defaultListItem,
  type ListStore,
  useStore,
} from '@/lib/store';
import { generateId } from '@/lib/utils';


vi.mock('@/lib/utils', async a => ({
  ...await (a()),
  generateId: vi.fn(() => `randomId`),
}));


const initState = useStore.getInitialState();
const getState = () => useStore.getState();
const populateState = (data: Partial<ListStore>) => useStore.setState(data);

beforeEach(() => {
  vi.restoreAllMocks();
  useStore.setState(initState);
});


describe('listCreate', () => {
  it('should create a list', async () => {
    vi.mocked(generateId).mockImplementation(() => 'randomId1');
    getState().listCreate();

    expect(getState().currentListId).toStrictEqual('randomId1');
    expect(getState().lists.randomId1).toStrictEqual({ name: '', items: {} });

    vi.mocked(generateId).mockImplementation(() => 'randomId2');
    getState().listCreate();

    expect(getState().currentListId).toStrictEqual('randomId2');
    expect(getState().lists.randomId1).toStrictEqual({ name: '', items: {} });
    expect(getState().lists.randomId2).toStrictEqual({ name: '', items: {} });
  });
});

describe('listSetName', () => {
  it('should set name of a list', async () => {
    populateState({ lists: { collectionId: { name: 'name', items: {} } } });
    getState().listSetName('collectionId', 'New Name');

    expect(getState().lists.collectionId).toStrictEqual({ name: 'New Name', items: {} });
  });
});

describe('listRevome', () => {
  it('should remove list', async () => {
    populateState({
      currentListId: 'listId3',
      lists: {
        listId1: { name: 'name', items: {} },
        listId2: { name: 'name', items: {} },
        listId3: { name: 'name', items: {} },
      },
    });

    getState().listRevome('listId3');
    expect(getState().lists).not.toHaveProperty('listId3');
    expect(getState().lists).toHaveProperty('listId1');
    expect(getState().lists).toHaveProperty('listId2');
    expect(getState().currentListId).toEqual('listId1');

    getState().listRevome('listId1');
    expect(getState().lists).not.toHaveProperty('listId1');
    expect(getState().lists).toHaveProperty('listId2');
    expect(getState().currentListId).toEqual('listId2');

    getState().listRevome('listId2');
    expect(getState().lists).not.toHaveProperty('listId2');
    expect(getState().currentListId).toEqual('randomId');
  });
});

describe('listSetCurrentId', () => {
  it('should set current list id', async () => {
    populateState({ currentListId: 'oldListId' });
    getState().listSetCurrentId('newListId');

    expect(getState().currentListId).toStrictEqual('newListId');
  });
});

describe('listItemAdd', () => {
  it('should add new list item', async () => {
    vi.mocked(generateId).mockImplementation(() => 'randomId1');
    getState().listItemAdd('listId');
    vi.mocked(generateId).mockImplementation(() => 'randomId2');
    getState().listItemAdd('listId');

    expect(getState().lists.listId).toStrictEqual({ ...defaultList, items: { randomId1: defaultListItem, randomId2: defaultListItem } });
  });
});

describe('listItemUpdate', () => {
  it('should update list item', async () => {
    populateState({ lists: { listId: { name: 'name', items: { listItemId: defaultListItem, extra: defaultListItem } } } });
    getState().listItemUpdate('listId', 'listItemId', { name: 'Updated Name' });
    getState().listItemUpdate('listId', 'listItemId', { qty: 6000 });
    getState().listItemUpdate('listId', 'listItemId', {});

    expect(getState().lists.listId?.items).toHaveProperty('extra');
    expect(getState().lists.listId?.items.listItemId).toStrictEqual({
      name: 'Updated Name',
      qty: 6000,
      unit: 'piece',
      checked: false,
    });
  });

  it('should update if list does not exist', async () => {
    getState().listItemUpdate('listId', 'randomId', { name: 'Updated Name' });

    expect(getState().lists.listId?.items).toEqual({
      randomId: {
        checked: false,
        name: 'Updated Name',
        qty: 0,
        unit: 'piece',
      },
    });
  });
});

describe('listItemDelete', () => {
  it('should remove list item', async () => {
    populateState({ lists: { listId: { name: 'name', items: { listItemId: defaultListItem, extra: defaultListItem } } } });
    getState().listItemDelete('listId', 'listItemId');

    expect(getState().lists.listId?.items).toHaveProperty('extra');
    expect(getState().lists.listId?.items).not.toHaveProperty('listItemId');
  });
});


