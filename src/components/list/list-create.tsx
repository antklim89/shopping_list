import { FaPlus } from 'react-icons/fa6';

import { listCreate } from '@/lib/store';

export function ListCreate() {
  return (
    <button className="btn-primary" type="button" onClick={() => listCreate()}>
      <FaPlus />
      <span className="hidden sm:inline">Add New List</span>
    </button>
  );
}
