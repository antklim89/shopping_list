import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';


export function Button({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      {...props}
      className={cn('bg-primary-500 hover:bg-primary-600 text-white border-2 border-primary-200 px-6 py-2 transition-colors uppercase', className)}
    />
  );
}
