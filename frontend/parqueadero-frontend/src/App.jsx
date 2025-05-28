import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import IngresarVehiculo from './pages/IngresarVehiculo';
import SacarVehiculo from './pages/SacarVehiculo';
import VerVehiculos from './pages/VerVehiculos';
import './App.css';

function App() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/vehiculos`)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <Router>
    <div className="app">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/ingresar" element={<IngresarVehiculo />} />
          <Route path="/sacar" element={<SacarVehiculo />} />
          <Route path="/ver" element={<VerVehiculos />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
