import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { createUser } from "../components/generic";

const Register = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    phonenumber: "",
    address: "",
  });
  const redirect = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await createUser(newUser);

    if (success) redirect("/login");
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="font-sans font-bold text-4xl tracking-[-.10em]">
          Save a pet<span className="text-6xl text-emerald-700">.</span>
        </h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="md:flex md:items-center bg-white p-3 mb-6 rounded-lg">
            <div className="md:w-1/3 mb-3 mt-12">
              <input
                placeholder="Nombre"
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                value={newUser.name}
                className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
            <div className="md:w-1/3 mb-3">
              <input
                placeholder="Email"
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                value={newUser.email}
                className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
            <div className="md:w-1/3 mb-3">
              <input
                placeholder="Contraseña"
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={newUser.password}
                className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
            <div className="md:w-1/3 mb-3" x>
              <label htmlFor="phonenumber"></label>
              <input
                placeholder="Teléfono"
                type="text"
                name="phonenumber"
                id="phonenumber"
                onChange={handleChange}
                value={newUser.phonenumber}
                className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
            <div className="md:w-1/3 mb-5">
              <label htmlFor="address"></label>
              <input
                placeholder="Ciudad"
                type="text"
                name="address"
                id="address"
                onChange={handleChange}
                value={newUser.address}
                className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-emerald-700 hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm w-full sm:w-auto px-5 py-3 text-center"
            >
              Registrarse
            </button>
            <div className="flex justify-center items-center">
              <a href="/login">
                Tengo una cuenta.
                <span className="font-bold text-emerald-700"> Iniciar sesión</span>
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
