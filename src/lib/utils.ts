import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { FileList, List } from './types';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return (Math.random() * 1000).toString(36);
}

export async function loadListFromFile(file: File): Promise<FileList> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      try {
        const fileText = reader.result;
        if (typeof fileText !== 'string') return;
        const fileJson = JSON.parse(fileText) as FileList;

        resolve(fileJson);
      } catch (error) {
        reject(error);
      }
    });

    reader.readAsText(file);
  });
}

export function saveListToFile(id: string, list: List): void {
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
