import { FaDownload } from 'react-icons/fa6';

import { getCurrentListItemsLength, useStore } from '@/lib/store';
import { saveListToFile } from '@/lib/utils';

export function SaveToFile() {
  const currentListId = useStore(state => state.currentListId);
  const list = useStore(state => state.lists[currentListId]);
  const listsItemsLength = useStore(getCurrentListItemsLength);

  const handleSaveListToFile = () => {
    if (!list) return;
    saveListToFile(currentListId, list);
  };

  return (
    <button className="btn-primary" disabled={listsItemsLength === 0} type="button" onClick={handleSaveListToFile}>
      <FaDownload />
      <span className="sr-only ml-2 sm:not-sr-only">Save To File</span>
    </button>
  );
}
