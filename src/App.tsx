import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Home from './Pages/Home/home';
// Import your new Service Detail component
import ServiceDetail from "./Pages/Home/Service/ServiceDetail"; 
import ProjectDetail from './Pages/Home/Project/ProjectDetail';
import OffersPage from './Pages/Offers/offersPage';
import EventDetail from './Pages/Home/EventSection/EventDetail';
import Navbar from './Components/Navbar/navbar';
import AllEvents from "./Pages/Events/Allevents"
import Footer from './Components/Footer/footer';
import DebugFAQ from './debug-faq';

function App() {
  const location = useLocation();

  // Handle hash scrolling
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (location.pathname === '/') {
      // If no hash and on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="app-container">

      <Navbar></Navbar>
      {/* Routes will switch based on the URL path */}
      <Routes location={location} key={location.pathname}>
        
        {/* Main Landing Page */}
        <Route path="/" element={<Home />} />

        {/* DYNAMIC ROUTE: 
            The ':id' acts as a variable. 
            When you visit /services/bodyshop, 'id' becomes 'bodyshop' 
        */}
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/allevents" element={<AllEvents />} />
        <Route path="/debug" element={<DebugFAQ />} />

      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;