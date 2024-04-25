import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import contexte from "../components/contexte";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [web, setWeb] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { API_URL } = useContext(contexte);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
      phonenumber,
      web,
      city,
      address,
    };

    try {
      const response = await fetch(`${API_URL}/register/center`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error al registrar el centro");
      }
      navigate("/login"); // Redirige al usuario al login después de registrarse correctamente
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex">
        <div className="bg-white w-1/2 rounded-l-lg p-5">
          <div className="text-center">
            <h1 className="font-sans text-white font-bold text-3xl tracking-[-.10em] mb-10">
              <span className="text-4xl text-white">:</span>Perfil
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="mb-4">
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
              <input
                placeholder="Nombre"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 rounded-lg w-full font-mono border border-emerald-800 text-sm"
              />
            </div>
            <div className="mb-4">
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded-lg w-full font-mono border border-emerald-800 text-sm"
              />
            </div>
            <div className="mb-4">
              <input
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 rounded-lg w-full font-mono border border-emerald-800 text-sm"
              />
            </div>
            <div className="mb-4">
              <input
                placeholder="Número de teléfono"
                type="text"
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="p-2 rounded-lg w-full font-mono border border-emerald-800 text-sm"
              />
            </div>
            <div className="mb-4">
              <input
                placeholder="Página web"
                type="text"
                value={web}
                onChange={(e) => setWeb(e.target.value)}
                className="p-2 rounded-lg w-full font-mono border border-emerald-800 text-sm"
              />
            </div>
            <div className="mb-4">
              <input
                placeholder="Ciudad"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="p-2 rounded-lg w-full font-mono border border-emerald-800 text-sm"
              />
            </div>
            <div className="mb-4">
              <input
                placeholder="Dirección"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-2 rounded-lg w-full font-mono border border-emerald-800 text-sm"
              />
            </div>
            <div className="flex justify-center items-center">
            <div
              className=" mb-3 text-center inline-block w-1/2 rounded-full p-3 text-white font-bold bg-emerald-800 hover:bg-emerald-600"
            >
              <button type="submit">Registrarse</button>
            </div>
            
            </div>
            <div className="text-center">
            <a href="/login">Tengo una cuenta. <span className="font-bold">Iniciar sesión</span></a>
            </div>
          </form>
        </div>
        {/* CONTAINER SAVE*/}
        <div
          className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none bg-emerald-800"
          
        >
          <div className="px-4 py-6 text-white md:mx-6 md:p-12">
            <h1 className="font-sans mb-4 text-white font-bold text-4xl tracking-[-.10em] mt-[-1.5em]">
              Save a pet<span className="text-6xl text-black">.</span>
            </h1>
            <h2 className="font-mono mt-3">
              Save a pet es un proyecto social para que cualquier persona que
              desee adoptar un animal pueda encontrar un refugio.
              <br />
              <br />
              ¡Únete a la red nacional de refugios y protectoras de animales{" "}
              <span className="underline">Save a Pet</span> para que miles de
              animales encuentren un lugar digno este verano!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
