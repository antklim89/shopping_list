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
      <div>
        {notSelected.length === 0
          ? (
              <div className="flex justify-center">
                <span className="text-2xl my-4 font-bold">All products bought</span>
              </div>
            )
          : null}

        <Reorder.Group
          as="div"
          axis="y"
          className="flex flex-col gap-8 sm:gap-1 my-8"
          values={Object.entries(list?.items)}
          onReorder={() => null}
        >
          <AnimatePresence initial={false}>

            {notSelected.map(([id, items]) => (
              <ListItem items={items} key={id} listItemId={id} />
            ))}
            <hr className="my-4" />
            {selected.map(([id, items]) => (
              <ListItem items={items} key={id} listItemId={id} />
            ))}
          </AnimatePresence>
        </Reorder.Group>
      </div>
    </div>
  );
}
