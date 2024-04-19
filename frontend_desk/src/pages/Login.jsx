
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Contexte from "../components/contexte";

export default function Login() {
    const { loguejat, setLoguejat, API_URL } = useContext(Contexte);
    const [email, setEmail] = useState('@gmail.com');
    const [password, setPassword] = useState('');
    const redirect = useNavigate();

    const logueja = (e) => {
        e.preventDefault();
        const credencials = { email, password };
        const opcions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credencials)
        };

        fetch(`${API_URL}/login/center`, opcions)
            .then(resp => resp.json())
            .then(data => {
                if (!data.error) {
                    localStorage.setItem('token', data.cookie);
                    setLoguejat(data);
                    redirect('/perfil');
                }
            })
            .catch(err => console.log(err))
    };

    return (
        <div className="w-auto h-screen  flex justify-center items-center">
            <form onSubmit={logueja} className="bg-green-100 shadow-md rounded px-8 pt-6 pb-8">
                <h1 className="text-center font-bold text-green-500 text-2xl">Login</h1>
                <div className="mb-4">
                    <label className="block text-green-500 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        onInput={(e) => setEmail(e.target.value)}
                        value={email}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-green-500 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Username" />
                </div>
                <div className="mb-6">
                    <label className="block text-green-500 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        onInput={(e) => setPassword(e.target.value)}
                        value={password} className="shadow appearance-none border
                    rounded w-full py-2 px-3 text-green-800 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                </div>
                <div className="text-center">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Entrar
                    </button>
                    <button className="mx-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => redirect('/register')}>
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    );
}
