import { useContext } from "react";
import contexte from "../components/contexte";


const Profile = () => {
  const { loguejat } = useContext(contexte);
  const { setLoguejat } = useContext(contexte);

  const logout = () => {
    // Clear the authentication token cookie
    document.cookie = "token=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;";
    window.location.href = "/login"; // Redirect to the login page
    
  };

  return (
    <div>
      <div className="overflow flex flex-wrap items-center justify-center">
        <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
          <div className="h-48 overflow-hidden bg-emerald-700 flex justify-between">

          <h1 className="p-3 ml-2 font-sans text-white font-bold text-3xl tracking-[-.10em]"><span className="text-4xl text-black">:</span>
          Perfil
        </h1>            
        
        <a onClick={logout} className="text-sm mt-2 mr-2 text-white p-3">
              Cerrar sesión
            </a>
          </div>

          <div className="flex justify-center px-5  -mt-28">
            <img
              className="h-40 w-40 bg-white p-1 rounded-full"
              src="https://i.pinimg.com/236x/00/60/f8/0060f80e1526bbaa26f4c1628cc53c17.jpg"
              alt=""
            />
          </div>
          <div className=" ">
            <div className="text-center px-14">
              <h2 className="text-gray-800 text-3xl font-bold">
                {loguejat?.name}
              </h2>
              <p className="text-gray-400 mt-2"></p>
<hr />
              <p className="p-3 text-gray-800 text-xl font-extrabold">
                Favoritos
              </p>
              <div className="overflow-auto">
                <div className="flex w-44 p-2">
                  {/*hacer aqui un map de liked dogs del usuario*/}
                  <img
                    src="https://img.freepik.com/foto-gratis/vertical-adorable-perro-raza-mixta-sobre-azul_181624-45053.jpg"
                  />
                  <img
                    src="https://previews.123rf.com/images/mirawonderland/mirawonderland1606/mirawonderland160600030/59794518-retrato-vertical-de-un-perro-pastor-de-shetland-bonita-en-un-fondo-blanco-frente-a-la-c%C3%A1mara.jpg"
                  /><img
                  src="https://previews.123rf.com/images/mirawonderland/mirawonderland1606/mirawonderland160600030/59794518-retrato-vertical-de-un-perro-pastor-de-shetland-bonita-en-un-fondo-blanco-frente-a-la-c%C3%A1mara.jpg"
                /><img
                src="https://previews.123rf.com/images/mirawonderland/mirawonderland1606/mirawonderland160600030/59794518-retrato-vertical-de-un-perro-pastor-de-shetland-bonita-en-un-fondo-blanco-frente-a-la-c%C3%A1mara.jpg"
              />
                </div>
              </div>
            </div>

            <hr className="mt-7" />
            <div className="flex justify-around bg-gray-50 h-17 p-2 content-end">
              <a href="/">
                <img
                  src="https://www.freeiconspng.com/thumbs/dog-icon/dog-icon-4.png"
                  alt="Centros"
                  width="30"
                  height="30"
                />
              </a>
              <a href="/">
                <img
                  src="https://www.pngall.com/wp-content/uploads/4/House-Transparent.png"
                  alt="Centros"
                  width="30"
                  height="30"
                />
              </a>
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
