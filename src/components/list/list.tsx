import { useMemo } from 'react';
import { AnimatePresence, Reorder } from 'framer-motion';
import { FaCheck, FaList } from 'react-icons/fa6';

import { useStore } from '@/lib/store';
import type { ListItemType } from '@/lib/types';
import { ListItem } from './list-item';
import { ListSelect } from './list-select';
import { Empty } from '../ui/empty';

export function List() {
  const currentListId = useStore(state => state.currentListId);
  const list = useStore(state => state.lists[currentListId]);

  const { selectedList, notSelectedList } = useMemo(() => {
    const defaultValue = {
      selectedList: [] as [string, ListItemType][],
      notSelectedList: [] as [string, ListItemType][],
    };
    if (!list) return defaultValue;

    return Object.entries(list.items).reduce((acc, value) => {
      if (value[1].selected) acc.selectedList.push(value);
      else acc.notSelectedList.push(value);
      return acc;
    }, defaultValue);
  }, [list]);

  if (!list) return null;

  return (
    <div className="overflow-hidden">
      <ListSelect />

      <div key={currentListId}>
        {Object.values(list.items).length > 0 && notSelectedList.length === 0 && (
          <Empty title="List Empty" icon={FaCheck} message="You have bought all the products" />
        )}

        {Object.values(list.items).length === 0 && (
          <Empty title="List Empty" icon={FaList} message="You haven&apos;t added any products yet" />
        )}

        <Reorder.Group
          as="div"
          axis="y"
          className="my-8 flex flex-col gap-8 sm:gap-1"
          values={Object.keys(list.items)}
          onReorder={() => null}
        >
          <AnimatePresence initial={false}>
            {notSelectedList.map(([id, items]) => (
              <ListItem listItem={items} key={id} listItemId={id} />
            ))}

            {selectedList.length !== 0 && notSelectedList.length !== 0 && <hr className="my-4" />}

            {selectedList.map(([id, items]) => (
              <ListItem listItem={items} key={id} listItemId={id} />
            ))}
          </AnimatePresence>
        </Reorder.Group>
      </div>
    </div>
  );
}
