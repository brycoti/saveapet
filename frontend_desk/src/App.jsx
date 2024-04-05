import './App.css'
import { Outlet, Link } from "react-router-dom";
import Contexte from "./Contexte";
import { useState } from 'react';
import { useEffect } from 'react';
const API_URL = 'http://localhost:3000/api';
function App() {

  const logout = () => {

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.history.replaceState(null, null, "/");
    window.location.href = "/login";
  };

  const [loguejat, setLoguejat] = useState(null)

  // REFRESH DE LES CREDENCIALS
  // per evitar demanar el login continuament...

  useEffect(() => {
    // si tenim una cookie, intentem validar-la!
    if (document.cookie.includes('token')) {
      fetch(API_URL + '/refresh', { credentials: "include" })
        .then(e => e.json())
        .then(data => {
          if (data.error) {
            // api rebutja la cookie local, l'esborrem per mitjà de la funció logout()
            logout();
          } else {
            // api accepta la cookie, simulem login desant les dades rebudes a "loguejat"
            setLoguejat(data)
          }
        })
    }

  }, [])

  const dades = { loguejat, setLoguejat, logout, API_URL }

  return (
    <Contexte.Provider value={dades}>

      <div className="p-[50px]">
        {loguejat && <Link className="border px-4 py-2 bg-blue-700 text-white" to="/">Inici</Link>}
        {loguejat && <button className="border px-4 py-2 bg-blue-700 text-white" onClick={logout}>Logout {loguejat.name}</button>}
        <div className=" p-10">
          <Outlet />
        </div>
      </div>
    </Contexte.Provider>

  )
}

export default App