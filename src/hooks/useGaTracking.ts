import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sendGaPageview } from '@/lib/analytics';

/**
 * Hook to track page views in SPA using React Router
 * Automatically sends page_view events when the route changes
 */
export const useGaTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Send page view on route change
    sendGaPageview(location.pathname + location.search);
  }, [location]);
};