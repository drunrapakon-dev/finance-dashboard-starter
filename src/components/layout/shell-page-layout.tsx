import type { ReactNode } from "react";

type ShellPageLayoutProps = {
  title: string;
  description?: string;
  toolbar?: ReactNode;
  children: ReactNode;
};

export function ShellPageLayout({
  title,
  description,
  toolbar,
  children,
}: ShellPageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {title}
            </h1>
            {description ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
            ) : null}
          </div>
          {toolbar ? <div className="shrink-0">{toolbar}</div> : null}
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-6 p-6">{children}</main>
    </div>
  );
}
