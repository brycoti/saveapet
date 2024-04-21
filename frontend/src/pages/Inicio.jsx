import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import contexte from "../components/contexte";

const Inicio = () => {
    const { loguejat } = useContext(contexte);
    const [animales, setAnimales] = useState([]);
    const [error, setError] = useState(null);
    const [actualitza, setActualitza] = useState(false);

    useEffect(() => {
        const opcions = {
            credentials: 'include',
        };

        fetch('http://localhost:3000/api/pets', opcions) // Modifica la ruta según la API
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
                console.error('Error fetching data:', error);
                setError(error)
            });

    }, [actualitza]);

    return (
        <>
            <div className="flex flex-col box-border h-screen justify-between">
                <div className="text-white flex justify-between items-baseline p-2 h-1/10 bg-emerald-700 ">
                    {!loguejat ? <div className="pr-2"><Link to='/login'>login</Link></div> : <div className="pr-2 text-emerald-700">login</div>}
                    <h1 className="ml-2 text-center font-sans font-bold text-white text-3xl tracking-[-.10em]">
                        <span className="text-4xl text-black">:</span>
                        Inicio
                    </h1>
                    <h1 className="text-right"> Filtros</h1>
                </div>

                <div className="flex flex-wrap justify-between p-4">
                    {animales.map(animal => (
                        <div key={animal.id} className="w-1/2 p-4">
                            <div className="h-5/6 rounded-lg w-full mt-4 mx-2 p-4 border bg-gray-100">
                                <img
                                    src={animal.image_url}
                                    className="p-3"
                                    alt="imagen"
                                />
                                <h1 className="font-extrabold text-xl ml-3">{animal.name}, {animal.age}</h1>
                            </div>
                        </div>
                    ))}
                </div>

                <hr className="mt-34" />
                <div className="flex justify-around bg-gray-50 h-15 p-2">
                    <Link to="/">
                        <img
                            src="https://www.freeiconspng.com/thumbs/dog-icon/dog-icon-4.png"
                            alt="Inicio"
                            width="30"
                            height="30"
                        />
                    </Link>
                    <a to="/">
                        <img
                            src="https://www.pngall.com/wp-content/uploads/4/House-Transparent.png"
                            alt="Centros"
                            width="30"
                            height="30"
                        />
                    </a>{" "}
                    <Link to="/profile">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/711/711769.png"
                            alt="Perfil"
                            width="30"
                            height="30"
                        />
                    </Link>
                </div>
            </div >
        </>
    );
};
export default Inicio;
