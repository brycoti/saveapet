import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import contexte from '../components/contexte';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [web, setWeb] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {API_URL}=useContext(contexte);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            email,
            password,
            phonenumber,
            web,
            city,
            address
        };

        try {
            const response = await fetch(`${API_URL}/register/center`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Error al registrar el centro');
            }
            navigate('/login'); // Redirige al usuario al login después de registrarse correctamente
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="w-full max-w-xs m-auto">
            <form onSubmit={handleSubmit} className="bg-green-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-center text-green-600 font-bold">Registro de Centro</h2>
                <br />
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4">
                    <label className="block text-green-500 text-sm font-bold mb-2" htmlFor="name">
                        Nombre:
                    </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-green-500 leading-tight focus:outline-none focus:shadow-outline" id="name" />
                </div>
                <div className="mb-4">
                    <label className="block text-green-500 text-sm font-bold mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-green-500 leading-tight focus:outline-none focus:shadow-outline" id="email" />
                </div>
                <div className="mb-4">
                    <label className="block text-green-500 text-sm font-bold mb-2" htmlFor="password">
                        Contraseña:
                    </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-green-500 leading-tight focus:outline-none focus:shadow-outline" id="password" />
                </div>
                <div className="mb-4">
                    <label className="block text-green-500 text-sm font-bold mb-2" htmlFor="phoneNumber">
                        Número de teléfono:
                    </label>
                    <input type="text" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-green-500 leading-tight focus:outline-none focus:shadow-outline" id="phonenumber" />
                </div>
                <div className="mb-4">
                    <label className="block text-green-500 text-sm font-bold mb-2" htmlFor="web">
                        Página web:
                    </label>
                    <input type="text" value={web} onChange={(e) => setWeb(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-green-500 leading-tight focus:outline-none focus:shadow-outline" id="web" />
                </div>
                <div className="mb-4">
                    <label className="block text-green-500 text-sm font-bold mb-2" htmlFor="city">
                        Ciudad:
                    </label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-green-500 leading-tight focus:outline-none focus:shadow-outline" id="city" />
                </div>
                <div className="mb-4">
                    <label className="block text-green-500 text-sm font-bold mb-2" htmlFor="address">
                        Dirección:
                    </label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" />
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
