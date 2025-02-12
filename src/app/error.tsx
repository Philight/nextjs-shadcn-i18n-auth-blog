'use client';

import { useEffect } from 'react';
import ServerError from '@/molecules/ServerError';

// ============================================================================

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service

    console.error(error);
  }, [error]);

  return (
    <ServerError
      onClick={
        // Attempt to recover by trying to re-render the segment
        () => reset()
      }
    />
  );
}
