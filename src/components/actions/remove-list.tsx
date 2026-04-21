import { FaTrash } from 'react-icons/fa6';

import { useStore } from '@/lib/store';

export function RemoveList() {
  const listRemove = useStore(state => state.listRemove);
  const currentListId = useStore(state => state.currentListId);
  const listsLength = useStore(state => Object.keys(state.lists).length);
  const list = useStore(state => state.lists[currentListId]);

  return (
    <button
      className="btn-error"
      disabled={listsLength <= 1 || list == null}
      type="button"
      onClick={() => listRemove(currentListId)}
    >
      <FaTrash />
      <span className="ml-2 hidden md:inline">Remove List</span>
    </button>
  );
}
