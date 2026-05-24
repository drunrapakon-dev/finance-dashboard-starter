"use client";

import { useCallback, useEffect, useState } from "react";

export function useHiddenKeys(resetKey: string) {
  const [hiddenKeys, setHiddenKeys] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setHiddenKeys(new Set());
  }, [resetKey]);

  const toggle = useCallback((key: string) => {
    setHiddenKeys((current) => {
      const next = new Set(current);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  return { hiddenKeys, toggle };
}
