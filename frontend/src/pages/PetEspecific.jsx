import { useEffect, useState, useContext } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import contexte from "../components/contexte";
import { getOnePet } from "../components/generic";


const PetEspecific = () => {
    const { id } = useParams()
    const { loguejat } = useContext(contexte);
    const [pet, setPet] = useState({})
    const redirect = useNavigate();

    useEffect(() => {

        if (!loguejat) redirect('/login')

    }, [loguejat, redirect])

    useEffect(() => {

        getOnePet(id)
            .then((data) => {
                console.log(data)
                setPet(data);
            })

    }, [id, setPet]);

    return (<>

        <div className="flex flex-col h-screen w-full justify-between">
            <div className="text-white flex justify-between items-baseline bg-emerald-700 p-2 px-4 h-1/10  w-full ">

                <div className="pr-2 text-white">
                    Favoritos
                </div>

                <h1 className="ml-2 text-center font-sans font-bold text-white text-3xl tracking-[-.10em]">
                    <span className="text-4xl text-black">:</span>
                    {pet.name}
                </h1>
                <div className="text-emerald-700"> Favoritos</div>
            </div>

            <div className="px-6">
                <img className='rounded-xl' src={`http://localhost:3000/uploads/${pet.foto}`} alt="foto perro" />
                <div className="px-2 py-4 bg-white">
                    <p className="font-bold text-xl mb-2">{pet.name}, {pet.age}</p>
                    <p className="font-semibold text-xl mb-2">{pet.breed}</p>
                </div>
            </div>
            <div className="px-8 text-l">
                <span className="text-xl font-semibold">Comportamiento:</span>
                {pet.kids_friendly ? <div>- Amigable con los niños</div> : <div>- No recomendado si tiene niños</div>}
                {pet.dogs_friendly ? <div>- Amigable con otros perros</div> : <div>- No recomendado si tiene más perros</div>}
                <div>-  Temperamento: {pet.temper}</div>
            </div>
            <div className="px-8 ">La necesidad de adopción es: {pet.urgency}</div>
            <div className="flex justify-around bg-gray-50 h-17 p-2 content-end">
                <Link to="/">
                    <img
                        src="https://www.freeiconspng.com/thumbs/dog-icon/dog-icon-4.png"
                        alt="Centros"
                        width="30"
                        height="30"
                    />
                </Link>
                <Link to="/">
                    <img
                        src="https://www.pngall.com/wp-content/uploads/4/House-Transparent.png"
                        alt="Centros"
                        width="30"
                        height="30"
                    />
                </Link>
                <Link to="/profile">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/711/711769.png"
                        alt="Perfil"
                        width="30"
                        height="30"
                    />
                </Link>
            </div>
        </div>

    </>)
}

export default PetEspecific