import { AppShell } from "@/components/layout/app-shell";
import { DashboardProvider } from "@/context/dashboard-context";
import { SettingsProvider } from "@/context/settings-context";

export default function ShellLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SettingsProvider>
      <DashboardProvider>
        <AppShell>{children}</AppShell>
      </DashboardProvider>
    </SettingsProvider>
  );
}
