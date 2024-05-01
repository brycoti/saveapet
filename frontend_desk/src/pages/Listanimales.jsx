import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Contexte from "../components/contexte";

const ListaAnimales = () => {
  const [animales, setAnimales] = useState([]);
  const [error, setError] = useState("");
  const [actualitza, setActualitza] = useState(0);
  const { logout, API_URL, loguejat } = useContext(Contexte);
  const redirect = useNavigate();

  useEffect(() => {
    const opcions = {
      credentials: "include",
    };

    fetch(`${API_URL}/centers/${loguejat.userId}/animals`, opcions) // Modifica la ruta según la API
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.error === "Unauthorized") {
          logout();
        } else if (data.error) {
          setError(data.error); // Corregir asignación de error
        } else {
          setAnimales(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(error);
      });
  }, [actualitza]);

  const remove = (item) => {
    const opcions = {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(API_URL + "/pets/" + item.id, opcions)
      .then((r) => r.json())
      .then((data) => {
        if (data.error === "Unauthorized") {
          logout();
        } else {
          setActualitza((prevState) => prevState + 1);
        }
      })
      .catch((err) => console.log(err));
  };

  if (error) {
    return <h1 className="text-red-500">{error}</h1>;
  }

  return (
    <div className="container mx-auto p-4 mt-5 bg-emerald-800 rounded">
      <h1 className="font-sans text-white font-bold text-4xl tracking-[-.10em] mt-[-.5em] mb-4">
        <span className="text-5xl text-black">:</span>
        Tus animales
      </h1>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {animales
          .slice()
          .reverse()
          .map((animal) => (
            <div
              key={animal.id}
              className="bg-white rounded-md p-4 flex flex-col"
            >
              <h3 className="font-bold text-2xl">
                {animal.name}, {animal.age}
              </h3>
              <p className="text-xs italic text-gray-400 font-mono mb-2">
                {animal.breed}
              </p>
              <img
                src={`http://localhost:3000/uploads/${animal.foto}`}
                alt={animal.breed}
                className="mb-2 rounded border border-gray-400"
              />
              <div className="flex justify-around text-sm self-end">
                <button
                  className="mt-2 p-2 bg-sky-800 hover:bg-sky-700 text-white rounded-full flex items-center space-x-2 mr-3"
                  onClick={() => redirect(`/modificar/${animal.id}`)}
                >
                  Modificar a
                  <span className="font-bold ml-1">{animal.name}</span>
                </button>
                <button
                  className="mt-2 p-2 bg-pink-800 hover:bg-pink-700 text-white rounded-full flex items-center space-x-2"
                  onClick={() => redirect(`likes/${animal.id}`)}
                >
                  <img
                    src="https://www.iconpacks.net/icons/2/free-instagram-like-icon-3507-thumb.png"
                    alt="Icono de like"
                    className="w-6 h-6"
                  />{" "}
                  Likes
                </button>
              </div>
            </div>
          ))}
      </div>
      <button
        className="w-full mt-4 p-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded"
        onClick={() => redirect(`/alta`)}
      >
        Subir nuevo animal
      </button>
    </div>
  );
};

export default ListaAnimales;
