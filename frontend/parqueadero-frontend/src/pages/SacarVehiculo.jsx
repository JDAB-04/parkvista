import { useState } from 'react';
import '../styles/pages.css';

function SacarVehiculo() {
  const [placa, setPlaca] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/vehiculos/salida`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placa }),
      });
  
      const data = await response.json();
      alert('Vehículo retirado correctamente');
      console.log(data);
    } catch (err) {
      console.error('Error al sacar vehículo:', err);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Sacar Vehículo</h2>
        <p>Registra la salida de un vehículo del estacionamiento</p>
      </div>
      
      <div className="form-card">
        <form onSubmit={handleSubmit} className="vehicle-form">
          <div className="form-group">
            <label htmlFor="placa">Placa del Vehículo</label>
            <input 
              type="text" 
              id="placa"
              value={placa} 
              onChange={e => setPlaca(e.target.value)} 
              placeholder="Ingresa la placa del vehículo" 
              required 
            />
          </div>
          
          <button type="submit" className="submit-btn">
            Registrar Salida
          </button>
        </form>
      </div>
    </div>
  );
}

export default SacarVehiculo;