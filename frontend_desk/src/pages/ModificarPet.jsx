import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Contexte from "../components/contexte";
import { useParams } from "react-router-dom"; // Importa useParams
const ModificarAnimal = () => {
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [tamaño, setTamaño] = useState("");
  const [temperamento, setTemperamento] = useState("");
  const [amigablePerros, setAmigablePerros] = useState(false);
  const [amigableNiños, setAmigableNiños] = useState(false);
  const [urgencia, setUrgencia] = useState("not urgent");
  const [error, setError] = useState("");
  const { logout, API_URL } = useContext(Contexte);
  const [actualitza, setActualitza] = useState();
  const redirect = useNavigate();

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const response = await fetch(`${API_URL}/pets/${id}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Error al obtener los datos del animal");
          logout();
        }
        const data = await response.json();

        setNombre(data.name);
        setRaza(data.breed);
        setEdad(data.age);
        setTamaño(data.size);
        setTemperamento(data.temper);
        setAmigablePerros(data.dogs_friendly);
        setAmigableNiños(data.kids_friendly);
        setUrgencia(data.urgency);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAnimalData();
  }, []);

  const handleModificar = async () => {
    const newData = {
      name: nombre,
      breed: raza,
      age: edad,
      size: tamaño,
      temper: temperamento,
      dogs_friendly: amigablePerros,
      kids_friendly: amigableNiños,
      urgency: urgencia,
    };

    try {
      const response = await fetch(`${API_URL}/pets/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error("Error al modificar los datos del animal");
        logout();
      }

      redirect("/list");
    } catch (error) {
      console.error("Error modifying animal data:", error);
      setError(error.message);
    }
  };
  const remove = (item) => {
    const opcions = {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(API_URL + "/pets/" + item, opcions)
      .then((r) => r.json())
      .then((data) => {
        if (data.error === "Unauthorized") {
          logout();
        } else {
          setActualitza((prevState) => prevState + 1);
        }
        redirect("/list");
      })
      .catch((err) => console.log(err));
  };

  const handleCancelar = () => {
    // Redirige al usuario de vuelta a la lista de animales sin realizar ninguna acción
    redirect("/list");
  };

  return (
    <div className="max-w-md mx-auto p-3 font-mono mt-4">
      <form
        onSubmit={handleModificar}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        style={{ overflowY: "scroll", scrollbarWidth: "none" }}
      >
        <h2 className="text-center font-extrabold text-emerald-800 text-xl mb-4">
          Modificar Mascota
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
            <div className="text-center">
              <br />
            </div>
          </div>
        </div>
        <div className="flex justify-center center-items text-sm">
          <button
            type="submit"
            className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2 px-4 w-1/3 rounded-full focus:outline-none focus:shadow-outline"
          >
            Modificar mascota
          </button>
          <button
            className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 w-1/3 rounded-full ml-2 focus:outline-none focus:shadow-outline"
            onClick={() => remove(id)}
          >
            Eliminar mascota
          </button>
        </div>
      </form>

      <button
        type="button"
        onClick={handleCancelar}
        className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 text-sm"
      >
        Cancelar cambios
      </button>
    </div>
  );
};

export default ModificarAnimal;
