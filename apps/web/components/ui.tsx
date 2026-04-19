import { cn } from '@/lib/utils';
import type { HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const quirkyStyles = [
    'rounded-[20px_25px_18px_22px]',
    'rounded-[24px_18px_22px_20px]',
    'rounded-[18px_22px_20px_24px]',
    'rounded-[22px_20px_24px_18px]'
  ];
  const randomQuirky = quirkyStyles[Math.floor(Math.random() * quirkyStyles.length)];
  
  return (
    <div
      className={cn(
        `${randomQuirky} border border-border bg-panel p-6 shadow-sm hover:shadow-md`,
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
        'rounded-[16px_20px_14px_18px] border border-accent px-6 py-3 text-sm font-medium text-white bg-accent transition hover:bg-accent-dark disabled:opacity-50 shadow-sm hover:shadow-md',
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
