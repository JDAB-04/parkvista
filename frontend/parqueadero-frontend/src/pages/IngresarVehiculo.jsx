import { useState } from 'react';
import '../styles/pages.css';

function IngresarVehiculo() {
  const [form, setForm] = useState({
    placa: '',
    tipo: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/vehiculos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${JSON.stringify(errorData)}`);
        return;
      }

      const data = await response.json();
      alert('Vehículo ingresado correctamente');
      console.log(data);
    } catch (err) {
      console.error('Error al ingresar vehículo:', err);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Ingresar Vehículo</h2>
        <p>Registra un nuevo vehículo en el sistema</p>
      </div>
      
      <div className="form-card">
        <form onSubmit={handleSubmit} className="vehicle-form">
          <div className="form-group">
            <label htmlFor="placa">Placa del Vehículo</label>
            <input 
              type="text" 
              id="placa"
              name="placa" 
              placeholder="Ej: ABC123" 
              value={form.placa}
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="tipo">Tipo de Vehículo</label>
            <select 
              id="tipo"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un tipo</option>
              <option value="carro">Carro</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Registrar Vehículo
          </button>
        </form>
      </div>
    </div>
  );
}

export default IngresarVehiculo;
