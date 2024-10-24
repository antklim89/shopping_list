import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';


export function ListCreate() {
  const listItemAdd = useStore(state => state.listItemAdd);
  const currentListId = useStore(state => state.currentListId);

  return (
    <Button onClick={() => listItemAdd(currentListId)}>Add Item</Button>
  );
}
