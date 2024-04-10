import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexte from "../components/contexte";

const ListaAnimales = () => {
    const [animales, setAnimales] = useState([]);
    const [error, setError] = useState('');
    const [actualitza, setActualitza] = useState(0);
    const { logout, API_URL } = useContext(Contexte);
    const redirect = useNavigate();

    useEffect(() => {
        const opcions = {
            credentials: 'include',
        };

        fetch(API_URL + '/animales', opcions) // Modifica la ruta según la API
            .then(resp => resp.json())
            .then(data => {
                if (data.error === "Unauthorized") {
                    logout();
                }
                else if (data.error) {
                    setError(data.error); // Corregir asignación de error
                } else {
                    setAnimales(data);
                }
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError('Error al obtener los datos');
            });

    }, [actualitza]);

    const remove = (item) => {
        const opcions = {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        };
        fetch(API_URL + '/projects/' + item.id, opcions)
            .then(r => r.json())
            .then(data => {
                if (data.error === 'Unauthorized') {
                    logout();
                } else {
                    setActualitza(prevState => prevState + 1);
                }
            })
            .catch(err => console.log(err));
    };

    if (error) {
        return <h1 className='text-red-500'>{error}</h1>;
    }

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Tus animales</h2>
            <div className="grid grid-cols-3 gap-4">
                {animales.map((animal, index) => (
                    <div key={index} className="border border-gray-300 rounded-md p-4">
                        <h3 className="text-lg font-semibold mb-2">{animal.name}</h3>
                        <p className="text-sm">{animal.age} years</p>
                        {/* Otros campos de información */}
                        <button className="border p-3 bg-red-200" onClick={()=>redirect(`/modificar/${animal.id}`)}>Modificar  a {animal.name}</button>
                        <button onClick={() => remove(animal)}>Eliminar</button>
                    </div>
                ))}
                 <button className="border p-3 bg-red-200" onClick={()=>redirect(`/alta`)}>Subir nuevo animal</button>

            </div>
        </>
    );
};

export default ListaAnimales;
