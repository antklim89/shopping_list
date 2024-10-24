import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';


export function SelectAll() {
  const currentListId = useStore(state => state.currentListId);
  const listItemSelectAll = useStore(state => state.listItemSelectAll);
  const isAllSelected = useStore((state) => {
    const list = state.lists[currentListId];
    if (list == null) return false;
    return Object.entries(list.items).every(([_, listItem]) => listItem.selected);
  });

  return (
    <Button onClick={() => listItemSelectAll(currentListId)}>{isAllSelected ? 'Nothing Bought' : 'All Bought'}</Button>
  );
}
