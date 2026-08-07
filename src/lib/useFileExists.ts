"use client";

import { useEffect, useState } from "react";

// Lets Resume/Footer buttons hide gracefully when public/resume.pdf
// (or any other static asset) hasn't been added yet.
export function useFileExists(path: string) {
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(path, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setExists(res.ok);
      })
      .catch(() => {
        if (!cancelled) setExists(false);
      });
    return () => {
      cancelled = true;
    };
  }, [path]);

  return exists;
}
