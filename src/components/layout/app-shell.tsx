"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarToggle } from "@/components/layout/sidebar-toggle";
import { SidebarProvider, useSidebar } from "@/context/sidebar-context";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

type AppShellProps = {
  children: React.ReactNode;
};

function AppShellLayout({ children }: AppShellProps) {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <div className="flex min-h-screen">
      {isOpen ? (
        <button
          type="button"
          aria-label={t("closeMenu")}
          className="fixed inset-0 z-30 bg-zinc-900/50 lg:hidden"
          onClick={close}
        />
      ) : null}

      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-900 lg:hidden">
          <SidebarToggle />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {t("brand")}
            </p>
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

export function AppShell({ children }: AppShellProps) {
  return (
    <SidebarProvider>
      <AppShellLayout>{children}</AppShellLayout>
    </SidebarProvider>
  );
}
