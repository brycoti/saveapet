import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import contexte from "../components/contexte";

const Inicio = () => {
    const { loguejat } = useContext(contexte);
    const redirect = useNavigate();

    const clickProfile = () => {
        if (loguejat) redirect('/profile')
        else redirect('login')
    }

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

                <article className="flex relative grow border items-center">
                    <div className="h-5/6 rounded-lg w-full mt-4 mx-2 p-4 border bg-gray-100">
                        <img
                            src="https://img.freepik.com/foto-gratis/perro-pug-aislado-fondo-blanco_2829-11416.jpg"
                            className="p-3"
                            alt="imagen"
                        />
                        <h1 className="font-extrabold text-xl ml-3">Toby, 2</h1>

                    </div>


                    {/* <div className="bg-contain bg-no-repeat bg-center h-screen w-full" style={{ backgroundImage: "url('../../public/perro.png')" }}></div> */}
                </article>
                <hr className="mt-34" />
                <div className="flex justify-around bg-gray-50 h-15 p-2">
                    <Link href="/">
                        <img
                            src="https://www.freeiconspng.com/thumbs/dog-icon/dog-icon-4.png"
                            alt="Centros"
                            width="30"
                            height="30"
                        />
                    </Link>
                    <a href=".../">
                        <img
                            src="https://www.pngall.com/wp-content/uploads/4/House-Transparent.png"
                            alt="Centros"
                            width="30"
                            height="30"
                        />
                    </a>{" "}
                    <a onClick={clickProfile}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/711/711769.png"
                            alt="Perfil"
                            width="30"
                            height="30"
                        />
                    </a>
                </div>
            </div >
        </>
    );
};
export default Inicio;
