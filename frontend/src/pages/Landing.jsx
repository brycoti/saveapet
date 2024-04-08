const Landing = () => {
  return (
    <>
      <div className="bg-gray-200 p-4 rounded-lg w-1/2 mx-auto mt-20">
        <h1>¡Bienvenido!</h1>
        <br />
          <a href="/login" className="bg-slate-700 text-white mr-3 p-2 rounded-lg">
            Usuario
          </a>
          <a href="/" className="bg-slate-700 text-white p-2 rounded-lg">
            Protectora
          </a>
      </div>
    </>
  );
};

export default Landing;
