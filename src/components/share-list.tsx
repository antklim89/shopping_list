import { useStore } from '@/lib/store';
import type { ListShareType } from '@/lib/types';
import { Button } from './ui/button';


export function ShareList() {
  const currentListId = useStore(state => state.currentListId);
  const list = useStore(state => state.lists[currentListId]);

  if (list == null) return null;
  if (navigator.share == null) return null;

  const share = async () => {
    const shareData: ListShareType = { id: currentListId, list };
    const url = `${location.href}?share=${encodeURIComponent(JSON.stringify(shareData))}`;
    try {
      await navigator.share({ url });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={async () => share()}>Share</Button>
  );
}
