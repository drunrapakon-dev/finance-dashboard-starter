import type { ReactNode } from "react";
import { Skeleton } from "@/components/custom/skeleton/skeleton";

type CardSkeletonProps = {
  className?: string;
  showAction?: boolean;
  children?: ReactNode;
};

export function CardSkeleton({
  className = "",
  showAction = false,
  children,
}: CardSkeletonProps) {
  return (
    <article
      className={`rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${className}`}
      aria-busy="true"
      aria-label="Loading"
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-36" />
        </div>
        {showAction ? <Skeleton className="h-10 w-[10.5rem] shrink-0 rounded-lg" /> : null}
      </header>
      <div className={showAction ? "mt-6" : "mt-4"}>{children}</div>
    </article>
  );
}
