import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import GreetingPage from './pages/About/GreetingPage';
import ArchitecturePage from './pages/About/ArchitecturePage';
import LocationPage from './pages/About/LocationPage';
import ExhibitionPage from './pages/Exhibition/ExhibitionPage';
import ExhibitionDetailPage from './pages/Exhibition/ExhibitionDetailPage';
import SpacesPage from './pages/Spaces/SpacesPage';
import SpaceDetailPage from './pages/Spaces/SpaceDetailPage';
import RentalPage from './pages/Rental/RentalPage';
import ProcedurePage from './pages/Rental/ProcedurePage';
import PricingPage from './pages/Rental/PricingPage';
import TermsPage from './pages/Rental/TermsPage';
import ApplyPage from './pages/Rental/ApplyPage';
import StatusPage from './pages/Rental/StatusPage';
import NewsPage from './pages/News/NewsPage';
import ContactPage from './pages/Contact/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/greeting" element={<GreetingPage />} />
          <Route path="/about/architecture" element={<ArchitecturePage />} />
          <Route path="/about/location" element={<LocationPage />} />
          <Route path="/exhibition" element={<ExhibitionPage />} />
          <Route path="/exhibition/:id" element={<ExhibitionDetailPage />} />
          <Route path="/spaces" element={<SpacesPage />} />
          <Route path="/spaces/:floor" element={<SpaceDetailPage />} />
          <Route path="/rental" element={<RentalPage />} />
          <Route path="/rental/procedure" element={<ProcedurePage />} />
          <Route path="/rental/pricing" element={<PricingPage />} />
          <Route path="/rental/terms" element={<TermsPage />} />
          <Route path="/rental/apply" element={<ApplyPage />} />
          <Route path="/rental/status" element={<StatusPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
