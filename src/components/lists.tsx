import { FaPlus } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';


export function Lists() {
  const lists = useStore(state => state.lists);
  const listSetCurrentId = useStore(state => state.listSetCurrentId);
  const listCreate = useStore(state => state.listCreate);


  return (
    <div className="flex flex-col gap-2 my-8">
      <Button className="bg-green-600 hover:bg-green-700" onClick={() => listCreate()}>
        <FaPlus className="mr-2" />
        Add New List
      </Button>
      {Object.entries(lists).map(([id, list]) => (
        <Button key={id} onClick={() => listSetCurrentId(id)}>
          {list.name || 'List'}
        </Button>
      ))}
    </div>
  );
}
