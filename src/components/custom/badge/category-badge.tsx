import {
  expenseCategoryColors,
  type ExpenseCategoryKey,
} from "@/lib/mock/expense-categories";
import type { ReactNode } from "react";

type CategoryBadgeProps = {
  category: ExpenseCategoryKey;
  children: ReactNode;
};

export function CategoryBadge({ category, children }: CategoryBadgeProps) {
  const color = expenseCategoryColors[category];

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{
        color,
        backgroundColor: `color-mix(in srgb, ${color} 18%, transparent)`,
      }}
    >
      {children}
    </span>
  );
}
