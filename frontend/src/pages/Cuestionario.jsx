const Cuestionario = () => {
  return (
    <div className="p-2">
      <p className="font-bold">
        Necesitamos que respondas unas preguntas para conocerte mejor.
      </p>
      <br />
      <form>
        <label htmlFor="">
          ¿En qué tipo de vivienda resides habitualmente?
        </label>
        <br />
        <select name="preg1" id="preg1" className="bg-gray-100">
          <option value="piso">En un piso</option>
          <option value="casa">En una casa</option>
          <option value="otro">Otro tipo de vivienda</option>
        </select>

        <br />
        <br />

        <label htmlFor="">¿Tienes animales en casa?</label>
        <br />
        <select name="preg3" id="preg3" className="bg-gray-100">
          <option value="1">Sí, 1</option>
          <option value="2">Sí, 2</option>
          <option value="3">Sí, 3</option>
          <option value="mas">Tengo más de 3 mascotas</option>
          <option value="no">No tengo mascota</option>
        </select>
        <br />
        <br />
        <label htmlFor="">
          ¿Qué edad preferiría que tuviera el perro que va a adoptar?
        </label>
        <br />
        <select name="preg4" id="preg4" className="bg-gray-100">
          <option value="cachorro">Cachorro (1 año)</option>
          <option value="joven">Adulto joven (1-5 años)</option>
          <option value="mayor">Adulto mayor (5+ años)</option>
        </select>
        <br />
        <br />
        <label htmlFor="">¿Tienes niños en casa?</label>
        <br />
        <select name="preg5" id="preg5" className="bg-gray-100">
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>

        <br />
        <br />

        <label htmlFor="">
          ¿Estaría dispuesto a adoptar un animal con leishmania, leucemia u
          otras enfermedades?
        </label>
        <br />
        <select name="preg2" id="preg2" className="bg-gray-100">
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </form>

      <br />
      <br />
      <a
        href="/profile"
        className="bg-gray-600 hover:bg-gray-900 text-white p-2 text-center rounded-lg"
      >
        Back
      </a>
    </div>
  );
};

export default Cuestionario;
