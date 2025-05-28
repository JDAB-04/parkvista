import { useState } from 'react';
import { FaCar, FaCarSide } from 'react-icons/fa';
import '../styles/pages.css';

function IngresarVehiculo() {
  const [form, setForm] = useState({
    placa: '',
    tipo: '',
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/vehiculos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setAlert({
          type: 'error',
          message: `Error: ${errorData.message || 'No se pudo registrar el vehículo'}`
        });
        return;
      }

      const data = await response.json();
      setAlert({
        type: 'success',
        message: 'Vehículo registrado exitosamente'
      });
      setForm({ placa: '', tipo: '' }); // Reset form
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Error al conectar con el servidor'
      });
      console.error('Error al ingresar vehículo:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Ingresar Vehículo</h2>
        <p>Registra un nuevo vehículo en el sistema</p>
      </div>
      
      <div className="form-card">
        {alert && (
          <div className={`alert alert-${alert.type}`}>
            {alert.type === 'success' ? (
              <FaCar size={20} />
            ) : (
              <FaCarSide size={20} />
            )}
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="vehicle-form">
          <div className="form-group">
            <label htmlFor="placa">Placa del Vehículo</label>
            <div className="input-icon-wrapper">
              <input 
                type="text" 
                id="placa"
                name="placa" 
                className="input-with-icon"
                placeholder="Ej: ABC123" 
                value={form.placa}
                onChange={handleChange}
                pattern="[A-Za-z0-9]{6}"
                title="La placa debe tener 6 caracteres alfanuméricos"
                required 
              />
              <FaCar className="input-icon" />
            </div>
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

          <button 
            type="submit" 
            className={`submit-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar Vehículo'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default IngresarVehiculo;
