const Inicio = () => {


    return (

        <>
            <div className="flex flex-col box-border h-screen justify-between">
                <div className="flex justify-between p-3 h-1/10">
                    <div>save a pet</div>
                    <div>inicio/logout</div>
                    <div>filtros</div>
                </div>
                <div className="flex relative grow">
                    <div className="border border-black absolute"><button>left</button></div>
                    <div className="flex justify-center items-center h-full w-full"><img src="https://img.freepik.com/foto-gratis/perro-pug-aislado-fondo-blanco_2829-11416.jpg" alt="imagen" /></div>
                    {/* <div className="bg-contain bg-no-repeat bg-center h-screen w-full" style={{ backgroundImage: "url('../../public/perro.png')" }}></div> */}
                    <div className="border border-black absolute"><button>right</button></div>
                </div>
                <div className="flex justify-between p-3 h-1/10">
                    <div>opciones</div>
                    <div>perfil</div>
                    <div>likes</div>
                    <div>link center</div>
                </div>
            </div >
        </>
    )

}
export default Inicio;