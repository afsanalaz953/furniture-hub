"use client";

import { useSyncExternalStore } from "react";

const subscribe = (callback) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

// Hydration-safe localStorage read: renders null on the server and during the
// first (server-matched) client render, then re-renders with the stored value.
const useLocalStorageItem = (key) =>
  useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key),
    () => null
  );

export default useLocalStorageItem;
