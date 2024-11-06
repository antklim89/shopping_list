import { FaCheckDouble, FaMinus } from 'react-icons/fa6';
import { useStore } from '@/lib/store';


export function SelectAll() {
  const currentListId = useStore(state => state.currentListId);
  const listItemSelectAll = useStore(state => state.listItemSelectAll);
  const listItemsLength = useStore(state => Object.keys(state.lists[currentListId]?.items || {}).length);

  const isAllSelected = useStore((state) => {
    const list = state.lists[currentListId];
    if (list == null) return false;
    return Object.entries(list.items).every(([_, listItem]) => listItem.selected);
  });

  return (
    <button
      className="btn-primary"
      disabled={listItemsLength === 0}
      type="button"
      onClick={() => listItemSelectAll(currentListId)}
    >
      {isAllSelected
        ? (
            <>
              <FaMinus />
              <span className="ml-2 hidden md:inline">Nothing Bought</span>
            </>
          )
        : (
            <>
              <FaCheckDouble />
              <span className="ml-2 hidden md:inline">All Bought</span>
            </>
          )}
    </button>
  );
}
