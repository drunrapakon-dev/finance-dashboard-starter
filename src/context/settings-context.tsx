"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CurrencyCode = "USD" | "THB" | "EUR" | "GBP";

export type NotificationPreferences = {
  monthlySummary: boolean;
  weeklyReports: boolean;
  expenseAlerts: boolean;
};

export type UserProfile = {
  fullName: string;
  email: string;
  companyName: string;
};

type SettingsState = {
  profile: UserProfile;
  currency: CurrencyCode;
  notifications: NotificationPreferences;
};

type SettingsContextValue = SettingsState & {
  setProfile: (profile: Partial<UserProfile>) => void;
  setCurrency: (currency: CurrencyCode) => void;
  setNotification: (
    key: keyof NotificationPreferences,
    enabled: boolean,
  ) => void;
};

const defaultProfile: UserProfile = {
  fullName: "Super Admin",
  email: "super-admin@example.com",
  companyName: "Acme Finance",
};

const defaultNotifications: NotificationPreferences = {
  monthlySummary: true,
  weeklyReports: true,
  expenseAlerts: false,
};

const defaultState: SettingsState = {
  profile: defaultProfile,
  currency: "USD",
  notifications: defaultNotifications,
};

const STORAGE_KEY = "finance-dashboard-settings";

const SettingsContext = createContext<SettingsContextValue | null>(null);

function readStoredSettings(): SettingsState {
  if (typeof window === "undefined") {
    return defaultState;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultState;
    }

    const parsed = JSON.parse(raw) as Partial<SettingsState>;
    return {
      profile: { ...defaultProfile, ...parsed.profile },
      currency: parsed.currency ?? defaultState.currency,
      notifications: { ...defaultNotifications, ...parsed.notifications },
    };
  } catch {
    return defaultState;
  }
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SettingsState>(defaultState);

  useEffect(() => {
    setState(readStoredSettings());
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setProfile = useCallback((profile: Partial<UserProfile>) => {
    setState((current) => ({
      ...current,
      profile: { ...current.profile, ...profile },
    }));
  }, []);

  const setCurrency = useCallback((currency: CurrencyCode) => {
    setState((current) => ({ ...current, currency }));
  }, []);

  const setNotification = useCallback(
    (key: keyof NotificationPreferences, enabled: boolean) => {
      setState((current) => ({
        ...current,
        notifications: { ...current.notifications, [key]: enabled },
      }));
    },
    [],
  );

  const value = useMemo(
    () => ({
      ...state,
      setProfile,
      setCurrency,
      setNotification,
    }),
    [setCurrency, setNotification, setProfile, state],
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }

  return context;
}
