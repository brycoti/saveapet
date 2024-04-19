import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexte from "../components/contexte";


const Inicio = () => {
    const [animales, setAnimales] = useState([]);
    const [error, setError] = useState('');
    const [actualitza, setActualitza] = useState(0);
    const { logout, API_URL,loguejat } = useContext(Contexte);
    const redirect = useNavigate();


    useEffect(() => {
        const opcions = {
            credentials: 'include',
        };

        fetch(`${API_URL}/centers/${loguejat.userId}/animals`, opcions) // Modifica la ruta según la API
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
        <div className="p-2 h-1/10 bg-emerald-700 ">
          <h1 className="ml-2 text-center font-sans font-bold text-white text-3xl tracking-[-.10em]">
            <span className="text-4xl text-black">:</span>
            Inicio
          </h1>
          <h1 className="text-right text-white">Filtros</h1>
        </div>
    {
    animales.map((animal,index) =>(
        <p>{animal.name}</p>
    
    ))
    }
        <div className="flex relative grow border">
          <div className="h-5/6 rounded-lg w-full mt-4 mx-2 p-4 border bg-gray-100">
            <img
              src="https://img.freepik.com/foto-gratis/perro-pug-aislado-fondo-blanco_2829-11416.jpg"
              className="p-3"
              alt="imagen"
            />
            <h1 className="font-extrabold text-xl ml-3">Toby, 2</h1>
            
          </div>
          

          {/* <div className="bg-contain bg-no-repeat bg-center h-screen w-full" style={{ backgroundImage: "url('../../public/perro.png')" }}></div> */}
        </div>
        <hr className="mt-34" />
        <div className="flex justify-around bg-gray-50 h-15 p-2">
          <a href="/">
            <img
              src="https://www.freeiconspng.com/thumbs/dog-icon/dog-icon-4.png"
              alt="Centros"
              width="30"
              height="30"
            />
          </a>
          <a href=".../">
            <img
              src="https://www.pngall.com/wp-content/uploads/4/House-Transparent.png"
              alt="Centros"
              width="30"
              height="30"
            />
          </a>{" "}
          <a href="/profile">
            <img
              src="https://cdn-icons-png.flaticon.com/512/711/711769.png"
              alt="Perfil"
              width="30"
              height="30"
            />
          </a>
        </div>
      </div>
    </>
  );
};
export default Inicio;
