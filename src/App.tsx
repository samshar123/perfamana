import { Routes, Route, useLocation } from 'react-router-dom';

import './App.css';

import Home from './Pages/Home/home';


function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      
      
      {/* AnimatePresence allows components to animate out when they are removed from the DOM */}
    
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />

        
        </Routes>
      
    </div>
  );
}

export default App;