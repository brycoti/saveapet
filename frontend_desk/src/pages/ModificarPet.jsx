import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexte from "../Contexte";

const ModificarAnimal = ({ animalId }) => {
   
    const [nombre, setNombre] = useState('');
    const [raza, setRaza] = useState('');
    const [edad, setEdad] = useState('');
    const [tamaño, setTamaño] = useState('');
    const [temperamento, setTemperamento] = useState('');
    const [amigablePerros, setAmigablePerros] = useState(false);
    const [amigableNiños, setAmigableNiños] = useState(false);
    const [urgencia, setUrgencia] = useState('not urgent');
    const [error, setError] = useState('');
    const { logout, API_URL, } = useContext(Contexte);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnimalData = async () => {
            try {
                const response = await fetch(`${API_URL}/animales/${animalId}`, { credentials: 'include' });
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
    }, [animalId]);

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
            const response = await fetch(`${API_URL}/animales/${animalId}`, {
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

            navigate('/list');
        } catch (error) {
            console.error('Error modifying animal data:', error);
            setError(error.message);
        }
    };

 

    return (
        <div>
        <h2>Modificar Mascota</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleModificar}>
            <div>
                <label>Nombre:</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div>
                <label>Raza:</label>
                <input type="text" value={raza} onChange={(e) => setRaza(e.target.value)} />
            </div>
            <div>
                <label>Edad:</label>
                <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} />
            </div>
            <div>
                <label>Tamaño:</label>
                <select value={tamaño} onChange={(e) => setTamaño(e.target.value)}>
                    <option value="big">Grande</option>
                    <option value="medium">Mediano</option>
                    <option value="small">Pequeño</option>
                </select>
            </div>
            <div>
                <label>Temperamento:</label>
                <input type="text" value={temperamento} onChange={(e) => setTemperamento(e.target.value)} />
            </div>
            <div>
                <label>Amigable con Perros:</label>
                <input type="checkbox" checked={amigablePerros} onChange={(e) => setAmigablePerros(e.target.checked)} />
            </div>
            <div>
                <label>Amigable con Niños:</label>
                <input type="checkbox" checked={amigableNiños} onChange={(e) => setAmigableNiños(e.target.checked)} />
            </div>
            <div>
                <label>Urgencia:</label>
                <select value={urgencia} onChange={(e) => setUrgencia(e.target.value)}>
                    <option value="urgent">Urgente</option>
                    <option value="not urgent">No Urgente</option>
                </select>
            </div>
            <button type="submit">Dar de Alta</button>
        </form>
    </div>
);
};

export default ModificarAnimal;
