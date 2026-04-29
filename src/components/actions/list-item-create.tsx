import { FaPlus } from 'react-icons/fa6';

import { listItemAdd } from '@/lib/store';

export function ListItemCreate() {
  function handleListItemAdd() {
    listItemAdd();
  }

  return (
    <button className="btn-primary" type="button" onClick={handleListItemAdd}>
      <FaPlus />
      <span className="hidden sm:inline">Add Item</span>
    </button>
  );
}
