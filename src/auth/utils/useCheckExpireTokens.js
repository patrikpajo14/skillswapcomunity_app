import { useMemo } from 'react';

function useTokenExpiration(expire) {
  const isTokenExpired = useMemo(() => {
    const expireTimestamp = new Date(expire).getTime();
    return Date.now() > expireTimestamp;
  }, [expire]);

  return { isTokenExpired };
}

export default useTokenExpiration;
