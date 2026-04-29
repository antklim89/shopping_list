import { FaCopy } from 'react-icons/fa6';

import { useStore } from '@/lib/store';
import { copyLink } from '@/lib/utils';

export function CopyLink() {
  const currentListId = useStore(state => state.currentListId);
  const list = useStore(state => state.lists[currentListId]);

  if (!navigator.clipboard?.writeText) return null;
  if (!list) return;

  function handleCopyFile() {
    if (!list) return;
    void copyLink({ id: currentListId, list });
  }

  return (
    <button className="btn-primary" type="button" onClick={handleCopyFile}>
      <FaCopy />
      <span className="hidden sm:inline">Copy URL</span>
    </button>
  );
}
