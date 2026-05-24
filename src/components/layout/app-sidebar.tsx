"use client";

import {
  isNavItemActive,
  sidebarNavItems,
} from "@/components/layout/sidebar-nav-items";
import { SidebarSettingsMenu } from "@/components/layout/sidebar-settings-menu";
import { useSidebar } from "@/context/sidebar-context";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function AppSidebar() {
  const t = useTranslations("Sidebar");
  const tDashboard = useTranslations("DashboardPage");
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-zinc-200 bg-white transition-transform duration-200 ease-out dark:border-zinc-800 dark:bg-zinc-900 lg:sticky lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="border-b border-zinc-200 px-5 py-5 dark:border-zinc-800">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
          {t("brand")}
        </p>
        <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
          {t("subtitle")}
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {sidebarNavItems.map((item) => {
          const isActive = isNavItemActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {item.icon}
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-zinc-200 p-4 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <p className="w-[80%] text-sm text-zinc-600 dark:text-zinc-400">
            {tDashboard("welcome")}
          </p>
          <div className="flex w-[20%] justify-end">
            <SidebarSettingsMenu />
          </div>
        </div>
      </div>
    </aside>
  );
}
