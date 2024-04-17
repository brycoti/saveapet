import { useContext } from "react";
import contexte from "../components/contexte";

const Profile = () => {
  const { loguejat } = useContext(contexte);


  return (
    <div>
      <div className="overflow flex flex-wrap items-center justify-center">
        <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
          <div className=" h-32 overflow-hidden">
            <img
              className="w-full"
              src="https://img.freepik.com/free-photo/grunge-black-concrete-textured-background_53876-124541.jpg"
              alt=""
            />
          </div>
          <div className="flex justify-center px-5  -mt-12">
            <img
              className="h-32 w-32 bg-white p-2 rounded-full"
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
              <p className="mt-2 text-gray-500 text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy
                text ever since the 1500s,
              </p>

              <p className="mt-5 mb-1 text-gray-800 font-extrabold">Favourite dogs</p>
              <div className="overflow-auto">
                <div className="flex">
                  <img className="w-20 h-auto mr-2" src="https://img.freepik.com/foto-gratis/vertical-adorable-perro-raza-mixta-sobre-azul_181624-45053.jpg" />
                  <img className="w-20 h-auto mr-2" src="https://previews.123rf.com/images/mirawonderland/mirawonderland1606/mirawonderland160600030/59794518-retrato-vertical-de-un-perro-pastor-de-shetland-bonita-en-un-fondo-blanco-frente-a-la-c%C3%A1mara.jpg" />
                  <img className="w-20 h-auto mr-2" src="https://st4.depositphotos.com/27201292/41849/i/450/depositphotos_418498294-stock-photo-vertical-shot-white-dog-forest.jpg" />
                  <img className="w-20 h-auto mr-2" src="https://st4.depositphotos.com/27201292/41849/i/450/depositphotos_418498294-stock-photo-vertical-shot-white-dog-forest.jpg" />
                  <img className="w-20 h-auto mr-2" src="https://st4.depositphotos.com/27201292/41849/i/450/depositphotos_418498294-stock-photo-vertical-shot-white-dog-forest.jpg" />
                  <img className="w-20 h-auto mr-2" src="https://st4.depositphotos.com/27201292/41849/i/450/depositphotos_418498294-stock-photo-vertical-shot-white-dog-forest.jpg" />

                </div>
              </div>
            </div>
            <hr className="mt-6" />
            <div className="flex bg-gray-50">
              <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                <a href="/">Al inicio</a>
              </div>
              <div className="border"></div>
              <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                <a href="/cuestionario">Cuestionario</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
