import { useState, useCallback } from 'react'
import Contexte from "./components/contexte";
import { Outlet } from "react-router-dom";

function App() {
  const [loguejat, setLoguejat] = useState(null)

  const logout = useCallback(() => {

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // 
    setLoguejat(null)
    window.location.href = "/"; // 
  }, [setLoguejat]);

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

export default App
