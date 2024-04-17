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
                redirect('/profile')
            } else {
                redirect('/')
            }
        }
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="md:flex md:items-center bg-white p-3 mb-6 rounded-lg">
                        <div className="md:w-1/3">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Email
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="email"
                                id="email"
                                value={user.email}
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
                                onChange={handleChange}
                                type="password"
                                name="password"
                                id="password"
                                value={user.password}
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
