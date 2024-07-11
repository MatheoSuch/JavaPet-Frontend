import React from 'react';
import "../Error404/Error404.css";
import { Link } from 'react-router-dom';
import imgPerrito from "../../../assets/perritonuevo.jpg";

const Error404 = () => {
  return (
    <div className='error-page'>
      <div className='imagen-container'>
        <img src={imgPerrito} alt="Perrito" className="background-image" />
        <div className='contenedorTexto'>
          <div className='titulo'>
            <h1>¿Que hiciste esta vez, humano?</h1>
          </div>
          <div className='subtitulo'>
            <h3>Al parecer esta pagina no existe, te redireccionaremos en segundos a una pagina de inicio. No te preocupes! Si esta pagina no cambia, puede tocar el boton debajo para regresar</h3> 
          </div>
          <div className='boton'>
            <Link to="/" style={{color: 'whitesmoke'}}>Inicio</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error404;