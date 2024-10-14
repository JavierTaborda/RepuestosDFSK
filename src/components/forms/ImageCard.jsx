import "../../styles/ImageCard.css";
import ImgDefault from "./ImgDefault";
export default function ImageCard({ info, articulo, stock, img }) {

    return (
        <>  <section id="img-card1" className="img-card">      
            {img ? <img className="img-fluid" src={img} alt="imagen" /> : 
                <ImgDefault />}
                <div className="img-card__content  ">
                  
                    <p className="img-card__description ">
                        {articulo}
                        <br />
                        {info}
                    </p>
                    {stock < 1 && (
                        <button className="btn btn-primary ">Generar Pedido</button>
                    )}
                </div>
            </section>

        </>
    )
}

