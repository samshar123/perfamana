import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/home';
// Import your new Service Detail component
import ServiceDetail from "./Pages/Home/Service/ServiceDetail"; 
import ProjectDetail from './Pages/Home/Project/ProjectDetail';
import Navbar from './Components/Navbar/navbar';

function App() {
  const location = useLocation();

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

      </Routes>
    </div>
  );
}

export default App;