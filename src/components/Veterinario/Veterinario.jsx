import React from "react";
import "../Veterinario/Veterinario.css";
import veterinario1 from "../../assets/veterinario1.png";
import veterinario2 from "../../assets/veterinario2.png";
import veterinario3 from "../../assets/veterinario3.png";

export const Veterinario = () => {
    return (
        <div className="veterinario-container d-flex flex-column justify-content-center align-items-center">
            <h2 className="veterinario-title">Nuestros Profesionales</h2>
            <div className="row">
                <div className="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center img-container">
                    <img src={veterinario1} alt="Alejo"  />
                    <h2>Alejo Sanchez</h2>
                    <p>"Traumatologo Veterinario"</p>
                </div>

                <div className="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center img-container">
                    <img src={veterinario2} alt="Camila" />
                    <h2>Camila Rodriguez</h2>
                    <p>"Peluquera Canina"</p>
                </div>

                <div className="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center img-container">
                    <img src={veterinario3} alt="Melissa" />
                    <h2>Melissa Lopez</h2>
                    <p>"Clínica Veterinaria"</p>
                </div>
            </div>
        </div>
    );
};


