import { AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { ListItem } from './list-item';


export function List() {
  const currentListId = useStore(state => state.currentListId);
  const listSetName = useStore(state => state.listSetName);
  const list = useStore(state => state.lists[currentListId]);
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
        <AnimatePresence initial={false} key={currentListId}>
          {Object.entries(list?.items).map(([id, items]) => (
            <ListItem items={items} key={id} listItemId={id} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
