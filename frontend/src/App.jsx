import { useState, useCallback, useEffect } from 'react'
import Contexte from "./components/contexte";
import { Outlet } from "react-router-dom";


function App() {
  const [loguejat, setLoguejat] = useState(null)

  const logout = useCallback(() => {

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // 
    setLoguejat(null)
    window.location.href = "/login"; // 
  }, [setLoguejat]);

  useEffect(() => {
    const API_URL = 'http://api.saveapet.westeurope.cloudapp.azure.com/api';

    if (document.cookie.includes('token')) {
      fetch(API_URL + '/refresh', { credentials: "include" })
        .then(e => e.json())
        .then(data => {
          if (data.error) {
            logout();
          } else {
            setLoguejat(data)
          }
        })
    }

  }, [logout])

  const dades = { loguejat, setLoguejat, logout }
  return (
    <>
      <Contexte.Provider value={dades}>
        <div >
          <Outlet />
        </div>
      </Contexte.Provider>
    </>
  )
}

export default App;
