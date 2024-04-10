import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contexte from "../components/contexte";
const API_URL = "http://localhost:3000/api";

const Login = () => {
  const { loguejat, setLoguejat } = useContext(Contexte);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = useNavigate();

  useEffect(() => {
    console.log("Value of loguejat changed:", loguejat);
  }, [loguejat]);
  
  const logueja = (e) => {
    e.preventDefault();
    console.log("loguejant..", email, password)
    const credencials = { email, password }
    const opcions = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(credencials)
    };

    fetch(API_URL+'/login', opcions)
    .then(resp => resp.json())
    .then(data => {    
      console.log("resp", data);

      if (!data.error) {
        localStorage.setItem('token', data.cookie);
        setLoguejat(data);
        redirect("/profile");
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <div>
        <form onSubmit={logueja}>
          <div className="md:flex md:items-center bg-white p-3 mb-6 rounded-lg">
            <div className="md:w-1/3">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                onInput={(e)=> setEmail(e.target.value)}
                type="text"
                name="email"
                id="email"
                value={email}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
            <div className="md:w-2/3">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                onInput={(e)=> setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                value={password}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
            <br />
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
