import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Contexte from "../components/contexte";

const Perfil = () => {
  const { loguejat, API_URL } = useContext(Contexte);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(
    loguejat ? loguejat.userName : "Nombre del Centro"
  );
  const [email, setEmail] = useState(
    loguejat ? loguejat.email : "centro@example.com"
  );
  const [password, setPassword] = useState("********");
  const [phonenumber, setPhoneNumber] = useState(
    loguejat ? loguejat.phonenumber : "123456789"
  );
  const [web, setWeb] = useState(loguejat ? loguejat.web : "www.centro.com");
  const [city, setCity] = useState(loguejat ? loguejat.city : "Ciudad");
  const [address, setAddress] = useState(
    loguejat ? loguejat.address : "Dirección"
  );

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const editedData = {
      name: name,
      email: email,
      phonenumber: phonenumber,
      web: web,
      city: city,
      address: address,
    };
    const options = {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    };

    try {
      const response = await fetch(
        `${API_URL}/centers/${loguejat.userId}`,
        options
      );
      const data = await response.json();
      console.log("daata", data);

      setEditMode(false);
    } catch (e) {
      console.error("error", error);
      // Manejar el error según tu lógica de la aplicación
    }
  };

  return (
    <div className="p-3 w-full text-center">
      <div className="px-4 sm:px-6 lg:px-8 bg-white mt-10 p-3 rounded-md ">
        <h1 className="font-sans text-emerald-800 font-bold text-3xl tracking-[-.10em]">
          <span className="text-4xl text-black">:</span>Perfil
        </h1>
        {editMode ? (
          <form className="p-5">
            <div className="flex flex-col mb-4">
              <input
                placeholder="Nombre"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input mt-1 block w-full bg-gray-100 p-2 rounded font-mono"
              />
            </div>
            <div className="flex flex-col mb-4">
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input mt-1 block w-full bg-gray-100 p-2 rounded font-mono"
              />
            </div>
            <div className="flex flex-col mb-4">
              <input
                placeholder="Número de teléfono"
                type="text"
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="form-input mt-1 block w-full bg-gray-100 p-2 rounded font-mono"
              />
            </div>
            <div className="flex flex-col mb-4">
              <input
                placeholder="Sitio web"
                type="text"
                value={web}
                onChange={(e) => setWeb(e.target.value)}
                className="form-input mt-1 block w-full bg-gray-100 p-2 rounded font-mono"
              />
            </div>
            <div className="flex flex-col mb-4">
              <input
                placeholder="Ciudad"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-input mt-1 block w-full bg-gray-100 p-2 rounded font-mono"
              />
            </div>
            <div className="flex flex-col mb-4">
              <input
                placeholder="Dirección"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-input mt-1 block w-full bg-gray-100 p-2 rounded font-mono"
              />
            </div>
            <button
              onClick={handleSave}
              className="mt-4 bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar
            </button>
          </form>
        ) : (
          <div className="mt-2">
            <p>
              ¡Bienvenid@, <span className="bold italic">{name}</span>!
            </p>
            <div className="flex justify-center mx-auto shadow-md rounded px-4 py-2 mt-2 mb-4 font-mono bg-emerald-800 text-gray-100 w-2/3">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <p><span className="font-bold">Email:</span> {email}</p>
                </div>
                <div className="flex items-center">
                  <p>
                  <span className="font-bold">Número de teléfono:</span> {phonenumber}
                  </p>
                </div>
                <div className="flex items-center">
                  <p><span className="font-bold">Sitio web:</span> {web}</p>
                </div>
                <div className="flex items-center">
                  <p><span className="font-bold">Ciudad:</span> {city}</p>
                </div>
                <div className="flex items-center">
                  <p><span className="font-bold">Dirección:</span> {address}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-3">
          <div className="flex justify-center gap-4">
            <button
              className="mt-4 rounded-full border border-emerald-800 p-3 text-slate-800 bg-white hover:bg-emerald-800 hover:text-white"
              onClick={() => navigate("/list")}
            >
              Animales del centro
            </button>
            <button
              className="mt-4 rounded-full border border-emerald-800 p-3 text-slate-800 bg-white hover:bg-emerald-800 hover:text-white"
              onClick={() => navigate("/alta")}
            >
              Añadir un animal
            </button>
            <button
              onClick={handleEdit}
              className="mt-4 rounded-full border border-emerald-800 p-3 text-slate-800 bg-white hover:bg-emerald-800 hover:text-white"
            >
              Editar datos del centro
            </button>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Perfil;
