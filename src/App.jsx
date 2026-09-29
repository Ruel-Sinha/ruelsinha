import React, { useState, useEffect, useCallback, memo } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

import About from './components/About';
import Skills from './components/Skills';
import Academics from './components/Academics';
import Projects from './components/Projects';
import Work from './components/Work';
import Music from './components/Music';

const pageVariants = { initial: { opacity: 0, y: 20 }, in: { opacity: 1, y: 0 }, out: { opacity: 0, y: -20 } };
const pageTransition = { type: 'tween', ease: 'anticipate', duration: 0.5 };

const AnimatedRoutes = memo(() => {
  const location = useLocation();
  const routesConfig = [
    { path: '/', Component: About },
    { path: '/about', Component: About },
    { path: '/academics', Component: Academics },
    { path: '/music', Component: Music },
    { path: '/skills', Component: Skills },
    { path: '/projects', Component: Projects },
    { path: '/work', Component: Work },
  ];

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routesConfig.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <Component />
              </motion.div>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
});
AnimatedRoutes.displayName = 'AnimatedRoutes';

function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) return storedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [sideNavOpen, setSideNavOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Layout theme={theme} toggleTheme={toggleTheme} sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen}>
        <AnimatedRoutes />
      </Layout>

    </Router>
  );
}

export default App;
