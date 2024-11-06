import { type ComponentProps, forwardRef } from 'react';
import { cn } from '@/lib/utils';


const classes = {
  default: 'border-primary-border bg-primary hover:bg-primary-dark text-primary-foreground disabled:bg-primary-light',
  success: 'border-success-border bg-success hover:bg-success-dark text-success-foreground disabled:bg-success-light',
  error: 'border-error-border bg-error hover:bg-error-dark text-error-foreground disabled:bg-error-light',
};

export const Button = forwardRef<HTMLButtonElement, ComponentProps<'button'> & { variant?: keyof typeof classes }>(({
  className,
  variant = 'default',
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={cn(
        // 'flex justify-center items-center border px-6 py-2 transition-colors uppercase',
        classes[variant],
        className,
      )}
    />
  );
});
Button.displayName = 'Button';
