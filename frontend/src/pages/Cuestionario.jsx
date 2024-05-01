import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import contexte from "../components/contexte";
import { editUser } from "../components/generic";

const Cuestionario = () => {
  const { loguejat, setLoguejat } = useContext(contexte);
  const [quest, setQuest] = useState({ home: loguejat?.home, other_pets: loguejat.other_pets, age_range: loguejat?.age_range, kids_at_home: loguejat?.kids_at_home, ill_pets: loguejat?.ill_pets })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuest({
      ...quest,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await editUser(quest, loguejat.id);
    setLoguejat(data);
  };

  return (
    <div>
      <div className="text-white flex justify-between items-baseline bg-emerald-700 p-8 px-4 h-1/10  w-full ">

        <div className="pr-2 text-white">
          <Link to='/profile'>Atrás</Link>
        </div>

        <h1 className="ml-2 text-center font-sans font-bold text-white text-3xl tracking-[-.10em]">
          <span className="text-4xl text-black">:</span>
          Cuestionario
        </h1>
        <div className="text-emerald-700 pr-2">atras</div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="md:flex md:items-center bg-white p-3 mb-6 rounded-lg">
            <div className="md:w-1/3 mb-3 mt-12">
              <label htmlFor="home">
                ¿En qué tipo de vivienda resides habitualmente?
              </label>
              <br />
              <select name="home" id="home" onChange={handleChange} value={quest.home} className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-2/3  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                <option value=""></option>
                <option value="piso">En un piso</option>
                <option value="casa">En una casa</option>
                <option value="otro">Otro tipo de vivienda</option>
              </select>

            </div>
            <div className="md:w-1/3 mb-3">
              <label htmlFor="other_pets">¿Tienes animales en casa?</label>
              <br />
              <select name="other_pets" id="other_pets" onChange={handleChange} value={quest.other_pets} className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-2/3  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                <option value=""></option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </div>
            <div className="md:w-1/3 mb-3">
              <label htmlFor="age_range">
                ¿Qué edad preferiría que tuviera el perro que va a adoptar?
              </label>
              <br />
              <select name="age_range" id="age_range" onChange={handleChange} value={quest.age_range} className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-2/3  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                <option value=""></option>
                <option value="cachorro">Cachorro (1 año)</option>
                <option value="joven">Adulto joven (1-5 años)</option>
                <option value="mayor">Adulto mayor (5+ años)</option>
              </select>
            </div>
            <div className="md:w-1/3 mb-3" >
              <label htmlFor="kids_at_home">¿Tienes niños en casa?</label>
              <br />
              <select name="kids_at_home" id="kids_at_home" onChange={handleChange} value={quest.kids_at_home} className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-2/3  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                <option value=""></option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>

            </div>
            <div className="md:w-1/3 mb-10">
              <label htmlFor="ill_pets">
                ¿Estaría dispuesto a adoptar un animal con leishmania, leucemia u
                otras enfermedades?
              </label>
              <br />
              <select name="ill_pets" id="ill_pets" onChange={handleChange} value={quest.ill_pets} className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-2/3  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                <option value=""></option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </div>
            <button
              type="submit"
              href="/profile"
              className="text-white bg-emerald-700 hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm w-full sm:w-auto px-5 py-3 text-center"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cuestionario;
