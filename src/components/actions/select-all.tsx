import { FaCheckDouble, FaMinus } from 'react-icons/fa6';

import { checkIsAllSelected, getCurrentListItemsLength, listItemSelectAll, useStore } from '@/lib/store';

export function SelectAll() {
  const listsItemsLength = useStore(getCurrentListItemsLength);
  const isAllSelected = useStore(checkIsAllSelected);

  return (
    <button className="btn-primary" disabled={listsItemsLength === 0} type="button" onClick={listItemSelectAll}>
      {isAllSelected ? (
        <>
          <FaMinus />
          <span className="hidden sm:inline">Nothing Bought</span>
        </>
      ) : (
        <>
          <FaCheckDouble />
          <span className="hidden sm:inline">All Bought</span>
        </>
      )}
    </button>
  );
}
