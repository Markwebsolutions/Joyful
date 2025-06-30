import { lazy, Suspense } from 'react';

const Network1 = lazy(() => import("./Networkpages/Network1"));
const Network2 = lazy(() => import("./Networkpages/Network2"));
const Section5 = lazy(() => import("./homepage/Section5"));

const LoadingFallback = () => <div className="loading-placeholder"></div>;

const Network = () => (
    <Suspense fallback={<LoadingFallback />}>
        <Network1 />
        <Network2 />
        <Section5 />
    </Suspense>
);

export default Network;