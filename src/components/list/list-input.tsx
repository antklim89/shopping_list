import { listSetName, useStore } from '@/lib/store';

export function ListInput() {
  const currentListId = useStore(state => state.currentListId);
  const list = useStore(state => state.lists[currentListId]);

  if (!list) return null;

  return (
    <input
      className="w-full border p-2 font-bold text-2xl"
      placeholder="List name"
      type="text"
      value={list.name}
      onChange={e => listSetName(currentListId, e.target.value)}
    />
  );
}
