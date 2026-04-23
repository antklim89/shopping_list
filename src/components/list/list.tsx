import { useMemo } from 'react';
import { AnimatePresence, Reorder } from 'framer-motion';

import { useStore } from '@/lib/store';
import type { ListItemType } from '@/lib/types';
import { ListItem } from './list-item';
import { ListSelect } from './list-select';

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
        {notSelectedList.length === 0 ? (
          <div className="flex justify-center">
            <span className="my-4 font-bold text-2xl">All products bought</span>
          </div>
        ) : null}

        <Reorder.Group
          as="div"
          axis="y"
          className="my-8 flex flex-col gap-8 sm:gap-1"
          values={Object.entries(list.items)}
          onReorder={() => null}
        >
          <AnimatePresence initial={false}>
            {notSelectedList.map(([id, items]) => (
              <ListItem listItem={items} key={id} listItemId={id} />
            ))}
            <hr className="my-4" />
            {selectedList.map(([id, items]) => (
              <ListItem listItem={items} key={id} listItemId={id} />
            ))}
          </AnimatePresence>
        </Reorder.Group>
      </div>
    </div>
  );
}
