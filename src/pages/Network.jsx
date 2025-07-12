import { lazy, Suspense, memo } from 'react';
import Network1 from "./Networkpages/Network1"; // Not lazy-loaded

const Network2 = lazy(() => import(/* webpackChunkName: "network-2" */ "./Networkpages/Network2"));
const Section5 = lazy(() => import(/* webpackChunkName: "section5" */ "./homepage/Section5"));

const LoadingFallback = () => <div className="loading-placeholder" />;

// Memoize the first component
const MemoizedNetwork1 = memo(Network1);

const Network = memo(() => (
    <>
        <MemoizedNetwork1 />

        <Suspense fallback={<LoadingFallback />}>
            <Network2 />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
            <Section5 />
        </Suspense>
    </>
));

export default Network;