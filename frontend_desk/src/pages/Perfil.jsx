import React from 'react';

import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const redirect = useNavigate();
  return (
    <div>
      <h1>Perfil</h1>
      {/* Otro contenido del perfil */}
      <button className="border p-3 bg-red-200" onClick={()=>redirect('/list')}>Tus animales</button>
        <br />
    </div>
  );
}

export default Perfil;
