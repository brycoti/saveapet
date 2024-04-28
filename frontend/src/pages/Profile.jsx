import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import contexte from "../components/contexte";

const Profile = () => {
  const { loguejat, logout } = useContext(contexte);
  const [animales, setAnimales] = useState([]);
  const [actualitza, setActualitza] = useState(false);

  const redirect = useNavigate();

  useEffect(() => {

    if (!loguejat) redirect('/login')

  }, [loguejat, redirect])


  useEffect(() => {
    const opcions = {
      credentials: "include",
    };

    fetch("http://localhost:3000/api/pets", opcions)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.error === "Unauthorized") {
          logout();
        } else {
          setAnimales(data);
        }
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, [actualitza, logout]);

  return (
    <div>
      <div className="overflow-x-auto flex flex-wrap items-center justify-center">
        <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 bg-white shadow-lg transform duration-200 easy-in-out">
          <div className="h-48 overflow-hidden bg-emerald-700 flex justify-between">
            <Link to="/settings" className="text-sm mt-2 mr-2 text-white p-3">
              Ajustes
            </Link>
            <h1 className="p-3 ml-2 font-sans text-white font-bold text-3xl tracking-[-.10em]">
              <span className="text-4xl text-black">:</span>Perfil
            </h1>
            <a onClick={logout} className="text-sm mt-2 mr-2 text-white p-3">
              Logout
            </a>
          </div>

          <div className="flex justify-center px-5  -mt-28">
            <img
              className="h-40 w-40 bg-white p-1 rounded-full"
              src="https://i.pinimg.com/236x/00/60/f8/0060f80e1526bbaa26f4c1628cc53c17.jpg"
              alt=""
            />
          </div>
          <div className="text-center px-3">
            <h2 className="text-gray-800 text-3xl font-bold">
              {loguejat?.name}
            </h2>
            <hr />
            <p className="p-3 text-gray-800 text-xl font-extrabold">
              Favoritos
            </p>
            <a href="/cuestionario">Cuestionario</a>
            <div className="overflow-x-auto h-46">
              <div className="flex">
                {/* {animales.map(animal => (
                  <img
                    key={animal.id}
                    src={`http://localhost:3000/uploads/${animal.foto}`}
                    className="w-auto h-52 m-1"
                    alt="Animal"
                  />
                ))} */}
              </div>
            </div>
          </div>

          <hr className="mt-7" />
          <div className="flex justify-around bg-gray-50 h-17 p-2 content-end">
            <Link to="/">
              <img
                src="https://www.freeiconspng.com/thumbs/dog-icon/dog-icon-4.png"
                alt="Centros"
                width="30"
                height="30"
              />
            </Link>
            <Link to="/">
              <img
                src="https://www.pngall.com/wp-content/uploads/4/House-Transparent.png"
                alt="Centros"
                width="30"
                height="30"
              />
            </Link>
            <button to="/profile">
              <img
                src="https://cdn-icons-png.flaticon.com/512/711/711769.png"
                alt="Perfil"
                width="30"
                height="30"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
