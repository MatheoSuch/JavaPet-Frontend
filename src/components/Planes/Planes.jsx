import React from "react";
import "../Planes/Planes.css"; // Asegúrate de importar tu archivo CSS
import perrito1 from "../../assets/perrito1.jpg";
import perrito2 from "../../assets/perrito2.jpg";
import perrito3 from "../../assets/gatito.jpg";
// import {Link} from "react-router-dom";    

export const Planes = () => {
    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-10 col-md-10 planes-container">
            <h2 className="titulo-planes">Nuestros planes de salud</h2>
            {/* Primer div */}
            <div className="plan">
              <div className="plan-image">
                <img src={perrito1} alt="Imagen 1" />
              </div>
              <div className="plan-description">
                <a href="https://mail.google.com" target="_blank">
                  <p>Plan: primeros pasos: servicios para mascotas de 0 a 5 años</p>
                </a>
              </div>
            </div>
      
            {/* Segundo div */}
            <div className="plan" id="divReverse">
              <div className="plan-description">
                <a href="https://mail.google.com" target="_blank">
                  <p>Madurando: servicios para mascotas de 5 a 10 años</p>
                </a>
              </div>
              <div className="plan-image">
                <img src={perrito2} alt="Imagen 2" />
              </div>
            </div>
      
            {/* Tercer div */}
            <div className="plan">
              <div className="plan-image">
                <img src={perrito3} alt="Imagen 3" />
              </div>
              <div className="plan-description">
                <a href="https://mail.google.com" target="_blank">
                  <p>Adultos: servicios para mascotas de más de 10 años.</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );
};
