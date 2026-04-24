import { FaShare } from 'react-icons/fa6';

import { useStore } from '@/lib/store';
import type { ListShareType } from '@/lib/types';

export function ShareList() {
  const currentListId = useStore(state => state.currentListId);
  const list = useStore(state => state.lists[currentListId]);

  if (list == null) return null;
  if (navigator.share == null) return null;

  const share = async () => {
    const shareData: ListShareType = { id: currentListId, list };
    const url = `${location.href}?share=${encodeURIComponent(JSON.stringify(shareData))}`;

    try {
      if (navigator.share != null) await navigator.share({ url });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="btn-primary" type="button" onClick={async () => share()}>
      <FaShare />
      <span className="ml-2 hidden sm:inline">Share</span>
    </button>
  );
}
