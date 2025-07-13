import React, { useState, useEffect } from 'react';

export default function App() {
  const [form, setForm] = useState({
    rut: '',
    nombre: '',
    instalacion: '',
    telefono: '',
    direccion: '',
    rol: 'administrativo',
  });

  const [fecha, setFecha] = useState('');
  const [ingresos, setIngresos] = useState([]);

  useEffect(() => {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    setFecha(`${yyyy}-${mm}-${dd}`);

    const guardados = localStorage.getItem('ingresos');
    if (guardados) {
      setIngresos(JSON.parse(guardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ingresos', JSON.stringify(ingresos));
  }, [ingresos]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nuevoIngreso = { ...form, fecha };
    setIngresos(prev => [nuevoIngreso, ...prev]);
    setForm({
      rut: '',
      nombre: '',
      instalacion: '',
      telefono: '',
      direccion: '',
      rol: 'administrativo',
    });
  }

  function limpiarHistorial() {
    if (confirm('¿Estás seguro de eliminar todos los ingresos?')) {
      setIngresos([]);
      localStorage.removeItem('ingresos');
    }
  }

  return (
    <div style={{
      minHeight: '100vh',  
      padding: '20px',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div style={{
        maxWidth: '850px',
        margin: '0 auto',
        background: '#ffffff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img src="/ingreso-instalacionweb/logo-inacap.png" alt="Logo INACAP" style={{ height: '60px' }} />
          <h1 style={{ color: '#c8102e', marginTop: '10px' }}>Registro de Ingresos</h1>
        </header>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
          <input type="date" value={fecha} readOnly />
          <input type="text" name="rut" placeholder="RUT" value={form.rut} onChange={handleChange} required />
          <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input type="text" name="instalacion" placeholder="Instalación" value={form.instalacion} onChange={handleChange} required />
          <input type="tel" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
          <input type="text" name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required />
          <select name="rol" value={form.rol} onChange={handleChange}>
            <option value="administrativo">Administrativo</option>
            <option value="docente">Docente</option>
            <option value="alumno">Alumno</option>
            <option value="otros">Otros</option>
          </select>
          <button
            type="submit"
            style={{
              backgroundColor: '#c8102e',
              color: '#fff',
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
            Registrar Ingreso
          </button>
        </form>

        <button
          onClick={limpiarHistorial}
          style={{
            backgroundColor: '#666',
            color: '#fff',
            padding: '8px',
            border: 'none',
            borderRadius: '5px',
            marginBottom: '20px',
            cursor: 'pointer'
          }}>
          Limpiar historial
        </button>

        <h2 style={{ color: '#c8102e' }}>Historial</h2>
        {ingresos.length === 0 ? (
          <p>No hay ingresos registrados.</p>
        ) : (
          <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#c8102e', color: '#fff' }}>
              <tr>
                <th>Fecha</th>
                <th>RUT</th>
                <th>Nombre</th>
                <th>Instalación</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {ingresos.map((ing, i) => (
                <tr key={i}>
                  <td>{ing.fecha}</td>
                  <td>{ing.rut}</td>
                  <td>{ing.nombre}</td>
                  <td>{ing.instalacion}</td>
                  <td>{ing.telefono}</td>
                  <td>{ing.direccion}</td>
                  <td>{ing.rol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}