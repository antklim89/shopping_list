import { FaCopy } from 'react-icons/fa6';
import { useStore } from '@/lib/store';
import type { ListShareType } from '@/lib/types';


export function CopyLink() {
  const currentListId = useStore(state => state.currentListId);
  const list = useStore(state => state.lists[currentListId]);

  if (list == null) return null;
  if (navigator.clipboard?.writeText == null) return null;

  const copyLink = async () => {
    const shareData: ListShareType = { id: currentListId, list };
    const url = `${location.href}?share=${encodeURIComponent(JSON.stringify(shareData))}`;

    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="btn-primary" type="button" onClick={async () => copyLink()}>
      <FaCopy />
      <span className="ml-2 hidden md:inline">Copy URL</span>
    </button>
  );
}
