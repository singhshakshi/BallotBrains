import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import VoxBubble from './components/VoxBubble';
import Landing from './pages/Landing';
import Login from './pages/Login';
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
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
          <Route path="/learn" element={<ProtectedRoute><LearnPath /></ProtectedRoute>} />
          <Route path="/learn/:topicId" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/country/:countryName" element={<CountryDeepDive />} />
          <Route path="/simulate" element={<ProtectedRoute><Simulate /></ProtectedRoute>} />
          <Route path="/compare" element={<ProtectedRoute><Compare /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your_google_client_id_here'}>
      <AuthProvider>
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
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
