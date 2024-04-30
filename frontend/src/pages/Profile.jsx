import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import contexte from "../components/contexte";

const Profile = () => {
  const { loguejat, logout } = useContext(contexte);
  const [animales, setAnimales] = useState([]);


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
        if (data.error === "Unauthorized") {
          logout();
        } else {
          setAnimales(data);
        }
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, [logout]);

  return (
    <>
      <div className="overflow-x-auto flex flex-wrap items-center justify-center">
        <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 bg-white shadow-lg transform duration-200 easy-in-out flex flex-col justify-between h-screen w-full">
          <div className="flex flex-col">
            <div className="h-48 overflow-hidden bg-emerald-700 flex justify-between">
              <Link to="/settings" className="text-sm mt-2 mr-2 text-white p-3">
                Ajustes
              </Link>
              <div className="flex flex-col items-center">
                <h1 className="px-3 font-sans text-white font-bold text-3xl tracking-[-.10em]">
                  <span className="text-3xl text-black">:</span>Perfil
                </h1>
                <h1 className="px-2 font-sans text-white font-bold text-2xl">{loguejat?.name}</h1>
              </div>
              <a onClick={logout} className="text-sm mt-2 mr-2 text-white p-3">
                Logout
              </a>
            </div>
          </div>

          <div className="flex justify-center px-5 relative mt-2">
            <img
              className="h-40 w-40 bg-white p-1 rounded-full absolute bottom-1/4"
              src="https://i.pinimg.com/236x/00/60/f8/0060f80e1526bbaa26f4c1628cc53c17.jpg"
              alt=""
            />
          </div>
          <div className="text-center px-3">
            <Link className="p-3 bg-emerald-700 text-white text-xl font-semibold border border-emerald-700 rounded-full" to="/cuestionario">Cuestionario</Link>
            <br />
            <br />
            <p className="p-3 text-gray-800 text-xl font-extrabold">
              Favoritos
            </p>

            <div className="overflow-x-auto h-46">
              <div className="flex">
                {animales.map(animal => (
                  <img
                    onClick={() => { redirect('/pet/' + animal.id) }}
                    key={animal.id}
                    src={`http://localhost:3000/uploads/${animal.foto}`}
                    className="w-auto h-52 m-1"
                    alt="Animal"
                  />
                ))}

              </div>
            </div>
          </div>

          <hr className="mt-8" />
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
    </>
  );
};

export default Profile;
