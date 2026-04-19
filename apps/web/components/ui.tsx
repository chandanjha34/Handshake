import { cn } from '@/lib/utils';
import type { HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-[20px_25px_18px_22px] border border-border/90 bg-panel/90 p-6 shadow-sm backdrop-blur-sm hover:shadow-md',
        className
      )}
      {...props}
    />
  );
}

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'rounded-[16px_20px_14px_18px] border border-accent px-6 py-3 text-sm font-semibold text-white bg-accent transition hover:bg-accent-dark disabled:opacity-50 shadow-sm hover:shadow-md',
        className
      )}
      {...props}
    />
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-[18px_14px_20px_16px] border border-border bg-bg-secondary px-4 py-3 text-sm text-text outline-none ring-accent/50 focus:ring-2 focus:border-accent',
        className
      )}
      placeholder="Enter value..."
      {...props}
    />
  );
}
