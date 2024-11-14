import { useMemo } from 'react';
import { AnimatePresence, Reorder } from 'framer-motion';
import { useStore } from '@/lib/store';
import type { ListItemType } from '@/lib/types';
import { ListItem } from './list-item';


export function List() {
  const currentListId = useStore(state => state.currentListId);
  const listSetName = useStore(state => state.listSetName);
  const list = useStore(state => state.lists[currentListId]);

  const [selected, notSelected] = useMemo(() => {
    if (!list) return [[], []];
    const selectedResult: [string, ListItemType][] = [];
    const notSelectedResult: [string, ListItemType][] = [];

    for (const item of Object.entries(list.items)) {
      if (item[1].selected) selectedResult.push(item);
      else notSelectedResult.push(item);
    }

    return [selectedResult, notSelectedResult];
  }, [list]);
  if (!list) return null;


  return (
    <div className=" overflow-hidden">
      <div className="text-2xl font-bold my-4">
        <input
          className="border p-2 w-full max-w-[50rem]"
          placeholder="List name"
          type="text"
          value={list.name}
          onChange={e => listSetName(currentListId, e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-10 sm:gap-4 my-8">
        <AnimatePresence initial={false}>
          <Reorder.Group
            axis="y"
            values={Object.entries(list?.items)}
            onReorder={() => null}
          >
            {notSelected.length === 0
              ? (
                  <div className="flex justify-center">
                    <span className="text-2xl my-4 font-bold">All products bought</span>
                  </div>
                )
              : null}
            {notSelected.map(([id, items]) => (
              <ListItem items={items} key={id} listItemId={id} />
            ))}
            <hr className="my-4" />
            {selected.map(([id, items]) => (
              <ListItem items={items} key={id} listItemId={id} />
            ))}
          </Reorder.Group>
        </AnimatePresence>
      </div>
    </div>
  );
}
