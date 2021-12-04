import { useRef, useEffect } from 'react';

// used to confirm that the current render isn't the first render
export function useFirstRender() {
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
}