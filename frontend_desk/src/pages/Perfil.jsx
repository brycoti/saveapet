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
  <div className="text-green-800 font-bold px-4 sm:px-6 lg:px-8">
    <h1 className="text-xl lg:text-2xl">Perfil</h1>
    {editMode ? (
      <form className="space-y-4">
        <div className="flex flex-col">
          <label>Nombre:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input mt-1 block w-full"/>
        </div>
        <div className="flex flex-col">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input mt-1 block w-full"/>
        </div>
        <div className="flex flex-col">
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input mt-1 block w-full"/>
        </div>
        <div className="flex flex-col">
          <label>Número de teléfono:</label>
          <input type="text" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-input mt-1 block w-full"/>
        </div>
        <div className="flex flex-col">
          <label>Sitio web:</label>
          <input type="text" value={web} onChange={(e) => setWeb(e.target.value)} className="form-input mt-1 block w-full"/>
        </div>
        <div className="flex flex-col">
          <label>Ciudad:</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="form-input mt-1 block w-full"/>
        </div>
        <div className="flex flex-col">
          <label>Dirección:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-input mt-1 block w-full"/>
        </div>
        <button onClick={handleSave} className="mt-5 bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</button>
      </form>
    ) : (
      <div className="space-y-2">
        <p>Nombre: {name}</p>
        <p>Email: {email}</p>
        <p>Número de teléfono: {phonenumber}</p>
        <p>Sitio web: {web}</p>
        <p>Ciudad: {city}</p>
        <p>Dirección: {address}</p>
        <button onClick={handleEdit} className="bg-blue-300 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Editar</button>
      </div>
    )}
    <button className="mt-4  mx-2 border p-3 text-white bg-red-300 hover:bg-red-500" onClick={() => navigate('/list')}>Tus animales</button>
    <button className="mt-4 border p-3 text-white bg-red-300 hover:bg-red-500" onClick={() => navigate('/alta')}>new pet</button>
    <br />
</div>

);
};

export default Perfil;
