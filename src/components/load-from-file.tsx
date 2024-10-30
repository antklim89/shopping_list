import { type ChangeEvent, useRef } from 'react';
import { useStore } from '@/lib/store';
import { loadListFromFile } from '@/lib/utils';
import { Button } from './ui/button';


export function LoadFromFile() {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentListId = useStore(state => state.currentListId);
  const lists = useStore(state => state.lists[currentListId]);
  const listLoad = useStore(state => state.listLoad);
  if (!lists) return null;

  const handleFileLoad = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await loadListFromFile(file);
    listLoad(data.id, data.list);
    e.target.value = '';
  };


  return (
    <Button className="btn" onClick={() => inputRef.current?.click()}>
      Load From File
      <input
        accept=".json"
        className="hidden"
        ref={inputRef}
        type="file"
        onChange={handleFileLoad}
      />
    </Button>
  );
}
