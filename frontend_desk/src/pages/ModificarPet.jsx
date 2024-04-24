import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexte from "../components/contexte";
import { useParams } from 'react-router-dom'; // Importa useParams
const ModificarAnimal = () => {
    const { id } = useParams();
   
    const [nombre, setNombre] = useState('');
    const [raza, setRaza] = useState('');
    const [edad, setEdad] = useState('');
    const [tamaño, setTamaño] = useState('');
    const [temperamento, setTemperamento] = useState('');
    const [amigablePerros, setAmigablePerros] = useState(false);
    const [amigableNiños, setAmigableNiños] = useState(false);
    const [urgencia, setUrgencia] = useState('not urgent');
    const [error, setError] = useState('');
    const { logout, API_URL } = useContext(Contexte);
    const [actualitza,setActualitza] =useState()
    const redirect = useNavigate();

    useEffect(() => {
        const fetchAnimalData = async () => {
            try {
                const response = await fetch(`${API_URL}/pets/${id}`, { credentials: 'include' });
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del animal');
                    logout();
                }
                const data = await response.json();
               
                setNombre(data.name);
                setRaza(data.breed);
                setEdad(data.age);
                setTamaño(data.size);
                setTemperamento(data.temper);
                setAmigablePerros(data.dogs_friendly);
                setAmigableNiños(data.kids_friendly);
                setUrgencia(data.urgency);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchAnimalData();
    }, []);

    const handleModificar = async () => {
        const newData = {
            name: nombre,
            breed: raza,
            age: edad,
            size: tamaño,
            temper: temperamento,
            dogs_friendly: amigablePerros,
            kids_friendly: amigableNiños,
            urgency: urgencia
        };

        try {
            const response = await fetch(`${API_URL}/pets/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            });

            if (!response.ok) {
                throw new Error('Error al modificar los datos del animal');
                logout();
            }

            redirect("/list");
        } catch (error) {
            console.error('Error modifying animal data:', error);
            setError(error.message);
        }
    };
    const remove = (item) => {
        const opcions = {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        };
        fetch(API_URL + '/pets/' + item, opcions)
            .then(r => r.json())
            .then(data => {
                if (data.error === 'Unauthorized') {
                    logout();
                } else {
                    setActualitza(prevState => prevState + 1);
                }
                redirect('/list');
            })
            .catch(err => console.log(err));
    };

    
    const handleCancelar = () => {
        // Redirige al usuario de vuelta a la lista de animales sin realizar ninguna acción
        redirect('/list');
    };

 

    return (
        <div className="max-w-md mx-auto p-4 bg-green-200 shadow-md rounded-lg text-green-500">
    <h2 className="text-xl text-white font-bold text-center mb-6">Modificar Mascota</h2>
    {error && <p className="text-red-500 text-center">{error}</p>}
    <form onSubmit={handleModificar} className="space-y-4">
        <div>
            <label className="block font-medium">Nombre:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-input w-full mt-1"/>
        </div>
        <div>
            <label className="block font-medium">Raza:</label>
            <input type="text" value={raza} onChange={(e) => setRaza(e.target.value)} className="form-input w-full mt-1"/>
        </div>
        <div>
            <label className="block font-medium">Edad:</label>
            <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} className="form-input w-full mt-1"/>
        </div>
        <div>
            <label className="block font-medium">Tamaño:</label>
            <select value={tamaño} onChange={(e) => setTamaño(e.target.value)} className="form-select w-full mt-1">
                
                <option value="big">Grande</option>
                <option value="medium">Mediano</option>
                <option value="small">Pequeño</option>
            </select>
        </div>
        <div className="mb-4">
                    <label className="block text-green-500 text-sm font-bold mb-2" htmlFor="temperamento">Temperamento:</label>
                    <select  id="temperamento" value={temperamento} onChange={(e) => setTemperamento(e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="" selected>seleccione una opcion</option>
                        <option value="energetic">Energico</option>
                        <option value="calm">Tranquilo</option>
                        <option value="playful">Juguetón</option>
                        <option value="shy">Tímido</option>
                    </select>
                </div>
        <div>
            <label className="block font-medium">Amigable con Perros:</label>
            <input type="checkbox" checked={amigablePerros} onChange={(e) => setAmigablePerros(e.target.checked)} className="mt-2"/>
        </div>
        <div>
            <label className="block font-medium">Amigable con Niños:</label>
            <input type="checkbox" checked={amigableNiños} onChange={(e) => setAmigableNiños(e.target.checked)} className="mt-2"/>
        </div>
        <div>
            <label className="block font-medium">Urgencia:</label>
            <select value={urgencia} onChange={(e) => setUrgencia(e.target.value)} className="form-select w-full mt-1">
                <option value="urgent">Urgente</option>
                <option value="not urgent">No Urgente</option>
            </select>
        </div>
        <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-6">Modificar</button>
    </form>
    <button className="mt-2 p-2 rounded-md bg-red-500 text-white" onClick={() => remove(id)}>eliminar</button>
    <button type="button" onClick={handleCancelar} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">Cancelar modificacion</button>
</div>

);
};

export default ModificarAnimal;
