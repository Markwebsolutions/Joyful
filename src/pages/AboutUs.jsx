import { lazy, Suspense } from 'react';

const AboutUs1 = lazy(() => import("./AboutUspages/AboutUs1"));
const AboutUs2 = lazy(() => import("./AboutUspages/AboutUs2"));

const LoadingFallback = () => <div className="loading-placeholder"></div>;

const AboutUs = () => (
    <Suspense fallback={<LoadingFallback />}>
        <AboutUs1 />
        <AboutUs2 />
    </Suspense>
);

export default AboutUs;