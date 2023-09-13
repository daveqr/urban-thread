import React, { lazy, Suspense } from 'react';

const LazyLanding = lazy(() => import('./Landing'));

const Landing = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyLanding {...props} />
  </Suspense>
);

export default Landing;
