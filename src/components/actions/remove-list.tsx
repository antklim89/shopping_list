import { FaTrash } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';


export function RemoveList() {
  const listRevome = useStore(state => state.listRevome);
  const currentListId = useStore(state => state.currentListId);
  const listsLength = useStore(state => Object.keys(state.lists).length);
  const list = useStore(state => state.lists[currentListId]);

  return (
    <Button
      className="bg-red-800 hover:bg-red-900"
      disabled={listsLength <= 1 || list == null}
      onClick={() => listRevome(currentListId)}
    >
      <FaTrash />
      <span className="ml-2 hidden md:inline">Remove List</span>
    </Button>
  );
}
