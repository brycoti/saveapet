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
    const [urgencia, setUrgencia] = useState('not urgent');
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
                        <option value="calm">Tranquilo</option>
                        <option value="playful">Juguetón</option>
                        <option value="shy">Tímido</option>
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
                <div>
                    <label htmlFor="formfile" className="form-label">Imagen</label>
                    <input className="form-control" id="formfile" type="file" name="foto" onChange={(e) => setImatge(e.target.files[0])} />
                </div>
                <button type="submit">Dar de Alta</button>
            </form>
        </div>
    );
};



export default AltaMascota;
