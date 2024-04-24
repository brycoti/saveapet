
import './App.css'
import { Outlet, Link,useNavigate } from "react-router-dom";
import Contexte from "./components/contexte";
import { useState, useEffect } from 'react';
const API_URL = 'http://saveapet.westeurope.cloudapp.azure.com/api';

function App() {
  const redirect = useNavigate()
  const [loguejat, setLoguejat] = useState(null)
  const logout = () => {
    // Clear the authentication token cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Set the expiration date to a past date
    setLoguejat(null)
    window.history.replaceState(null, null, "/");
    window.location.href = "/login"; // Redirect to the login page
    
  };
 

  

  useEffect(() => {
    // si tenim una cookie, intentem validar-la!
    if(document.cookie.includes('token')){
      fetch(`${API_URL}/refresh/center`, {credentials: "include"})
      .then(e => e.json())
      .then(data => {
        if (data.error){
          // api rebutja la cookie local, l'esborrem per mitjà de la funció logout()
          //logout();
        } else {
          // api accepta la cookie, simulem login desant les dades rebudes a "loguejat"
          setLoguejat(data)
          redirect("perfil")
          console.log(loguejat) 
        }
      })
    }
    if (!loguejat) {
      return redirect("/login");
    }
  
  }, [])
  


  console.log(loguejat);

  const dades = { loguejat, setLoguejat, logout, API_URL };

 
  return (
    <Contexte.Provider value={dades}>
      <div className="flex flex-col gap-3 justify-center items-center p-[50px]">
      <h1 className="text-3xl text-lime-200 mb-10 font-extrabold">SAVE A PET</h1>
        <div>
          {loguejat && <Link className="rounded-md border px-4 py-2 mx-4 bg-yellow-300 hover:bg-blue-700 text-white" to="/">Inicio</Link>}
          {loguejat && <Link className="rounded-md border px-4 py-2 mx-4 bg-green-400 hover:bg-blue-700 text-white" to="/perfil">Perfil</Link>}
          {loguejat && <button className="rounded-md border px-4 py-2 mx-4 bg-orange-300 hover:bg-blue-700 text-white" onClick={logout}>Logout {loguejat.userName}</button>}
        </div>
        
        <div className="p-10">
          <Outlet />
        </div>
      </div>
    </Contexte.Provider>
  );
  
}

export default App;

