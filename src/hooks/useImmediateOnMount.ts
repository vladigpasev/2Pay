import { useState } from 'react';

export function useImmediateOnMount(callback: () => any) {
  const [hasRan, setHasRan] = useState(false);

  if (!hasRan) {
    callback();
    setHasRan(true);
  }
}
