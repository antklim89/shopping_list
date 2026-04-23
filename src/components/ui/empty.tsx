import type { IconType } from 'react-icons';

export function Empty({ icon: Icon, title, message }: { title: string; message: string; icon: IconType }) {
  return (
    <div className="m-auto flex max-w-96 flex-col items-center gap-2 rounded-default border border-primary-border py-4">
      <Icon className="size-6" />
      <span className="text-2xl">{title}</span>
      <span>{message}</span>
    </div>
  );
}
