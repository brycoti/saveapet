import { useCallback, useContext, useEffect, useState, useRef } from 'react';
import contexte from "../components/contexte";
import { Link, useNavigate } from 'react-router-dom';
import { createReaction } from '../components/generic';
import corazon from '../../public/like.png';
import cruz from '../../public/nop.png';

const Inicio = () => {
    const { loguejat, logout } = useContext(contexte);
    const redirect = useNavigate();
    const myRef = useRef();
    const [animales, setAnimales] = useState([]);
    const [error, setError] = useState(null);


    const [mov, setMov] = useState({
        deg: 0,
        deltaX: 0,
        transition: 'none'
    });
    const [isAnimating, setIsAnimating] = useState(false);


    const like = async () => {
        setIsAnimating(false);

        const information = {
            liked: true,
            watched: true,
            petId: animales[0].id
        }
        if (loguejat) {
            const data = await createReaction(information);
        } else {
            redirect('/login')
        }

        while (isAnimating == true) {
            myRef.current.addEventListener('transitionend', () => {
                setIsAnimating(false)
            })
        }

        const arrayAuxiliar = animales.slice(1);

        setAnimales(arrayAuxiliar);

        setMov({
            deg: 0,
            deltaX: 0,
            // transition: 'none'
        })
    }

    const disLike = async () => {
        setIsAnimating(false);
        const information = {
            liked: false,
            watched: true,
            petId: animales[0].id
        }
        if (loguejat) {
            const data = await createReaction(information);
        } else {
            redirect('/login')
        }
        while (isAnimating == true) {
            myRef.current.addEventListener('transitionend', () => {
                setIsAnimating(false)

            })
        }

        const arrayAuxiliar = animales.slice(1);

        setAnimales(arrayAuxiliar);

        setMov({
            deg: 0,
            deltaX: 0,
            transition: 'none'
        })
    }

    const slideRight = () => {

        setMov({ deg: 600 / 14, deltaX: 600, transition: 'transform .3s ease' })
        if (!isAnimating) like();

    }

    const slideLeft = () => {

        setMov({ deg: -600 / 14, deltaX: -600, transition: 'transform .3s ease' })
        disLike();
    }



    const drag = useCallback((event) => {

        if (isAnimating) return
        let buffer
        const decisionTreshold = 160;

        const startX = event.touches[0].pageX;

        document.addEventListener('touchmove', onMove, { passive: true })
        document.addEventListener('touchend', onEnd, { passive: true })

        function onMove(event) {
            const currentX = event.pageX ?? event.touches[0].pageX;
            buffer = {
                deg: (currentX - startX) / 20,
                deltaX: (currentX - startX),
                transition: 'none'
            }
            setMov(buffer);


        }

        function onEnd() {

            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onEnd);


            const decisionMade = Math.abs(buffer.deltaX) >= decisionTreshold
            setIsAnimating(true)
            if (decisionMade) {
                const goRight = buffer.deltaX > 0
                if (goRight) {
                    slideRight();
                } else {
                    slideLeft();
                }
            } else {
                setMov({
                    deg: 0,
                    deltaX: 0,
                    transition: 'transform .3s easy'
                })
                setIsAnimating(false);
            }
        }
    }, [isAnimating, slideLeft, slideRight])

    useEffect(() => {
        const opcions = {
            credentials: "include",
        };

        fetch("http://localhost:3000/api/pets", opcions)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
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
    }, [error, logout]);

    useEffect(() => {
        const node = myRef.current;
        node.addEventListener('touchstart', drag);
        return () => {
            node.removeEventListener('touchstart', drag);
        };
    }, [drag, myRef]);

    const clickProfile = () => {
        if (loguejat) redirect('/profile')
        else redirect('login')
    }

    return (
        <>
            <div className="flex flex-col box-border h-screen justify-between overflow-hidden relative items-center">
                <div className="text-white flex justify-between items-baseline p-2 h-1/10 bg-emerald-700 w-full ">
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

                <article ref={myRef} style={{ transform: `translateX(${mov.deltaX}px) rotate(${mov.deg}deg)`, transition: `${mov.transition}` }} className="flex flex-wrap justify-between p-4 absolute z-10 bottom-1/3">
                    {animales.length > 0 && (
                        <div key={animales[0]?.id} className="w-full p-4 flex justify-center items-center">
                            <div className="max-w-3xl w-full rounded-lg overflow-hidden shadow-lg">
                                <img

                                    src={`http://localhost:3000/uploads/${animales[0]?.foto}`}
                                    className="w-80 min-h-64 max-h-64"
                                    alt="imagen"
                                />
                                <div className="px-6 py-4 bg-white">
                                    <div className="font-bold text-xl mb-2">{animales[0]?.name}, {animales[0]?.age}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </article>
                <article className="flex flex-wrap justify-between p-4 absolute z-0 bottom-1/3">
                    {animales.length > 0 && (
                        <div key={animales[1]?.id} className="w-full p-4 flex justify-center items-center ">
                            <div className="max-w-3xl w-full rounded-lg overflow-hidden shadow-lg">
                                <img

                                    src={`http://localhost:3000/uploads/${animales[1]?.foto}`}
                                    className="w-80 min-h-64 max-h-64"
                                    alt="imagen"
                                />
                                <div className="px-6 py-4 bg-white">
                                    <div className="font-bold text-xl mb-2">{animales[1]?.name}, {animales[1]?.age}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </article>

                {animales.length > 0 ?
                    (<div className="flex justify-around bg-gray-50 h-15 p-2 w-full absolute top-3/4">
                        <button className='p2' onClick={slideLeft}><img src={cruz} alt="corazon" width='50px' height='50px' /></button>

                        <button className='p2' onClick={slideRight}><img src={corazon} alt="corazon" width='40px' height='40px' /></button>

                    </div>
                    ) : <div><p>Has visto todos los animales</p> <p>disponibles en la base de datos</p></div>}
                <div className="flex justify-around bg-gray-50 h-15 p-2 w-full">
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
