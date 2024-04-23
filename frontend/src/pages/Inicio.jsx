import { useCallback, useContext, useEffect, useState } from 'react';
import perro from '../../public/perro.png'
import Contexte from "../components/contexte";
import { Link } from 'react-router-dom';


const Inicio = () => {
    const { loguejat, logout } = useContext(Contexte);
    const [mov, setMov] = useState({
        deg: 0,
        deltaX: 0
    });
    const [isAnimating, setIsAnimating] = useState(false);
    // const [deltaX, setDeltaX] = useState(0);


    const drag = useCallback((event) => {
        if (isAnimating) return
        let buffer
        const decisionTreshold = 180;

        const actualCard = event.target.closest('article')

        const startX = event.touches[0].pageX;

        document.addEventListener('touchmove', onMove, { passive: true })
        document.addEventListener('touchend', onEnd, { passive: true })

        function onMove(event) {
            const currentX = event.pageX ?? event.touches[0].pageX;
            buffer = {
                deg: (currentX - startX) / 20,
                deltaX: (currentX - startX)
            }
            setMov(buffer);


        }

        function onEnd() {

            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onEnd);
            setMov({
                deg: 0,
                deltaX: 0
            })
            console.log(buffer)
            const decisionMade = Math.abs(buffer.deltaX) >= decisionTreshold

            if (decisionMade) {

                console.log("decisión tomada")
            } else {
                console.log("indeciso")
            }
        }
    }, [isAnimating])



    useEffect(() => {

        document.addEventListener('touchstart', drag)
        return () => document.removeEventListener('touchstart', drag);

    }, [drag]);

    //translate-x-1

    return (

        <>
            <div className="flex flex-col box-border h-screen justify-between overflow-hidden">
                <div className="flex justify-between p-3 h-1/10">
                    <div>nombre</div>
                    <div>{loguejat?.name ? <button className="border px-4 py-2 bg-blue-200 hover:bg-blue-300 text-black rounded-full" onClick={logout}>Logout {loguejat.name}</button> : <Link to="/login">Login</Link>}</div>
                    <div>filtros</div>
                </div>
                <div>
                    <article style={{ transform: `translateX(${mov.deltaX}px) rotate(${mov.deg}deg)` }} className="flex relative grow">
                        {/* <div className="border border-black absolute"><button>left</button></div> */}
                        <div className="flex justify-center items-center h-full w-full"><img src={perro} alt="imagen" /></div>
                        {/* <div className="bg-contain bg-no-repeat bg-center h-screen w-full" style={{ backgroundImage: "url('../../public/perro.png')" }}></div> */}
                        {/* <div className="border border-black absolute"><button>right</button></div> */}
                        {/* Limitar la imagen a 1400 de width porque sinó ocupa más de una pàgina en pantallas grandes */}
                    </article>
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