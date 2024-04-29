import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import contexte from "../components/contexte";

const AltaMascota = () => {
  const { API_URL } = useContext(contexte);
  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [tamaño, setTamaño] = useState("");
  const [temperamento, setTemperamento] = useState("");
  const [amigablePerros, setAmigablePerros] = useState(false);
  const [amigableNiños, setAmigableNiños] = useState(false);
  const [urgencia, setUrgencia] = useState("");
  const [error, setError] = useState("");
  const [imatge, setImatge] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", nombre);
    formData.append("breed", raza);
    formData.append("age", parseInt(edad));
    formData.append("size", tamaño);
    formData.append("temper", temperamento);
    formData.append("dogs_friendly", amigablePerros);
    formData.append("kids_friendly", amigableNiños);
    formData.append("urgency", urgencia);
    if (imatge) {
      formData.append("foto", imatge);
    }

    const options = {
      method: "POST",
      credentials: "include",
      body: formData,
    };

    try {
      const response = await fetch(API_URL + "/center/newpet", options);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload new pet");
      }
      await response.json(); // We might want to use this response data for something
      navigate("/list");
    } catch (e) {
      console.error("Upload error:", e);
      setError(e.message || "Error uploading pet.");
    }
  };

  return (
    <div className="m-auto p-3 font-mono mt-4">
      <form
        onSubmit={handleSubmit}
        className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        style={{ overflowY: "scroll", scrollbarWidth: "none" }}
      >
        <h2 className="text-center font-extrabold text-emerald-800 text-xl mb-4">
          Alta de un nuevo animal
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-2 gap-8 text-sm p-3 max-w-3/5">
          <div>
            <div className="mb-4">
              <input
                placeholder="Nombre"
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <input
                placeholder="Raza"
                type="text"
                id="raza"
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <input
                placeholder="Edad"
                type="number"
                id="edad"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="text-emerald-800 mb-2">Tamaño:</label>
              <select
                placeholder="Tamaño"
                className="shadow border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={tamaño}
                onChange={(e) => setTamaño(e.target.value)}
              >
                <option value="" selected>
                  --Seleciona una opción--
                </option>
                <option value="grande">Grande</option>
                <option value="mediano">Mediano</option>
                <option value="pequeño">Pequeño</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-emerald-800 mb-2" htmlFor="temperamento">
                Temperamento:
              </label>
              <select
                id="temperamento"
                value={temperamento}
                onChange={(e) => setTemperamento(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" selected>
                  --Seleciona una opción--
                </option>
                <option value="energico">Enérgico</option>
                <option value="calmado">Tranquilo</option>
                <option value="jugueton">Juguetón</option>
                <option value="timido">Tímido</option>
              </select>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label
                className="text-emerald-800 mb-2 mr-2"
                htmlFor="amigablePerros"
              >
                Amigable con Perros:
              </label>
              <input
                type="checkbox"
                id="amigablePerros"
                checked={amigablePerros}
                onChange={(e) => setAmigablePerros(e.target.checked)}
                className="w-5 h-5 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="text-emerald-800 mb-2 mr-2"
                htmlFor="amigableNiños"
              >
                Amigable con Niños:
              </label>
              <input
                type="checkbox"
                id="amigableNiños"
                checked={amigableNiños}
                onChange={(e) => setAmigableNiños(e.target.checked)}
                className="w-5 h-5 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="text-emerald-800 mb-2" htmlFor="urgencia">
                Urgencia:
              </label>
              <select
                id="urgencia"
                value={urgencia}
                onChange={(e) => setUrgencia(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" selected>
                  --Seleciona una opción--
                </option>
                <option value="urgente">Urgente</option>
                <option value="no urgente">No Urgente</option>
              </select>
            </div>
            <div>
              <label htmlFor="formfile" className="text-emerald-800 mb-2">
                Imagen
              </label>{" "}
              <br />
              <input
                className="form-control"
                id="formfile"
                type="file"
                name="foto"
                onChange={(e) => setImatge(e.target.files[0])}
              />
            </div>
            <div className="text-center">
              <br />
            </div>
          </div>
        </div>
        <div className="flex justify-center center-items">
          <button
            type="submit"
            className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm py-2 px-4 w-1/3 rounded-full focus:outline-none focus:shadow-outline"
          >
            Publicar{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AltaMascota;
