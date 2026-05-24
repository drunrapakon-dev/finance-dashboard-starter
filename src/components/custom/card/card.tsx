import type { ReactNode } from "react";

type CardProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Card({ title, description, action, children, className = "" }: CardProps) {
  return (
    <article
      className={`rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${className}`}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</h3>
          {description ? (
            <p className="text-xs text-zinc-400 dark:text-zinc-500">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </header>
      <div className={action ? "mt-6" : "mt-4"}>{children}</div>
    </article>
  );
}
