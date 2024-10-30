import { type ComponentProps, forwardRef } from 'react';
import { cn } from '@/lib/utils';


export const Button = forwardRef<HTMLButtonElement, ComponentProps<'button'>>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={cn('flex justify-center items-center border border-primary-600 disabled:bg-primary-200 bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 transition-colors uppercase', className)}
    />
  );
});
Button.displayName = 'Button';
