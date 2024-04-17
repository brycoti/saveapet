import { useContext } from 'react';
import perro from '../../public/perro.png'
import Contexte from "../components/contexte";
import { Link } from 'react-router-dom';


const Inicio = () => {
    const { loguejat, logout } = useContext(Contexte);

    return (

        <>
            <div className="flex flex-col box-border h-screen justify-between">
                <div className="flex justify-between p-3 h-1/10">
                    <div>nombre</div>
                    <div>{loguejat?.name ? <button className="border px-4 py-2 bg-blue-200 hover:bg-blue-300 text-black rounded-full" onClick={logout}>Logout {loguejat.name}</button> : <Link to="/login">Login</Link>}</div>
                    <div>filtros</div>
                </div>
                <div className="flex relative grow">
                    <div className="border border-black absolute"><button>left</button></div>
                    <div className="flex justify-center items-center h-full w-full"><img src={perro} alt="imagen" /></div>
                    {/* <div className="bg-contain bg-no-repeat bg-center h-screen w-full" style={{ backgroundImage: "url('../../public/perro.png')" }}></div> */}
                    <div className="border border-black absolute"><button>right</button></div>
                    {/* Limitar la imagen a 1400 de width porque sinó ocupa más de una pàgina en pantallas grandes */}
                </div>
                <div className="flex justify-between p-3 h-1/10">
                    <div><Link to="/profile">profile</Link></div>
                    <div>likes</div>
                    <div>link center</div>
                </div>
            </div >
        </>
    )

}
export default Inicio;