import { FaPlus } from 'react-icons/fa6';
import { useStore } from '@/lib/store';


export function Lists() {
  const lists = useStore(state => state.lists);
  const listSetCurrentId = useStore(state => state.listSetCurrentId);
  const listCreate = useStore(state => state.listCreate);


  return (
    <div className="flex flex-col gap-2 my-8">
      <button className="btn-success" type="button" onClick={() => listCreate()}>
        <FaPlus className="mr-2" />
        Add New List
      </button>
      {Object.entries(lists).map(([id, list]) => (
        <button
          className="btn-primary"
          key={id}
          type="button"
          onClick={() => listSetCurrentId(id)}
        >
          {list.name || 'List'}
        </button>
      ))}
    </div>
  );
}
