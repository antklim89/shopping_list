import { FaPlus } from 'react-icons/fa6';
import { useStore } from '@/lib/store';


export function ListCreate() {
  const listCreate = useStore(state => state.listCreate);

  return (
    <button className="btn-primary" type="button" onClick={() => listCreate()}>
      <FaPlus />
      <span className="ml-2 hidden md:inline">Add New List</span>
    </button>
  );
}
