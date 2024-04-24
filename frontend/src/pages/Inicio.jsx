import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import contexte from "../components/contexte";

const Inicio = () => {
    const { loguejat, logout } = useContext(contexte);
    const redirect = useNavigate();
    const [animales, setAnimales] = useState([]);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [actualitza, setActualitza] = useState(false);
    const [likedAnimales, setLikedAnimales] = useState([]);

    useEffect(() => {
        const opcions = {
            credentials: "include",
        };

        fetch("http://saveapet.westeurope.cloudapp.azure.com/api/pets", opcions)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                if (data.error) {
                    setError(data.error);
                } else {
                    setAnimales(data);
                }
            })
            .catch((err) => {
                console.error("Error fetching data:", error);
                setError(err);
            });
    }, [actualitza, error, logout]);

    const handleNext = () => {
        const currentAnimal = animales[currentIndex];

        // Verificar si el animal actual ya está marcado como "me gusta"
        if (!likedAnimales.some(animal => animal.id === currentAnimal.id)) {
            // Agregar el animal actual a la lista de animales marcados como "me gusta"
            setLikedAnimales(prevLikedAnimales => [...prevLikedAnimales, currentAnimal]);
        }

        setCurrentIndex(prevIndex => (prevIndex === animales.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? animales.length - 1 : prevIndex - 1));
    };

    const clickProfile = () => {
        if (loguejat) redirect('/profile')
        else redirect('login')
    }

    return (
        <>
            <div className="flex flex-col box-border h-screen justify-between">
                <div className="text-white flex justify-between items-baseline p-2 h-1/10 bg-emerald-700 ">
                    {!loguejat ? (
                        <div className="pr-2">
                            <Link to="/login">login</Link>
                        </div>
                    ) : (
                        <div className="pr-2 text-emerald-700">login</div>
                    )}
                    <h1 className="ml-2 text-center font-sans font-bold text-white text-3xl tracking-[-.10em]">
                        <span className="text-4xl text-black">:</span>
                        Inicio
                    </h1>
                    <h1 className="text-right"> Filtros</h1>
                </div>

                <div className="flex flex-wrap justify-between p-4">
                    {animales.length > 0 && (
                        <div key={animales[currentIndex].id} className="w-full p-4 flex justify-center items-center">
                            <div className="max-w-3xl w-full rounded-lg overflow-hidden shadow-lg">
                                <img
                                    src={`./img/${animales[currentIndex].foto}`}
                                    className="w-80"
                                    alt="imagen"
                                />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{animales[currentIndex].name}, {animales[currentIndex].age}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-around bg-gray-50 h-15 p-2">
                    <button onClick={handlePrev}>Anterior</button>
                    <button onClick={handleNext}>Siguiente</button>

                </div>

                <div className="flex justify-around bg-gray-50 h-15 p-2">
                    <Link to="/">
                        <img
                            src="https://www.freeiconspng.com/thumbs/dog-icon/dog-icon-4.png"
                            alt="Inicio"
                            width="30"
                            height="30"
                        />
                    </Link>
                    <a href="/">
                        <img
                            src="https://www.pngall.com/wp-content/uploads/4/House-Transparent.png"
                            alt="Centros"
                            width="30"
                            height="30"
                        />
                    </a>{" "}
                    <button onClick={clickProfile}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/711/711769.png"
                            alt="Perfil"
                            width="30"
                            height="30"
                        />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Inicio;
