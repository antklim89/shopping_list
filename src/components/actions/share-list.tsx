import { FaShare } from 'react-icons/fa6';

import { useStore } from '@/lib/store';
import { share } from '@/lib/utils';

export function ShareList() {
  const currentListId = useStore(state => state.currentListId);
  const list = useStore(state => state.lists[currentListId]);

  if (!navigator.share) return;

  function handleShare() {
    void share({ currentListId, list });
  }

  return (
    <button className="btn-primary" type="button" onClick={handleShare}>
      <FaShare />
      <span className="ml-2 hidden sm:inline">Share</span>
    </button>
  );
}
