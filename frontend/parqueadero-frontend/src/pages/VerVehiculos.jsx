import { useEffect, useState } from 'react';
import '../styles/pages.css';

function VerVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/vehiculos`)
      .then(res => res.json())
      .then(data => setVehiculos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Vehículos Ingresados</h2>
        <p>Lista de todos los vehículos actualmente en el estacionamiento</p>
      </div>
      
      <div className="table-card">
        {vehiculos.length > 0 ? (
          <div className="table-container">
            <table className="vehicles-table">
              <thead>
                <tr>
                  <th>Placa</th>
                  <th>Tipo</th>
                  <th>Tarifa</th>
                  <th>Hora Ingreso</th>
                  <th>Hora Salida</th>
                </tr>
              </thead>
              <tbody>
                {vehiculos.map(v => (
                    <tr key={v.id}>
                    <td className="placa-cell">{v.placa}</td>
                    <td>{v.tipo}</td>
                    <td className="tarifa-cell">${v.tarifa}</td>
                    <td>{new Date(v.hora_ingreso).toLocaleString()}</td>
                    <td>{v.hora_salida ? new Date(v.hora_salida).toLocaleString() : '—'}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>No hay vehículos registrados en el estacionamiento</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerVehiculos;