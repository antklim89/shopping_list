import { FaTrash } from 'react-icons/fa6';
import { useStore } from '@/lib/store';
import { Button } from './ui/button';


export function RemoveList() {
  const listRevome = useStore(state => state.listRevome);
  const currentListId = useStore(state => state.currentListId);
  const listsLength = useStore(state => Object.keys(state.lists).length);
  const list = useStore(state => state.lists[currentListId]);

  if (!list) return null;
  if (listsLength <= 1) return null;

  return (
    <Button onClick={() => listRevome(currentListId)}>
      <FaTrash />
      <span className="ml-2 hidden md:inline">Remove List</span>
    </Button>
  );
}
