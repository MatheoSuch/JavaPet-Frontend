import React from "react";
import "../Testimonios/Testimonios.css";
import testimonio1 from "../../assets/testimonio1.jpg";
import testimonio2 from "../../assets/testimonio2.jpg";
import testimonio3 from "../../assets/testimonio3.jpg";

export const Testimonios = () => {
    return (
        <div className="testimonios-container d-flex flex-column justify-content-center align-items-center">
            <h2 className="testimonios-title">Clientes Satisfechos</h2>
            <div className="row">
                <div className="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center img-container">
                    <img src={testimonio1} alt="Maria" className="img-circle" />
                    <h2>Mario</h2>
                    <p>"Excelente Atención, el profesionalismo de los Veterinarios me lleno de seguridad y confianza, para la operación de mi gatito."</p>
                </div>

                <div className="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center img-container">
                    <img src={testimonio2} alt="Lucas" className="img-circle" />
                    <h2>Lucia</h2>
                    <p>"Llegamos con una urgencia con mi caniche y me brindaron todo el apoyo necesario para salir adelante y tener en casa en pocos dias a mi perrito."</p>
                </div>

                <div className="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center img-container">
                    <img src={testimonio3} alt="Magdalena" className="img-circle" />
                    <h2>Magdalena</h2>
                    <p>"La consulta clínica reveló un problema importante en mi gatito, me encuentro muy satisfecha con su atención."</p>
                </div>
            </div>
        </div>
    );
};
