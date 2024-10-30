import { FaDownload } from 'react-icons/fa6';
import { useStore } from '@/lib/store';
import { saveListToFile } from '@/lib/utils';
import { Button } from './ui/button';


export function SaveToFile() {
  const currentListId = useStore(state => state.currentListId);
  const lists = useStore(state => state.lists[currentListId]);
  if (!lists) return null;

  return (
    <Button onClick={() => saveListToFile(currentListId, lists)}>
      <FaDownload />
      <span className="ml-2 hidden md:inline">Save To File</span>
    </Button>
  );
}
