import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/common/ErrorBoundary';
import PageLoader from './components/common/PageLoader';

// Eager: the landing page (LCP-critical, almost always the first paint).
import HomePage from './pages/Home/HomePage';

// Lazy: every other route is split into its own chunk so the home visitor
// doesn't download admin/rental/about code up front.
const AboutPage = lazy(() => import('./pages/About/AboutPage'));
const GreetingPage = lazy(() => import('./pages/About/GreetingPage'));
const ArchitecturePage = lazy(() => import('./pages/About/ArchitecturePage'));
const LocationPage = lazy(() => import('./pages/About/LocationPage'));
const VisitorInfoPage = lazy(() => import('./pages/About/VisitorInfoPage'));
const ExhibitionPage = lazy(() => import('./pages/Exhibition/ExhibitionPage'));
const ExhibitionDetailPage = lazy(() => import('./pages/Exhibition/ExhibitionDetailPage'));
const SpacesPage = lazy(() => import('./pages/Spaces/SpacesPage'));
const SpaceDetailPage = lazy(() => import('./pages/Spaces/SpaceDetailPage'));
const RentalPage = lazy(() => import('./pages/Rental/RentalPage'));
const ProcedurePage = lazy(() => import('./pages/Rental/ProcedurePage'));
const PricingPage = lazy(() => import('./pages/Rental/PricingPage'));
const ApplyPage = lazy(() => import('./pages/Rental/ApplyPage'));
const StatusPage = lazy(() => import('./pages/Rental/StatusPage'));
const RentalListPage = lazy(() => import('./pages/Rental/RentalListPage'));
const NewsPage = lazy(() => import('./pages/News/NewsPage'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'));
const AdminHomePage = lazy(() => import('./pages/Admin/AdminHomePage'));
const AdminRentalPage = lazy(() => import('./pages/Admin/AdminRentalPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="*"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/about/greeting" element={<GreetingPage />} />
                    <Route path="/about/visitor-info" element={<VisitorInfoPage />} />
                    <Route path="/about/architecture" element={<ArchitecturePage />} />
                    <Route path="/about/location" element={<LocationPage />} />
                    <Route path="/exhibition" element={<ExhibitionPage />} />
                    <Route path="/exhibition/:id" element={<ExhibitionDetailPage />} />
                    <Route path="/spaces" element={<SpacesPage />} />
                    <Route path="/spaces/:floor" element={<SpaceDetailPage />} />
                    <Route path="/rental" element={<RentalPage />} />
                    <Route path="/rental/procedure" element={<ProcedurePage />} />
                    <Route path="/rental/pricing" element={<PricingPage />} />
                    <Route path="/rental/apply" element={<ApplyPage />} />
                    <Route path="/rental/status" element={<StatusPage />} />
                    <Route path="/rental/list" element={<RentalListPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/admin/homepage" element={<AdminHomePage />} />
                    <Route path="/admin/rentals" element={<AdminRentalPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
