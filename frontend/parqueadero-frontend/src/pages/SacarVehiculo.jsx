import { useState } from 'react';
import { FaCar, FaCarSide, FaMoneyBillWave } from 'react-icons/fa';
import '../styles/pages.css';

function SacarVehiculo() {
  const [placa, setPlaca] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [cobro, setCobro] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCobro(null);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/vehiculos/salida`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placa }),
      });
  
      const data = await response.json();

      if (!response.ok) {
        setAlert({
          type: 'error',
          message: data.message || 'No se pudo registrar la salida del vehículo'
        });
        return;
      }

      setAlert({
        type: 'success',
        message: 'Salida registrada exitosamente'
      });

      // Mostrar información del cobro
      setCobro({
        tiempo: data.tiempo_estadia,
        total: data.valor_cobrado
      });

      setPlaca(''); // Reset form
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Error al conectar con el servidor'
      });
      console.error('Error al sacar vehículo:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Sacar Vehículo</h2>
        <p>Registra la salida de un vehículo del estacionamiento</p>
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

        {cobro && (
          <div className="cobro-info">
            <div className="cobro-header">
              <FaMoneyBillWave size={24} />
              <h3>Resumen del Cobro</h3>
            </div>
            <div className="cobro-details">
              <div className="cobro-item">
                <span>Tiempo de estadía:</span>
                <strong>{cobro.tiempo}</strong>
              </div>
              <div className="cobro-item">
                <span>Total a pagar:</span>
                <strong className="cobro-total">${cobro.total}</strong>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="vehicle-form">
          <div className="form-group">
            <label htmlFor="placa">Placa del Vehículo</label>
            <div className="input-icon-wrapper">
              <input 
                type="text" 
                id="placa"
                className="input-with-icon"
                value={placa} 
                onChange={e => setPlaca(e.target.value.toUpperCase())} 
                placeholder="Ingresa la placa del vehículo" 
                pattern="[A-Za-z0-9]{6}"
                title="La placa debe tener 6 caracteres alfanuméricos"
                required 
              />
              <FaCar className="input-icon" />
            </div>
          </div>
          
          <button 
            type="submit" 
            className={`submit-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Registrar Salida'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SacarVehiculo;