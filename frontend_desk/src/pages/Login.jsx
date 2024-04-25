import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Contexte from "../components/contexte";

export default function Login() {
  const { setLoguejat, API_URL } = useContext(Contexte);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = useNavigate();

  const logueja = (e) => {
    e.preventDefault();
    const credencials = { email, password };
    const opcions = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credencials),
    };

    fetch(`${API_URL}/login/center`, opcions)
      .then((resp) => resp.json())
      .then((data) => {
        if (!data.error) {
          localStorage.setItem("token", data.cookie);
          setLoguejat(data);
          redirect("/perfil");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="gradient-form w-full h-screen">
      <div className="container h-full p-10">
        <div className="flex h-full flex-wrap items-center justify-center text-neutral-800">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <h1 className="font-sans text-white font-bold text-3xl tracking-[-.10em] mb-10">
                        <span className="text-4xl text-white">:</span>Perfil
                      </h1>
                    </div>

                    <form onSubmit={logueja}>
                      <div className="relative mb-4">
                        <input
                          onInput={(e) => setEmail(e.target.value)}
                          value={email}
                          type="text"
                          className="p-2 rounded-lg w-full font-mono border border-emerald-800 text-sm"
                          placeholder="Email"
                        />
                      </div>

                      <div className="relative mb-4">
                        <input
                          onInput={(e) => setPassword(e.target.value)}
                          value={password}
                          type="password"
                          className="p-2 rounded-lg w-full font-mono border border-emerald-800 text-sm"
                          placeholder="Password"
                        />
                      </div>

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <div
                          className="mb-3 inline-block w-1/2 rounded-full p-3 text-white font-bold bg-emerald-800 hover:bg-emerald-600"
                    
                        >
                          <button
                            type="submit"
                            
                          >
                            Iniciar sesión
                          </button>
                        </div>
                        <div>
                          <a href="/register">
                            ¿No tienes cuenta? 
                            <span className="font-bold hover:underline ml-1">Regístrate</span>
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none bg-emerald-800"
                  
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h1 className="font-sans mb-4 text-white font-bold text-4xl tracking-[-.10em] mt-[-1.5em]">
                      Save a pet<span className="text-6xl text-black">.</span>
                    </h1>
                    <h2 className="font-mono mt-3">
                      Save a pet es un proyecto social para que cualquier
                      persona que desee adoptar un animal pueda encontrar un
                      refugio.
                      <br />
                      <br />
                      ¡Únete a la red nacional de refugios y protectoras de
                      animales <span className="underline">
                        Save a Pet
                      </span>{" "}
                      para que miles de animales encuentren un lugar digno este
                      verano!
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
