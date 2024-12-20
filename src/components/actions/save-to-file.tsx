import { FaDownload } from 'react-icons/fa6';
import { useStore } from '@/lib/store';
import { saveListToFile } from '@/lib/utils';


export function SaveToFile() {
  const currentListId = useStore(state => state.currentListId);
  const list = useStore(state => state.lists[currentListId]);
  const listsLength = useStore(state => Object.keys(state.lists[currentListId]?.items || {}).length);

  return (
    <button
      className="btn-primary"
      disabled={listsLength === 0 || list == null}
      type="button"
      onClick={() => list && saveListToFile(currentListId, list)}
    >
      <FaDownload />
      <span className="ml-2 hidden md:inline">Save To File</span>
    </button>
  );
}
