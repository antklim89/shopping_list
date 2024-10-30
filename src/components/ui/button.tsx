import { type ComponentProps, forwardRef } from 'react';
import { cn } from '@/lib/utils';


export const Button = forwardRef<HTMLButtonElement, ComponentProps<'button'>>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={cn('flex justify-center items-center disabled:bg-slate-300 bg-primary-500 hover:bg-primary-600 text-white border-2 border-primary-200 px-6 py-2 transition-colors uppercase shadow-lg', className)}
    />
  );
});
Button.displayName = 'Button';
