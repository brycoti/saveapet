import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Contexte from "../components/contexte";

const Likes = () => {
  const { id } = useParams(); // Obtener el ID del animal de los parámetros de la URL
  const [likes, setLikes] = useState([]);
  const [error, setError] = useState("");
  const { logout, API_URL } = useContext(Contexte);
  const redirect = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/center/petmatches/${id}`, { credentials: "include" })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error === "Unauthorized") {
          //logout();
        } else if (data.error) {
          setError(data.error); // Corregir asignación de error
        } else {
          setLikes(data);
          console.log(likes);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(error);
      });
  }, []);

  if (error) {
    return <h1 className="text-red-500">{error}</h1>;
  }

  const handleAdopt = async (x) => {
    try {
      console.log("ID del usuario a adoptar:", x); // Agregar este console.log
      const response = await fetch(`${API_URL}/adopt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId: x, petId: id }),
      });
      if (response.ok) {
        // Lógica para manejar la adopción exitosa
        console.log("Adoption successful");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error("Error adopting pet:", error);
      setError(error.message);
    }
  };

  if (error) {
    return <h1 className="text-red-500">{error}</h1>;
  }
  return (
    <>
      <h1
        to="/perfil"
        className="p-3 font-sans text-white font-bold text-4xl tracking-[-.10em]"
      >
        <span className="text-5xl text-emerald-800">:</span>
        Likes
      </h1>
      <div className="grid grid-cols-4 gap-4 p-3">
        {console.log(likes)}
        {likes.map((like, index) => (
          <div
            key={index}
            className="bg-white text-black rounded-md p-4 flex flex-col"
            style={{ alignSelf: 'start' }}
          >
            <p className="text-lg font-semibold mb-2">Usuario: {like.name}</p>
            <p className="mb-1">
              <span className="font-semibold">Email:</span>{" "}
              <span>{like.email}</span>
            </p>
            <p className="mb-1">
              <span className="font-semibold">Dirección:</span> {like.address}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Teléfono:</span>{" "}
              {like.phonenumber}
            </p>
            <div className="mx-auto bg-emerald-700 text-white rounded-lg p-4">
              <h2 className="font-extrabold">Más información</h2>
              <ul>
                {like.other_pets ? (
                  <li>- Tengo más perros en casa</li>
                ) : (
                  <li>- No tengo más mascotas</li>
                )}
              </ul>
              <p>- Vivo en un/a {like.home}</p>
              <p>- Estoy buscando un perro {like.age_range}</p>
              <p>
                {like.kids_at_home
                  ? "- Tengo hijos pequeños"
                  : "- No tengo hijos pequeños"}
              </p>
              <p>
                {like.ill_pets
                  ? "- No tendría inconveniente en adoptar un perro con alguna discapacidad"
                  : "- No adoptaría un perro con una discapacidad"}
              </p>
            </div>
            <br />

            <button
              onClick={() => handleAdopt(like.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-1 py-2 px-4 rounded self-end"
            >
              Asignar adopción
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Likes;
