// App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Rewards from "./pages/Rewards";
import Benefits from "./pages/Benefits";
import PageWrapper from "./components/PageWrapper";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
        <Route path="/rewards" element={<PageWrapper><Rewards /></PageWrapper>} />
        <Route path="/benefits" element={<PageWrapper><Benefits /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-luxury-dark transition-colors duration-300">
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  );
};

export default App;
