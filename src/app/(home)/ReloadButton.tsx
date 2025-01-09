"use client";

import { useState } from "react";
import { useReloadUpdate } from "./ReloadContex";
import { Spinner } from "./spinner";

export default function Reload() {
  const reloadUpdate = useReloadUpdate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    reloadUpdate();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <button
      className={`flex w-full justify-center items-center h-10 ${
        isLoading ? "animate-spin" : ""
      }`}
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading ? <Spinner /> : "Reload"}
    </button>
  );
}
