import Carousel from "../components/forms/Carousel";

export default function Inicio() {
    return (
        <>
       
            <div className="container mx-auto pb-2">
                <Carousel/>
            </div>
      
            <div className="container marketing">
                {/* Three columns of text below the carousel */}
                <div className="row">
                    <div className="col-lg-4 pt-5">
                        <img src="/dfsklogo.png" alt="Logo"  width={180} height={116} />
                        <h2 className="fw-normal">DFSK en Venezuela</h2>
                        <p>Descubre  una gama de vehículos diseñados para satisfacer todas tus necesidades, DFSK es la elección perfecta para tu próximo auto. </p>
                        <p><a className="btn btn-danger" target="_blank" rel="noopener noreferrer" href="https://www.dfskvenezuela.com/">Más Detalles.</a></p> 
                    </div>

                    <div className="col-lg-4  pt-5">
                        <img src="/Glory.svg" alt="Logo" className="rounded-circle" width={120} height={120} />
                        <h2 className="fw-normal">Línea Glory</h2>
                        <p>La línea Glory combina elegancia y tecnología avanzada. Nuestros odelos ofrecen confort y rendimiento excepcionales. </p>
                        <p><a className="btn btn-danger" target="_blank" rel="noopener noreferrer" href="https://www.dfskvenezuela.com/copia-de-l%C3%ADnea-glory">Ver Modelos.</a></p>
                    </div>

                    <div className="col-lg-4  pt-5">
                        <img src="/imagotipo.png" alt="Logo" width={110}  />
                        <h2 className="fw-normal">Concesionarios</h2>
                        <p/>
                        <p>Consulta a nuestros ejecutivos comerciales y descubre si eres elegible para obtener el financiamiento del DFSK que necesitas.</p>
             
                        <p><a className="btn btn-danger" target="_blank" rel="noopener noreferrer" href="https://www.dfskvenezuela.com/concesionarios">Concesionarios.</a></p>

                    </div>
                </div>

                {/* START THE FEATURETTES */}
                <hr className="featurette-divider" />
                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1">DFSK K02S</h2>
                        <p className="lead">La DFSK K02S es la camioneta ideal para tu negocio en Venezuela. Con capacidad para 5 pasajeros y hasta 880 kg de carga, combina versatilidad y eficiencia. Su diseño robusto y consumo de solo 6 litros por cada 100 km la convierten en la opción perfecta para maximizar tu productividad.</p>
                    </div>
                    <div className="col-md-5">
                        <img src="/Inicio1.jpg" alt="K02S" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" />
                    </div>
                </div>


                <hr className="featurette-divider" />
                <div className="row featurette">  
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading fw-normal lh-1">DFSK K07S</h2>
                        <p className="lead">La DFSK K07S es la minivan multipropósito que necesitas. Con espacio para 9 pasajeros y un motor eficiente, es perfecta para transporte y turismo. Sus puertas corredizas laterales y amplio espacio interior garantizan comodidad y practicidad en cada viaje.</p>
                    </div>

                    <div className="col-md-5 order-md-1  ">
                        <img src="/Inicio2.jpg" alt="K07s" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" />
                    </div>
                
                 
                </div>
                <hr className="featurette-divider" />
                <div className="row featurette">
                    <div className="col-md-7 ">
                        <h2 className="featurette-heading fw-normal lh-1">DFSK Glory 600</h2>
                        <p className="lead">La DFSK Glory 600 redefine la experiencia de conducción con su elegante diseño y tecnología avanzada. Este SUV versátil ofrece un rendimiento potente y un interior ergonómico, ideal para familias que buscan confort y estilo en cada trayecto.</p>
                    </div>
                    <div className="col-md-5">
                        <img src="/Inicio3.jpg" alt="Glory 600 Interior" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" />
                    </div>
                </div>


                {/* /END THE FEATURETTES */}
            </div>
         
        </>
    )
}