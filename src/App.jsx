import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import VoxBubble from './components/VoxBubble';
import Landing from './pages/Landing';
import LearnPath from './pages/LearnPath';
import Lesson from './pages/Lesson';
import Explore from './pages/Explore';
import CountryDeepDive from './pages/CountryDeepDive';
import Simulate from './pages/Simulate';
import Compare from './pages/Compare';
import Chat from './pages/Chat';
import Timeline from './pages/Timeline';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/learn" element={<LearnPath />} />
          <Route path="/learn/:topicId" element={<Lesson />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/country/:countryName" element={<CountryDeepDive />} />
          <Route path="/simulate" element={<Simulate />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      {/* SVG Paper Grain Filter */}
      <svg id="paper-grain-filter" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="paperGrain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="grayNoise"
            />
            <feBlend
              in="SourceGraphic"
              in2="grayNoise"
              mode="multiply"
              result="output"
            />
          </filter>
        </defs>
      </svg>

      <Navbar />
      <AnimatedRoutes />
      <VoxBubble />
    </Router>
  );
}
