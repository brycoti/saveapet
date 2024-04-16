import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import contexte from '../components/contexte';

const AltaMascota = () => {
    const token = localStorage.getItem('token');
    const {API_URL}=useContext(contexte)
    const [nombre, setNombre] = useState('');
    const [raza, setRaza] = useState('');
    const [edad, setEdad] = useState('');
    const [tamaño, setTamaño] = useState('');
    const [temperamento, setTemperamento] = useState('');
    const [amigablePerros, setAmigablePerros] = useState(false);
    const [amigableNiños, setAmigableNiños] = useState(false);
    const [urgencia, setUrgencia] = useState('not urgent');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear objeto de mascota
        const nuevaMascota = {
            name: nombre,
            breed: raza,
            age: parseInt(edad),
            size: tamaño,
            temper: temperamento,
            dogs_friendly: amigablePerros,
            kids_friendly: amigableNiños,
            urgency: urgencia
        };

        // Enviar datos al servidor para dar de alta la mascota
        try {
            const response =  await fetch(`${API_URL}/center/newpet`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(nuevaMascota)
            });

            if (!response.ok) {
                throw new Error('Error al dar de alta la mascota');
            }

            // Redirigir a la lista de mascotas después de dar de alta con éxito
            navigate('/list');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Dar de Alta Nueva Mascota</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
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
                    <select value={temperamento} onChange={(e) => setTemperamento(e.target.value)}>
                        <option value="energetic">Energico</option>
                        <option value="calm">tranquilo</option>
                        <option value="playful">playful</option>
                        <option value="shy">shy</option>
                    </select>
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

export default AltaMascota;
