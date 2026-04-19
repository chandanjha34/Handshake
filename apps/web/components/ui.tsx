import { cn } from '@/lib/utils';
import type { HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-2xl border border-border bg-panel p-6', className)} {...props} />;
}

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'rounded-xl border border-border px-4 py-2 text-sm transition hover:border-accent disabled:opacity-50',
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
        'w-full rounded-xl border border-border bg-[#0f1012] px-4 py-2 text-sm text-white outline-none ring-accent/50 focus:ring',
        className
      )}
      {...props}
    />
  );
}
