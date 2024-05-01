
import React from 'react';



const Inicio = () => {
    
    return (
        <div className="background-white text-black font-bold w-full h-full flex flex-col   items-center">
            <h1 className='text-2xl text-center text-green-500 mb-10'>Unete a la red nacional de refugios y protectoras de animales Save a Pet para que miles de animales encuentren un lugar digno este verano!</h1>
            
            <div className="flex flex-col items-center mb-10">
                <img className='w-full' src="https://www.gifss.com/animales/perros/images/perro-animado-15.gif" alt="Animated dog" />
            </div>
            
            <h2 className='text-2xl text-center text-green-500'> Save a pet es un proyecto social para que cualquier persona que desee adoptar un animal pueda encontrar un refugio.</h2>
        </div>
    );
};

export default Inicio;

