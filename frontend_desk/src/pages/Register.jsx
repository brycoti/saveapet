import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexte from '../Contexte';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [web, setWeb] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');

    const redirect = useNavigate();
    const { API_URL } = useContext(Contexte)

    const handleRegister = (e) => {
        e.preventDefault();
        const credentials = {
            email,
            password,
            name,
            phonenumber,
            web,
            city,
            address
        }
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }

        fetch(API_URL + '/register/center', options)
            .then(resp => resp.json())
            .then(data => {
                console.log("resp", data);
                if (!data.error) {
                    redirect('/')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="w-full max-w-xs m-auto">
            <form onSubmit={handleRegister} className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-center">Registro</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nombre
                    </label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Nombre" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phonenumber">
                        Teléfono
                    </label>
                    <input
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={phonenumber}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phonenumber" type="text" placeholder="Teléfono" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="web">
                        Sitio Web
                    </label>
                    <input
                        onChange={(e) => setWeb(e.target.value)}
                        value={web}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="web" type="text" placeholder="Sitio Web" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                        Ciudad
                    </label>
                    <input
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="city" type="text" placeholder="Ciudad" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Dirección
                    </label>
                    <input
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="Dirección" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Contraseña" />
                </div>
                <div className="text-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register;
