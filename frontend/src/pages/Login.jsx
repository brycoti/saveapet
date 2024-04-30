import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contexte from "../components/contexte";
import { editUser, login } from "../components/generic";


const Login = () => {
    const { loguejat, setLoguejat } = useContext(Contexte);
    const [user, setUser] = useState({ email: "", password: "" });
    const redirect = useNavigate();

    useEffect(() => {
        if (loguejat) {
            redirect('/');
        }
    }, [loguejat, redirect]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await login(user);
        if (!data.error) {
            setLoguejat(data)

            if (!data.already_logged) {
                const information = { already_logged: true }
                editUser(information, data.id);
                redirect('/cuestionario')
            } else {
                redirect('/')
            }
        }
    }

    return (
        <>
            <div className="flex justify-center items-center">
                <h1 className="font-sans font-bold text-4xl tracking-[-.10em]">Save a pet<span className="text-6xl text-emerald-700">.</span></h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="md:flex md:items-center bg-white p-3 mb-6 rounded-lg">
                        <div className="md:w-1/3 mb-3 mt-12">
                            <input
                                onChange={handleChange}
                                placeholder="Email"
                                type="text"
                                name="email"
                                id="email"
                                value={user.email}
                                className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            />
                        </div>
                        <div className="md:w-2/3 mb-8">
                            <input
                                onChange={handleChange}
                                placeholder="Password"
                                type="password"
                                name="password"
                                id="password"
                                value={user.password}
                                className="font-mono text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            />
                        </div>
                        <br />
                        <button
                            type="submit"
                            className="text-white bg-emerald-700 hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm w-full sm:w-auto px-5 py-3 text-center"
                        >
                            Iniciar sesión
                        </button>
                        <div className="flex justify-center items-center">
                            <a href="/register">¿No tienes cuenta? <span className="font-bold text-emerald-700">Regístrate</span></a>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">

                        <a href="" className="text-white bg-slate-900 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm sm:w-auto px-5 py-3 text-center">Acceso centros</a>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
