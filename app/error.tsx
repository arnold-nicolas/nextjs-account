'use client';
 
import { useEffect } from 'react';
 
/**
 * The Error component in TypeScript React displays an error message and provides an option to reset
 * and try again.
 *
 * @param {Error} error - error Object.
 * @param {} reset
 *
 * @returns The `Error` component is being returned. It displays a message "Something went wrong!" and
 * a button labeled "Try again" that, when clicked, calls the `reset` function to attempt to recover by
 * re-rendering the invoices route. The component also logs the error to the console using
 * `console.error(error)` within a `useEffect` hook.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}