import { lazy, Suspense } from 'react';
import Banner from "./homepage/Banner";


// Lazy load all other components
const Marquee = lazy(() => import("./homepage/Marque"));
const Section1 = lazy(() => import('./homepage/Section1'));
const Section2 = lazy(() => import('./homepage/Section2'));
const Section3 = lazy(() => import('./homepage/Section3'));
const Section4 = lazy(() => import('./homepage/Section4'));
const Section5 = lazy(() => import('./homepage/Section5'));

const Home = () => {
  return (
    <div>
      <Banner />
      <Suspense fallback={
        <div className="loading-placeholder">
        </div>
      }>
        <>
          <Marquee />
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5 />
        </>
      </Suspense>
    </div>
  )
}

export default Home