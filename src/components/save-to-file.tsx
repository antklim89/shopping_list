import { useStore } from '@/lib/store';
import { saveListToFile } from '@/lib/utils';
import { Button } from './ui/button';


export default function SaveToFile() {
  const currentListId = useStore(state => state.currentListId);
  const lists = useStore(state => state.lists[currentListId]);
  if (!lists) return null;

  return (
    <Button onClick={() => saveListToFile(currentListId, lists)}>
      Save To File
    </Button>
  );
}
