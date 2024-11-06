import { FaCopy, FaShare } from 'react-icons/fa6';
import { useStore } from '@/lib/store';
import type { ListShareType } from '@/lib/types';


export function ShareList() {
  const currentListId = useStore(state => state.currentListId);
  const list = useStore(state => state.lists[currentListId]);

  if (list == null) return null;
  if (navigator.share == null && navigator.share == null) return null;

  const share = async () => {
    const shareData: ListShareType = { id: currentListId, list };
    const url = `${location.href}?share=${encodeURIComponent(JSON.stringify(shareData))}`;

    try {
      if (navigator.share != null) await navigator.share({ url });
      else if (navigator.share != null) await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="btn-primary" type="button" onClick={async () => share()}>
      {navigator.share == null
        ? (
            <>
              <FaCopy />
              <span className="ml-2 hidden md:inline">Copy URL</span>
            </>
          )
        : (
            <>
              <FaShare />
              <span className="ml-2 hidden md:inline">Share</span>
            </>
          )}
    </button>
  );
}
