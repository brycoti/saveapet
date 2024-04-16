import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexte from '../components/contexte';

const Perfil = () => {
  const { loguejat } = useContext(Contexte);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(loguejat ? loguejat.name : 'Nombre del Centro');
  const [email, setEmail] = useState(loguejat ? loguejat.email : 'centro@example.com');
  const [password, setPassword] = useState('********');
  const [phonenumber, setPhoneNumber] = useState(loguejat ? loguejat.phonenumber : '123456789');
  const [web, setWeb] = useState(loguejat ? loguejat.web : 'www.centro.com');
  const [city, setCity] = useState(loguejat ? loguejat.city : 'Ciudad');
  const [address, setAddress] = useState(loguejat ? loguejat.address : 'Dirección');

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const editedData = { name, email, password, phonenumber, web, city, address };
      const response = await fetch(`${API_URL}/centers/${loguejat.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editedData)
      });

      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }

      setEditMode(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Perfil</h1>
      {editMode ? (
        <form>
          <label>
            Nombre:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Contraseña:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <label>
            Número de teléfono:
            <input type="text" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </label>
          <br />
          <label>
            Sitio web:
            <input type="text" value={web} onChange={(e) => setWeb(e.target.value)} />
          </label>
          <br />
          <label>
            Ciudad:
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
          <br />
          <label>
            Dirección:
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>
          <br />
          <button onClick={handleSave}>Guardar</button>
        </form>
      ) : (
        <div>
          <p>Nombre: {name}</p>
          <p>Email: {email}</p>
          <p>Contraseña: {password}</p>
          <p>Número de teléfono: {phonenumber}</p>
          <p>Sitio web: {web}</p>
          <p>Ciudad: {city}</p>
          <p>Dirección: {address}</p>
          <button onClick={handleEdit}>Editar</button>
        </div>
      )}
      <button className="border p-3 bg-red-200" onClick={() => navigate('/list')}>Tus animales</button>
      <button className="border p-3 bg-red-200" onClick={() => navigate('/alta')}>new pet</button>
      <br />
    </div>
  );
};

export default Perfil;
