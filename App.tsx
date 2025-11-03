import React, { useLayoutEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, Transition } from 'framer-motion';
import { GlobalProvider, Header, Footer, BottomNav, ScrollToTopButton, Chatbot } from './components';
import { HomePage, DiscoverPage, DetailsPage, CreateCampaignPage, ProfilePage, LeaderboardPage, AboutPage, ContactPage, FaqPage, LoginPage, SignUpPage, PaymentSetupPage, TermsPage, PrivacyPage, LocationPage, CertificatePage, LocationProfilePage } from './pages';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const pageVariants = {
  initial: { opacity: 0, filter: 'blur(4px)' },
  in: { opacity: 1, filter: 'blur(0px)' },
  out: { opacity: 0, filter: 'blur(4px)' },
};

const pageTransition: Transition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.5,
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
      >
          <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/location" element={<LocationPage />} />
              <Route path="/location-profile/:id" element={<LocationProfilePage />} />
              <Route path="/cause/:id" element={<DetailsPage />} />
              <Route path="/create" element={<CreateCampaignPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/certificate" element={<CertificatePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/payment-setup" element={<PaymentSetupPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const location = useLocation();
  const noLayoutPages = ['/login', '/signup', '/payment-setup'];
  const isLayoutHidden = noLayoutPages.includes(location.pathname);

  return (
    <>
      {!isLayoutHidden && <Header />}
      <main className={`${!isLayoutHidden ? "pt-20" : ""} pb-20 md:pb-0`}>
        <AnimatedRoutes />
      </main>
      {!isLayoutHidden && <Footer />}
      {!isLayoutHidden && <BottomNav />}
      {!isLayoutHidden && <ScrollToTopButton />}
      {!isLayoutHidden && <Chatbot />}
    </>
  );
}

const App = () => {
  return (
    <HashRouter>
      <GlobalProvider>
        <ScrollToTop />
        <AppContent />
      </GlobalProvider>
    </HashRouter>
  );
};

export default App;