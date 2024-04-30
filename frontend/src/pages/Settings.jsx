import { Link } from "react-router-dom"
import { useContext, useState } from "react";
import Contexte from "../components/contexte";
import { editUser } from "../components/generic";


const Settings = () => {
    const { loguejat, setLoguejat } = useContext(Contexte);
    const [user, setUser] = useState({ name: loguejat.name, email: loguejat.email, phonenumber: loguejat.phonenumber, address: loguejat.address });

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await editUser(user, loguejat.id);
        setLoguejat(data);
    }


    return (
        <>
            <div className="text-white flex justify-between items-baseline bg-emerald-700 p-8 px-4 h-1/10  w-full ">

                <div className="pr-2 text-white">
                    <Link to='/profile'>Atras</Link>
                </div>

                <h1 className="ml-2 text-center font-sans font-bold text-white text-3xl tracking-[-.10em]">
                    <span className="text-4xl text-black">:</span>
                    Ajustes
                </h1>
                <div className="text-emerald-700 pr-2">atras</div>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <div className="md:flex md:items-center bg-white p-3 mb-6 rounded-lg">
                        <div className="md:w-1/3 mb-3 mt-12">
                            <label htmlFor="name">
                                Nombre
                            </label>
                            <input
                                placeholder="Nombre"
                                type="text"
                                name="name"
                                id="name"
                                onChange={handleChange}
                                value={user.name}
                                className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            />
                        </div>
                        <div className="md:w-1/3 mb-3">
                            <label htmlFor="email">
                                Email
                            </label>
                            <input
                                placeholder="Email"
                                type="text"
                                name="email"
                                id="email"
                                onChange={handleChange}
                                value={user.email}
                                className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            />
                        </div>
                        <div className="md:w-1/3 mb-3" x>
                            <label htmlFor="phonenumber">Telefono</label>
                            <input
                                placeholder="Teléfono"
                                type="text"
                                name="phonenumber"
                                id="phonenumber"
                                onChange={handleChange}
                                value={user.phonenumber}
                                className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            />
                        </div>
                        <div className="md:w-1/3 mb-5">
                            <label htmlFor="address">Ciudad</label>
                            <input
                                placeholder="Ciudad"
                                type="text"
                                name="address"
                                id="address"
                                onChange={handleChange}
                                value={user.address}
                                className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-emerald-700 hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm w-full sm:w-auto px-5 py-3  text-center"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Settings