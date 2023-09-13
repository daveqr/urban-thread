import React, { lazy, Suspense } from 'react';

const LazyLandingPageHome = lazy(() => import('./LandingPageHome'));

const LandingPageHome = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyLandingPageHome {...props} />
  </Suspense>
);

export default LandingPageHome;
