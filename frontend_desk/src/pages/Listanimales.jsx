import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexte from "../components/contexte";

const ListaAnimales = () => {
    const [animales, setAnimales] = useState([]);
    const [error, setError] = useState('');
    const [actualitza, setActualitza] = useState(0);
    const { logout, API_URL,loguejat } = useContext(Contexte);
    const redirect = useNavigate();

  

    
    useEffect(() => {
        const opcions = {
            credentials: 'include',
        };

        fetch(`${API_URL}/centers/${loguejat.userId}/animals`, opcions) // Modifica la ruta según la API
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
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
                setError(error)
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
        fetch(API_URL + '/pets/' + item.id, opcions)
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
            <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Tus animales</h2>
            <div className=" text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {animales.slice().reverse().map((animal, index) => (
                    <div key={index} className="border border-white rounded-md p-4 flex flex-col">
                        <h3 className=" text-lg font-semibold mb-2">{animal.name}</h3>
                        <p className="text-sm font-semibold mb-2">{animal.age} years</p>
                        <img src={`http://localhost:3000/uploads/${animal.foto}`} alt={animal.breed} className="mb-2"/>
                    
                        <button className="border rounded-md p-2 bg-blue-300 text-white mt-auto" onClick={() => redirect(`/modificar/${animal.id}`)}>Modificar a {animal.name}</button>
                        <button className="mt-2 p-2 rounded-md bg-pink-500 text-white" onClick={() => redirect(`likes/${animal.id}`)}>likes</button>
                    </div>
                ))}
                <button className="col-span-1 sm:col-span-2 lg:col-span-3 border p-3 bg-green-400" onClick={() => redirect(`/alta`)}>Subir nuevo animal</button>
            </div>
        </>
    );
      
};

export default ListaAnimales;
