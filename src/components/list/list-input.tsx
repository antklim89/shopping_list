import type { ChangeEvent } from 'react';

import { listSetName, useStore } from '@/lib/store';

export function ListInput() {
  const currentListId = useStore(state => state.currentListId);
  const list = useStore(state => state.lists[currentListId]);

  if (!list) return null;

  function handleListNameChange(e: ChangeEvent<HTMLInputElement>) {
    listSetName(currentListId, e.target.value);
  }

  return (
    <input
      className="w-full py-6 font-bold text-3xl"
      placeholder="Enter list name..."
      type="text"
      value={list.name}
      onChange={handleListNameChange}
    />
  );
}
