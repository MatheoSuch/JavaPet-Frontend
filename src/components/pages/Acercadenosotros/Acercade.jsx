import React from "react";
import avatarMatheo from "../../../assets/matheo.jpg";
import avatarJuan from "../../../assets/juanpablo.png";
import avatarPato from "../../../assets/pato.jpg";
import avatarMarcelo from "../../../assets/yo.jpg";
import acercaDeNosotros from "../../../assets/fondoRegistro2.jpg";

const AcercaDe = () => {
  return (
    <div>
      <img
        src={acercaDeNosotros}
        alt="imagen acercaDeNosotros"
        width="100%"
        className="img-nosotros"
      />
      <h1 className="container text-center mt-5 font-celeste-crud">NUESTRO EQUIPO</h1>
      
      <section className="container mt-3">
        <h3 className="font-celeste-crud">
          Especialistas en crear contenidos, investigadores de los lugares mas
          recónditos de Google, rápidos hasta donde la calidad no se deteriora,
          eficaces en llevar a cabo un plan, tu plan y mas alla de todo eso tu
          equipo
        </h3>
      </section>
      <section className="container py-5">
        <div className="row d-flex justify-content-evenly">
          <div className="col-sm-12 col-md-6 col-lg-4 my-2">
            <div className="card">
                <div className="container my-1">
                <img src={avatarMatheo} className="card-img-top" alt="Avatar Matheo"/>     
                </div>              
                <div className="card-body text-center">
                    <h5 className="card-title fw-bold font-celeste-crud">Matheo Such</h5>
                    <p className="card-text">Estudiante de Programacion</p>                    
                    <p className="card-text">matheosuch1@gmail.com</p>
                </div>
            </div>         
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 my-2">
            <div className="card">
                <div className="container my-1">
                <img src={avatarJuan} className="card-img-top" alt="Avatar Juan"/>
                </div>            
                <div className="card-body text-center">
                    <h5 className="card-title fw-bold font-celeste-crud">Juan Pablo Gomez Maturana</h5>
                    <p className="card-text">Estudiante de Programacion</p>                    
                    <p className="card-text">jgomezmaturana@gmail.com</p>
                </div>
            </div>         
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 my-2">
            <div className="card">
                <div className="container my-1">
                <img src={avatarPato} className="card-img-top" alt="Avatar Pato"/>         
                </div>          
                <div className="card-body text-center">
                    <h5 className="card-title fw-bold font-celeste-crud">Patricia Figueroa</h5>
                    <p className="card-text">Estudiante de Programacion</p>                    
                    <p className="card-text">cpfigueroa1@gmail.com</p>
                </div>
            </div>         
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 my-2">
            <div className="card">
                <div className="container my-1">
                <img src={avatarMarcelo} className="card-img-top" alt="Avatar Marcelo"/>  
                </div>                 
                <div className="card-body text-center">
                    <h5 className="card-title fw-bold font-celeste-crud">Marcelo de Cristobal</h5>
                    <p className="card-text">Estudiante de Programacion</p>                    
                    <p className="card-text">marcelodecristobal87@gmail.com</p>
                </div>
            </div>         
          </div>
               
        </div>
      </section>
    </div>
  );
};

export default AcercaDe;
