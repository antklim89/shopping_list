import { type ChangeEvent, useRef } from 'react';
import { FaUpload } from 'react-icons/fa6';

import { getCurrentListItemsLength, listLoad, useStore } from '@/lib/store';
import { loadListFromFile } from '@/lib/utils';

export function LoadFromFile() {
  const inputRef = useRef<HTMLInputElement>(null);
  const listsItemsLength = useStore(getCurrentListItemsLength);

  const handleFileLoad = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await loadListFromFile(file);
    listLoad(data.id, data.list);
    e.target.value = '';
  };

  return (
    <button
      className="btn-primary"
      disabled={listsItemsLength === 0}
      type="button"
      onClick={() => inputRef.current?.click()}
    >
      <FaUpload />
      <span className="ml-2 hidden sm:inline">Load From File</span>
      <input accept=".json" className="hidden" ref={inputRef} type="file" onChange={handleFileLoad} />
    </button>
  );
}
