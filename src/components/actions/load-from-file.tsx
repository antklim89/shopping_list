import { type ChangeEvent, useRef } from 'react';
import { FaUpload } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { loadListFromFile } from '@/lib/utils';


export function LoadFromFile() {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentListId = useStore(state => state.currentListId);
  const list = useStore(state => state.lists[currentListId]);
  const listLoad = useStore(state => state.listLoad);
  const listsItemsLength = useStore(state => Object.keys(state.lists[currentListId]?.items || {}).length);


  const handleFileLoad = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await loadListFromFile(file);
    listLoad(data.id, data.list);
    e.target.value = '';
  };


  return (
    <Button
      className="btn"
      disabled={listsItemsLength === 0 || list == null}
      onClick={() => inputRef.current?.click()}
    >
      <FaUpload />
      <span className="ml-2 hidden md:inline">Load From File</span>
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
