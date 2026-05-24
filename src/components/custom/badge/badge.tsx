import type { ReactNode } from "react";

const badgeVariants = {
  default:
    "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
  success:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  warning:
    "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  danger: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300",
  food: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  software: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  salary: "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
  marketing: "bg-pink-50 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300",
  office: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
} as const;

export type BadgeVariant = keyof typeof badgeVariants;

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeVariants[variant]}`}
    >
      {children}
    </span>
  );
}
