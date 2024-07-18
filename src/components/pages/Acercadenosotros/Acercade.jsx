import React from "react";
import avatarMatheo from "../../../assets/matheo.jpg";
import avatarJuan from "../../../assets/juanpablo.png";
import avatarPato from "../../../assets/pato.jpg";
import avatarMarcelo from "../../../assets/yo.jpg";
import acercaDeNosotros from "../../../assets/fondoRegistro2.jpg";
import "../Acercadenosotros/Acercade.css"

const AcercaDe = () => {
  return (
    <div>
      <div className="fotoprincipal">
      <img
        src={acercaDeNosotros}
        alt="imagen acercaDeNosotros"
        className="img-nosotros mx-auto d-block border rounded-circle"
        
      />
      </div>
      <div className="contenedortextos">
  
      <h1 className="container text-center mt-5 text-white">NUESTRO EQUIPO</h1>
      
      <section className="container mt-3 text-white text-center col-md-5 border rounded bg-dark">
        <h3 className="mt-3 mb-3 text-justify">
          Especialistas en codear, investigadores de los lugares más
          recónditos de Google, estos somos:
        </h3>
      </section>
      </div>
      <section className="container py-5">
        <div className="row d-flex justify-content-evenly">
          <div className="col-sm-12 col-md-6 col-lg-4 my-2">
            <div className="card">
                <div className="container my-1">
                <img src={avatarMatheo} className="card-img-top" alt="Avatar Matheo"/>     
                </div>              
                <div className="card-body text-center">
                    <h5 className="card-title fw-bold">Matheo Such</h5>
                    <p className="card-text text-dark">Estudiante de Programación</p>                    
                    <p className="card-text text-dark">matheosuch1@gmail.com</p>
                    <p className="card-text text-dark">https://github.com/MatheoSuch</p>
                </div>
            </div>         
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 my-2">
            <div className="card">
                <div className="container my-1">
                <img src={avatarJuan} className="card-img-top" alt="Avatar Juan"/>
                </div>            
                <div className="card-body text-center">
                    <h5 className="card-title fw-bold">Juan Pablo Gomez Maturana</h5>
                    <p className="card-text text-dark">Estudiante de Programación</p>                    
                    <p className="card-text text-dark">jgomezmaturana@gmail.com</p>
                    <p className="card-text text-dark">https://github.com/JPGomezMaturana</p>
                </div>
            </div>         
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 my-2">
            <div className="card">
                <div className="container my-1">
                <img src={avatarPato} className="card-img-top" alt="Avatar Pato"/>         
                </div>          
                <div className="card-body text-center">
                    <h5 className="card-title fw-bold">Patricia Figueroa</h5>
                    <p className="card-text text-dark">Estudiante de Programación</p>                    
                    <p className="card-text text-dark">cpfigueroa1@gmail.com</p>
                    <p className="card-text text-dark">https://github.com/cpfigueroa</p>
                </div>
            </div>         
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 my-2">
            <div className="card">
                <div className="container my-1">
                <img src={avatarMarcelo} className="card-img-top" alt="Avatar Marcelo"/>  
                </div>                 
                <div className="card-body text-center">
                    <h5 className="card-title fw-bold">Marcelo de Cristobal</h5>
                    <p className="card-text text-dark">Estudiante de Programación</p>                    
                    <p className="card-text text-dark">marcelodecristobal87@gmail.com</p>
                    <p className="card-text text-dark">https://github.com/MarcedeCris</p>
                </div>
            </div>         
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcercaDe;