"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen m-auto">
      <h2>Something went wrong!</h2>
      <button
        className="bg-green-300 text-white rounded-xl p-3"
        onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
