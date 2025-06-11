import { lazy, Suspense } from 'react';
import Marquee from "./homepage/Marque"

// Lazy load the Banner component
const Banner = lazy(() => import("./homepage/Banner"));

const Home = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading banner...</div>}>
        <Banner/>
      </Suspense>
      <Marquee/>
    </div>
  )
}

export default Home