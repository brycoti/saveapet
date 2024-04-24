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

    return (
        <>
            <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Likes del animal</h2>
            <div className="grid grid-cols-1 gap-4">
                {likes.map((like, index) => (
                    <div key={index} className="border border-gray-300 rounded-md p-4 flex flex-col">
                        <p className="text-lg font-semibold mb-2">Usuario: {like.name}</p>
                        <p className="text-sm mb-1">Email: {like.email}</p>
                        <p className="text-sm mb-1">Dirección: {like.address}</p>
                        <p className="text-sm mb-1">telefono: {like.phonenumber}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Likes;
