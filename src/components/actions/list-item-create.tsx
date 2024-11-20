import { FaPlus } from 'react-icons/fa6';
import { useStore } from '@/lib/store';


export function ListItemCreate() {
  const listItemAdd = useStore(state => state.listItemAdd);
  const currentListId = useStore(state => state.currentListId);

  return (
    <button className="btn-primary" type="button" onClick={() => listItemAdd(currentListId)}>
      <FaPlus />
      <span className="ml-2 hidden md:inline">Add Item</span>
    </button>
  );
}
