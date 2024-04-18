import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexte from '../components/contexte';

export default function AltaMascota() {
    const { API_URL } = useContext(Contexte);
    const [nombre, setNombre] = useState('');
    const [raza, setRaza] = useState('');
    const [edad, setEdad] = useState('');
    const [tamaño, setTamaño] = useState('');
    const [temperamento, setTemperamento] = useState('');
    const [amigablePerros, setAmigablePerros] = useState(false);
    const [amigableNiños, setAmigableNiños] = useState(false);
    const [urgencia, setUrgencia] = useState('not urgent');
    const [error, setError] = useState('');
    const [imatge, setImatge] = useState();
    const redirect = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevaMascota = {
            name: nombre,
            breed: raza,
            age: parseInt(edad),
            size: tamaño,
            temper: temperamento,
            dogs_friendly: amigablePerros,
            kids_friendly: amigableNiños,
            urgency: urgencia,
            foto: imatge
        };

        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaMascota)
        };

        try {
            const response = await fetch(`${API_URL}/center/newpet`, options);
            const data = await response.json();
            if (!data.error) {
                redirect("/list");
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('Failed to register pet. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="w-full h-2 max-w-lg m-auto">
            <form onSubmit={handleSubmit} className=" bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-center">Dar de Alta Nueva Mascota</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="raza">Raza:</label>
                    <input type="text" id="raza" value={raza} onChange={(e) => setRaza(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edad">Edad:</label>
                    <input type="number" id="edad" value={edad} onChange={(e) => setEdad(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tamaño">Tamaño:</label>
                    <select id="tamaño" value={tamaño} onChange={(e) => setTamaño(e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="big">Grande</option>
                        <option value="medium">Mediano</option>
                        <option value="small">Pequeño</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="temperamento">Temperamento:</label>
                    <select id="temperamento" value={temperamento} onChange={(e) => setTemperamento(e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="energetic">Energico</option>
                        <option value="calm">Tranquilo</option>
                        <option value="playful">Juguetón</option>
                        <option value="shy">Tímido</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amigablePerros">Amigable con Perros:</label>
                    <input type="checkbox" id="amigablePerros" checked={amigablePerros} onChange={(e) => setAmigablePerros(e.target.checked)} className="leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amigableNiños">Amigable con Niños:</label>
                    <input type="checkbox" id="amigableNiños" checked={amigableNiños} onChange={(e) => setAmigableNiños(e.target.checked)} className="leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="urgencia">Urgencia:</label>
                    <select id="urgencia" value={urgencia} onChange={(e) => setUrgencia(e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="urgent">Urgente</option>
                        <option value="not urgent">No Urgente</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="formfile">Foto de la Mascota</label>
                    <input className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="formfile" type="file" name="foto" onChange={(e) => setImatge(e.target.files[0])} />
                </div>
                <div className="text-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Dar de Alta
                    </button>
                </div>
            </form>
        </div>
    );
}
