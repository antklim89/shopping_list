import { FaPlus } from 'react-icons/fa6';

import { listCreate } from '@/lib/store';

export function ListCreate() {
  function handleListCreate() {
    listCreate();
  }

  return (
    <button className="btn-primary" type="button" onClick={handleListCreate}>
      <FaPlus />
      <span className="sr-only sm:not-sr-only">Add New List</span>
    </button>
  );
}
