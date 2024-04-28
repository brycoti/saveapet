import "./App.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Contexte from "./components/contexte";
import { useState, useEffect } from "react";
const API_URL = "http://localhost:3000/api";

function App() {
  const redirect = useNavigate();
  const [loguejat, setLoguejat] = useState(null);
  const logout = () => {
    // Clear the authentication token cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Set the expiration date to a past date
    setLoguejat(null);
    window.history.replaceState(null, null, "/");
    window.location.href = "/login"; // Redirect to the login page
  };

  useEffect(() => {
    // si tenim una cookie, intentem validar-la!
    if (document.cookie.includes("token")) {
      fetch(`${API_URL}/refresh/center`, { credentials: "include" })
        .then((e) => e.json())
        .then((data) => {
          if (data.error) {
            // api rebutja la cookie local, l'esborrem per mitjà de la funció logout()
            //logout();
          } else {
            // api accepta la cookie, simulem login desant les dades rebudes a "loguejat"
            setLoguejat(data);
            redirect("perfil");
          }
        });
    } 
    if (!loguejat) {
      return redirect("/register")}
  }, []);

  const dades = { loguejat, setLoguejat, logout, API_URL };

  return (
    <Contexte.Provider value={dades}>
      {loguejat && (
  <div className="w-full flex items-center justify-between bg-emerald-800 p-8 rounded-b-lg">
    <Link to="/perfil" className="font-sans text-white font-bold text-4xl tracking-[-.10em] mt-[-1em]">
      Save a pet<span className="text-6xl text-black">.</span>
    </Link>
  <div className="text-right">
      {/*<Link
        className="text-white font-extrabold mr-5 hover:underline"
        to="/"
      >
        Inicio
      </Link>*/}
      <Link
        className="text-white font-extrabold mr-5 hover:underline"
        to="/perfil"
      >
        Perfil
      </Link>
      <button
        className="text-white font-extrabold mr-3 hover:underline"
        onClick={logout}
      >
        Logout <span className="bold text-orange-500">{loguejat.userName}</span> 
      </button>
    </div>
  </div>
)}

        <Outlet />
    </Contexte.Provider>
  );
}

export default App;
