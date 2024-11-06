import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';


export function Input({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      className={cn('w-full min-w-20 p-2 border bg-primary text-primary-foreground border-primary-border placeholder:text-gray-400', className)}
      {...props}
    />
  );
}
