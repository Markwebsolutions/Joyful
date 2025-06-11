import { lazy, Suspense } from 'react';

import Banner from "./homepage/Banner"
import Section2 from './homepage/Section2';
import Section1 from './homepage/Section1';

// Lazy load the Banner component
const Marquee = lazy(() => import("./homepage/Marque"));

const Home = () => {
  return (
    <div>
      <Banner />
      <Suspense fallback={<div>Loading banner...</div>}>
        <Marquee />
      </Suspense>
      <Section1/>
      <Section2 />
    </div>
  )
}

export default Home