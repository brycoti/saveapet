import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexte from '../components/contexte';

const Perfil = () => {
  const { loguejat, API_URL } = useContext(Contexte);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(loguejat ? loguejat.userName : 'Nombre del Centro');
  const [email, setEmail] = useState(loguejat ? loguejat.email : 'centro@example.com');
  const [password, setPassword] = useState('********');
  const [phonenumber, setPhoneNumber] = useState(loguejat ? loguejat.phonenumber : '123456789');
  const [web, setWeb] = useState(loguejat ? loguejat.web : 'www.centro.com');
  const [city, setCity] = useState(loguejat ? loguejat.city : 'Ciudad');
  const [address, setAddress] = useState(loguejat ? loguejat.address : 'Dirección');

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const editedData = {
      name: name,
      email: email,
      password: password,
      phonenumber: phonenumber,
      web: web,
      city: city,
      address: address
    };
    const options = {
      method: 'PUT',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(editedData)
    }

  
  try {
    const response = await fetch(`${API_URL}/centers/${loguejat.userId}`, options)
    const data = await response.json()
    console.log("daata", data)

    setEditMode(false);

  } catch (e) {
    console.error("error", error);
    // Manejar el error según tu lógica de la aplicación
  }
};

return (
  <div className="text-black font-bold">
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
