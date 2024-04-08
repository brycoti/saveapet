import { useState, useEffect } from "react";
const API_URL = 'http://localhost:3000/api';

const Profile = () => {

    const [usuario, setUsuario] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(API_URL + "/users") //checkear si esta es la ruta de la api
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            if (data.error) {
                setError(true);
            } else {
                setUsuario(data);
            }
        })
        .catch((error) => {
            console.log("Error al fetchear la data:", error);
            setError(true);
        })
    }, []);

    return (
        <div className="p-2">

        {<a href="/cuestionario" className="bg-blue-400 p-2 rounded-lg">Acceder al cuestionario</a>}
        <br /><br />
        {<a href="/inicio" className="bg-blue-400 p-2 rounded-lg">Ir al inicio</a>}
        
        </div>
    );
}
export default Profile;