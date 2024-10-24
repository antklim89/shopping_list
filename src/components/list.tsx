import { useStore } from '@/lib/store';
import { ListItem } from './list-item';


export function List() {
  const currentListId = useStore(state => state.currentListId);
  const listSetName = useStore(state => state.listSetName);
  const list = useStore(state => state.lists[currentListId]);
  if (!list) return null;

  return (
    <div className="">
      <div className="text-2xl font-bold my-4">
        <input
          className="bg-white border border-slate-400 shadow-xl p-2 w-full max-w-[50rem]"
          placeholder="List name"
          type="text"
          value={list.name}
          onChange={e => listSetName(currentListId, e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 my-8 bg-white">
        {Object.entries(list?.items)
          .map(([id, items]) => (
            <ListItem items={items} key={id} listItemId={id} />
          ))}
      </div>
    </div>
  );
}
