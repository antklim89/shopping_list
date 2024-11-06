import { FaTrash } from 'react-icons/fa6';
import { useStore } from '@/lib/store';


export function RemoveList() {
  const listRevome = useStore(state => state.listRevome);
  const currentListId = useStore(state => state.currentListId);
  const listsLength = useStore(state => Object.keys(state.lists).length);
  const list = useStore(state => state.lists[currentListId]);

  return (
    <button
      className="btn-error"
      disabled={listsLength <= 1 || list == null}
      type="button"
      onClick={() => listRevome(currentListId)}
    >
      <FaTrash />
      <span className="ml-2 hidden md:inline">Remove List</span>
    </button>
  );
}
