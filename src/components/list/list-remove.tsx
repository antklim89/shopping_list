import { FaTrash } from 'react-icons/fa6';

import { listRemove, useStore } from '@/lib/store';

export function ListRemove({ listId }: { listId: string }) {
  const listsLength = useStore(state => Object.keys(state.lists).length);
  const list = useStore(state => state.lists[listId]);

  return (
    <button
      className="btn-error"
      disabled={listsLength <= 1 || list == null}
      type="button"
      onClick={() => listRemove(listId)}
    >
      <FaTrash />
    </button>
  );
}
