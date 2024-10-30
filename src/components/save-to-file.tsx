import { FaDownload } from 'react-icons/fa6';
import { useStore } from '@/lib/store';
import { saveListToFile } from '@/lib/utils';
import { Button } from './ui/button';


export function SaveToFile() {
  const currentListId = useStore(state => state.currentListId);
  const list = useStore(state => state.lists[currentListId]);
  const listsLength = useStore(state => Object.keys(state.lists[currentListId]?.items || {}).length);

  if (listsLength === 0) return null;
  if (!list) return null;

  return (
    <Button onClick={() => saveListToFile(currentListId, list)}>
      <FaDownload />
      <span className="ml-2 hidden md:inline">Save To File</span>
    </Button>
  );
}
