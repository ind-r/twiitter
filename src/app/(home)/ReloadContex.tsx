"use client";
import { createContext, useContext, useState } from "react";

const ReloadContext = createContext<boolean>(false);
const ReloadUpdateContext = createContext<() => void>(() => {});

export function useReload() {
  return useContext(ReloadContext);
}

export function useReloadUpdate() {
  return useContext(ReloadUpdateContext);
}

export function ReloadProvider({ children }: { children: React.ReactNode }) {
  const [reload, setReload] = useState(false);

  function toggleReload() {
    setReload(!reload);
  }
  return (
    <ReloadContext.Provider value={reload}>
      <ReloadUpdateContext.Provider value={toggleReload}>
        {children}
      </ReloadUpdateContext.Provider>
    </ReloadContext.Provider>
  );
}
