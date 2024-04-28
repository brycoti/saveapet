import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Contexte from "../components/contexte";

const Likes = () => {
    const { id } = useParams(); // Obtener el ID del animal de los parámetros de la URL
    const [likes, setLikes] = useState([]);
    const [error, setError] = useState('');
    const { logout, API_URL } = useContext(Contexte);
    const redirect = useNavigate();

    useEffect(() => {

        fetch(`${API_URL}/center/petmatches/${id}`, { credentials: 'include' })
            .then(resp => resp.json())
            .then(data => {

                if (data.error === "Unauthorized") {
                    //logout();
                }
                else if (data.error) {
                    setError(data.error); // Corregir asignación de error
                } else {
                    setLikes(data);
                    console.log(likes)
                }
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError(error)
            });

    }, []);

    if (error) {
        return <h1 className='text-red-500'>{error}</h1>;
    }


    const handleAdopt = async (x) => {
        try {
            console.log('ID del usuario a adoptar:', x); // Agregar este console.log
            const response = await fetch(`${API_URL}/adopt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ userId: x, petId: id })
            });
            if (response.ok) {
                // Lógica para manejar la adopción exitosa
                console.log('Adoption successful');
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (error) {
            console.error('Error adopting pet:', error);
            setError(error.message);
        }
    };

    if (error) {
        return <h1 className='text-red-500'>{error}</h1>;
    }
    return (
        <>
            <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Likes del animal</h2>
            <div className="grid grid-cols-1 gap-4">
                {likes.map((like, index) => (
                    <div key={index} className="border border-gray-300 rounded-md p-4 flex flex-col text-white">
                        <p className="text-lg font-semibold mb-2">Usuario: {like.name}</p>
                        <p className="text-sm mb-1">Email: {like.email}</p>
                        <p className="text-sm mb-1">Dirección: {like.address}</p>
                        <p className="text-sm mb-1">telefono: {like.phonenumber}</p>
                        <button
                            onClick={() => handleAdopt(like.id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Asignar adopcion
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Likes;
