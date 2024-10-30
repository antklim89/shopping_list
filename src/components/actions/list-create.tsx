import { FaPlus } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';


export function ListCreate() {
  const listItemAdd = useStore(state => state.listItemAdd);
  const currentListId = useStore(state => state.currentListId);

  return (
    <Button onClick={() => listItemAdd(currentListId)}>
      <FaPlus />
      <span className="ml-2 hidden md:inline">Add Item</span>
    </Button>
  );
}
