import { FaTrash } from 'react-icons/fa6';

import { getListsLength, listRemove, useStore } from '@/lib/store';

export function ListRemove({ listId }: { listId: string }) {
  const listsLength = useStore(getListsLength);

  return (
    <button className="btn-error" disabled={listsLength <= 1} type="button" onClick={() => listRemove(listId)}>
      <FaTrash />
    </button>
  );
}
