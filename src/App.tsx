import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { PawPrint } from 'lucide-react';

// Route-level lazy loading for performance optimization & code splitting
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const OurWork = lazy(() => import('./pages/OurWork').then(m => ({ default: m.OurWork })));
const AnimalsDirectory = lazy(() => import('./pages/AnimalsDirectory').then(m => ({ default: m.AnimalsDirectory })));
const AnimalProfile = lazy(() => import('./pages/AnimalProfile').then(m => ({ default: m.AnimalProfile })));
const Adopt = lazy(() => import('./pages/Adopt').then(m => ({ default: m.Adopt })));
const ReportRescue = lazy(() => import('./pages/ReportRescue').then(m => ({ default: m.ReportRescue })));
const BiraalBari = lazy(() => import('./pages/BiraalBari').then(m => ({ default: m.BiraalBari })));
const BiraalBariResidents = lazy(() => import('./pages/BiraalBariResidents').then(m => ({ default: m.BiraalBariResidents })));
const Donate = lazy(() => import('./pages/Donate').then(m => ({ default: m.Donate })));
const Sponsor = lazy(() => import('./pages/Sponsor').then(m => ({ default: m.Sponsor })));
const SponsorDetail = lazy(() => import('./pages/SponsorDetail').then(m => ({ default: m.SponsorDetail })));
const Volunteer = lazy(() => import('./pages/Volunteer').then(m => ({ default: m.Volunteer })));
const Stories = lazy(() => import('./pages/Stories').then(m => ({ default: m.Stories })));
const StoryDetail = lazy(() => import('./pages/StoryDetail').then(m => ({ default: m.StoryDetail })));
const Gallery = lazy(() => import('./pages/Gallery').then(m => ({ default: m.Gallery })));
const GetInvolved = lazy(() => import('./pages/GetInvolved').then(m => ({ default: m.GetInvolved })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// Warm loading indicator during route transitions
const RouteLoadingFallback = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
    <div className="w-12 h-12 rounded-full bg-[#1A382B] text-white flex items-center justify-center animate-bounce shadow-md">
      <PawPrint className="w-6 h-6 text-[#F2B73B]" />
    </div>
    <span className="text-xs font-semibold text-[#75837B] mt-3 uppercase tracking-wider">
      Loading AniRBan...
    </span>
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <RecentlyViewedProvider>
          <ToastProvider>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Suspense fallback={<RouteLoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/our-work" element={<OurWork />} />
                    <Route path="/animals" element={<AnimalsDirectory />} />
                    <Route path="/animals/:slug" element={<AnimalProfile />} />
                    <Route path="/adopt" element={<Adopt />} />
                    <Route path="/report-rescue" element={<ReportRescue />} />
                    <Route path="/biraal-bari" element={<BiraalBari />} />
                    <Route path="/biraal-bari/residents" element={<BiraalBariResidents />} />
                    <Route path="/donate" element={<Donate />} />
                    <Route path="/sponsor" element={<Sponsor />} />
                    <Route path="/sponsor/:slug" element={<SponsorDetail />} />
                    <Route path="/volunteer" element={<Volunteer />} />
                    <Route path="/stories" element={<Stories />} />
                    <Route path="/stories/:slug" element={<StoryDetail />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/get-involved" element={<GetInvolved />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </RecentlyViewedProvider>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
