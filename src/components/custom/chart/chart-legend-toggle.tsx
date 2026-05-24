"use client";

export type ChartLegendItem = {
  key: string;
  label: string;
  color: string;
};

type ChartLegendToggleProps = {
  items: ChartLegendItem[];
  hiddenKeys: Set<string>;
  onToggle: (key: string) => void;
};

export function ChartLegendToggle({
  items,
  hiddenKeys,
  onToggle,
}: ChartLegendToggleProps) {
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-2">
      {items.map((item) => {
        const isHidden = hiddenKeys.has(item.key);

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onToggle(item.key)}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition ${
              isHidden
                ? "border-zinc-200 bg-zinc-50 text-zinc-400 line-through dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-500"
                : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
            }`}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: isHidden ? "#d4d4d8" : item.color }}
            />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
