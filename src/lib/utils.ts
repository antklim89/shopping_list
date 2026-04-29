import type { ListShareType, ListType } from './types';

export function generateId(): string {
  return (Math.random() * 1000).toString(36);
}

export function loadListFromFile(file: File): Promise<ListShareType> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      try {
        const fileText = reader.result;
        if (typeof fileText !== 'string') return;
        const fileJson = JSON.parse(fileText) as ListShareType;

        resolve(fileJson);
      } catch (error) {
        reject(error);
      }
    });

    reader.readAsText(file);
  });
}

export function saveListToFile(id: string, list: ListType): void {
  const blob = new Blob([
    JSON.stringify({
      id,
      list,
    }),
  ]);
  const fileName = `Shopping List - ${list.name}.json`;

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

export function loadListFromUrl(): ListShareType | null {
  const listString = new URLSearchParams(location.search).get('share');
  if (listString == null) return null;
  history.replaceState(null, '', location.origin);

  try {
    const listJson = JSON.parse(listString) as ListShareType;
    return listJson;
  } catch {
    return null;
  }
}

export async function share({ currentListId, list }: { currentListId?: string; list?: ListType }) {
  if (currentListId == null) return;
  if (list == null) return;

  const shareData: ListShareType = { id: currentListId, list };
  const url = `${location.href}?share=${encodeURIComponent(JSON.stringify(shareData))}`;

  try {
    if (navigator.share != null) await navigator.share({ url });
  } catch (error) {
    console.error(error);
  }
}

export const copyLink = async (shareData: ListShareType) => {
  const url = `${location.href}?share=${encodeURIComponent(JSON.stringify(shareData))}`;

  try {
    await navigator.clipboard.writeText(url);
  } catch (error) {
    console.error(error);
  }
};
