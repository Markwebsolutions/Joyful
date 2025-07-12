import { lazy, Suspense, memo } from 'react';
import AboutUs1 from "./AboutUspages/AboutUs1"; // Not lazy-loaded

// Lazy load with explicit chunk names for better debugging
const AboutUs2 = lazy(() => import(/* webpackChunkName: "about-us-2" */ "./AboutUspages/AboutUs2"));

const LoadingFallback = () => <div className="loading-placeholder" />;

// Memoize the first component
const MemoizedAboutUs1 = memo(AboutUs1);

const AboutUs = memo(() => (
    <>
        <MemoizedAboutUs1 />

        <Suspense fallback={<LoadingFallback />}>
            <AboutUs2 />
        </Suspense>
    </>
));

export default AboutUs;