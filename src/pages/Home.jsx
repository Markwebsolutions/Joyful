import { lazy, Suspense, memo } from 'react';
import Banner from "./homepage/Banner";

// Memoized Banner to prevent unnecessary re-renders
const MemoizedBanner = memo(Banner);

// Lazy load all sections
const Marquee = lazy(() => import("./homepage/Marque"));
const Section1 = lazy(() => import('./homepage/Section1'));
const Section2 = lazy(() => import('./homepage/Section2'));
const Section3 = lazy(() => import('./homepage/Section3'));
const Section4 = lazy(() => import('./homepage/Section4'));
const Section5 = lazy(() => import('./homepage/Section5'));

// Individual loading placeholders for better perceived performance
const SectionLoader = () => <div className="section-loading-placeholder" />;

const Home = () => {
  return (
    <div>
      <MemoizedBanner />

      {/* Suspense boundary for each section for progressive loading */}
      <Suspense fallback={<SectionLoader />}>
        <Marquee />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Section1 />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Section2 />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Section3 />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Section4 />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Section5 />
      </Suspense>
    </div>
  )
}

export default memo(Home);