import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import contexte from '../components/contexte';

const AltaMascota = () => {
    const { API_URL } = useContext(contexte);
    const [nombre, setNombre] = useState('');
    const [raza, setRaza] = useState('');
    const [edad, setEdad] = useState('');
    const [tamaño, setTamaño] = useState('');
    const [temperamento, setTemperamento] = useState('');
    const [amigablePerros, setAmigablePerros] = useState(false);
    const [amigableNiños, setAmigableNiños] = useState(false);
    const [urgencia, setUrgencia] = useState('');
    const [error, setError] = useState('');
    const [imatge, setImatge] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', nombre);
        formData.append('breed', raza);
        formData.append('age', parseInt(edad));
        formData.append('size', tamaño);
        formData.append('temper', temperamento);
        formData.append('dogs_friendly', amigablePerros);
        formData.append('kids_friendly', amigableNiños);
        formData.append('urgency', urgencia);
        if (imatge) {
            formData.append('foto', imatge);
        }

        const options = {
            method: 'POST',
            credentials: 'include',
            body: formData
        };

        try {
            const response = await fetch(API_URL + '/center/newpet', options);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to upload new pet');
            }
            await response.json(); // We might want to use this response data for something
            navigate("/list");
        } catch (e) {
            console.error("Upload error:", e);
            setError(e.message || 'Error uploading pet.');
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
                <div>
                    <label>Tamaño:</label>
                    <select value={tamaño} onChange={(e) => setTamaño(e.target.value)}>
                    <option value="" selected>seleccione una opcion</option>
                        <option value="big">Grande</option>
                        <option value="medium">Mediano</option>
                        <option value="small">Pequeño</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="temperamento">Temperamento:</label>
                    <select id="temperamento" value={temperamento} onChange={(e) => setTemperamento(e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="" selected>seleccione una opcion</option>
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
                    <option value="" selected>seleccione una opcion</option>
                        <option value="urgent">Urgente</option>
                        <option value="not urgent">No Urgente</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="formfile" className="form-label">Imagen</label>
                    <input className="form-control" id="formfile" type="file" name="foto" onChange={(e) => setImatge(e.target.files[0])} />
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        subir pet nuevo
                    </button>
                </div>
            </form>
        </div>
    );
};



export default AltaMascota;
