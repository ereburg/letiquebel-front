import { useEffect, useState } from 'react';

export function useMounted(): boolean {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return isMounted;
}
