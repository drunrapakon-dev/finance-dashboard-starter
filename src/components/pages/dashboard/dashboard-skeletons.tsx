import { CardSkeleton } from "@/components/custom/skeleton/card-skeleton";
import { Skeleton } from "@/components/custom/skeleton/skeleton";
function KpiCardSkeleton() {
  return (
    <CardSkeleton>
      <Skeleton className="h-8 w-32" />
      <Skeleton className="mt-3 h-3 w-16" />
    </CardSkeleton>
  );
}

export function KpiCardsSkeleton() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }, (_, index) => (
        <KpiCardSkeleton key={index} />
      ))}
    </section>
  );
}

export function ChartCardSkeleton() {
  return (
    <CardSkeleton showAction>
      <div className="mb-4 flex flex-wrap gap-2">
        <Skeleton className="h-8 w-16 rounded-lg" />
        <Skeleton className="h-8 w-16 rounded-lg" />
        <Skeleton className="h-8 w-16 rounded-lg" />
        <Skeleton className="h-8 w-16 rounded-lg" />
      </div>
      <Skeleton className="h-72 w-full rounded-xl" />
      <div className="mt-4 flex justify-center gap-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-20" />
      </div>
    </CardSkeleton>
  );
}

export function TableCardSkeleton() {
  return (
    <CardSkeleton>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-10 w-full max-w-xs rounded-lg" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-10 w-full rounded-lg" />
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-12 w-full rounded-lg" />
        ))}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Skeleton className="h-9 w-20 rounded-lg" />
        <Skeleton className="h-9 w-20 rounded-lg" />
      </div>
    </CardSkeleton>
  );
}

function CategoryCardSkeleton() {
  return (
    <CardSkeleton>
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-7 w-20" />
      </div>
      <Skeleton className="mt-4 h-2 w-full rounded-full" />
    </CardSkeleton>
  );
}

export function CategoryCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function DashboardPageSkeleton() {
  return (
    <>
      <KpiCardsSkeleton />
      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ChartCardSkeleton />
        <ChartCardSkeleton />
      </section>
      <div className="mt-6">
        <TableCardSkeleton />
      </div>
    </>
  );
}

export function AnalyticsPageSkeleton() {
  return (
    <>
      <KpiCardsSkeleton />
      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ChartCardSkeleton />
        <ChartCardSkeleton />
      </section>
      <div className="mt-6">
        <ChartCardSkeleton />
      </div>
    </>
  );
}

export function TransactionsPageSkeleton() {
  return <TableCardSkeleton />;
}

export function CategoriesPageSkeleton() {
  return <CategoryCardsSkeleton />;
}
