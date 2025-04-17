import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EventTracker from '../../services/analytics/EventTracker';

const ABTest = ({ variants, experimentId, children }) => {
  const [variant, setVariant] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Determine variant based on user or session
    const variantIndex = Math.floor(Math.random() * variants.length);
    setVariant(variants[variantIndex]);

    // Track experiment view
    EventTracker.trackEvent('experiment_view', {
      experimentId,
      variant: variants[variantIndex],
      path: location.pathname
    });
  }, [experimentId, variants, location]);

  if (!variant) return null;

  return React.Children.map(children, child =>
    React.cloneElement(child, { variant })
  );
};

export default ABTest;