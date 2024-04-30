import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../components/generic";

const Register = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    phonenumber: "",
    address: "",
    home: "",
    other_pets: "",
    age_range: "",
    kids_at_home: "",
    ill_pets: "",
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
            <h1></h1>
            <div className="md:w-1/3 mb-3 mt-8">
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

            <div className="bg-emerald-800 p-4 text-white rounded-lg font-mono text-sm">
            <div className="md:w-1/3 mb-5">
              <label htmlFor="home">
                ¿En qué tipo de vivienda resides habitualmente?
              </label>
              <select
                name="home"
                id="home"
                onChange={handleChange}
                value={newUser.home}
                className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              >
                <option value="casa">Casa</option>
                <option value="piso">Piso</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="md:w-1/3 mb-5">
              <label htmlFor="other_pets">
                ¿Tienes otros animales en casa?
              </label>
              <select
                name="other_pets"
                id="other_pets"
                onChange={handleChange}
                value={newUser.other_pets}
                className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              >
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="md:w-1/3 mb-5">
              <label htmlFor="age_range">
                ¿Qué edad preferirías que tuviera el perro que vas a adoptar?
              </label>
              <select
                name="age_range"
                id="age_range"
                onChange={handleChange}
                value={newUser.ill_pets}
                className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              >
                <option value="cachorro">Cachorro</option>
                <option value="joven">Joven</option>
                <option value="mayor">Mayor</option>
              </select>
            </div>

            <div className="md:w-1/3 mb-5">
              <label htmlFor="kids_at_home">¿Tienes niños en casa?</label>
              <select
                name="kids_at_home"
                id="kids_at_home"
                onChange={handleChange}
                value={newUser.kids_at_home}
                className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              >
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="md:w-1/3">
              <label htmlFor="ill_pets">
                ¿Estarías dispuesto a adoptar un animal con leishmania, leucemia
                u otras enfermedades?
              </label>
              <select
                name="ill_pets"
                id="ill_pets"
                onChange={handleChange}
                value={newUser.ill_pets}
                className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              >
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
            </div>
<br />
            <button
              type="submit"
              className="text-white bg-emerald-700 hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm w-full sm:w-auto px-5 py-3 text-center"
            >
              Registrarse
            </button>
            <div className="flex justify-center items-center">
              <a href="/login">
                Tengo una cuenta.
                <span className="font-bold text-emerald-700">
                  {" "}
                  Iniciar sesión
                </span>
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
