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
          <span className="sr-only sm:not-sr-only">Nothing Bought</span>
        </>
      ) : (
        <>
          <FaCheckDouble />
          <span className="sr-only sm:not-sr-only">All Bought</span>
        </>
      )}
    </button>
  );
}
