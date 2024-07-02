import React, { useState, useEffect } from 'react';
import './Bienvenida.css';
import imagen1 from '../../assets/fondoperritos.jpg'; // Reemplaza con la ruta correcta
import imagen2 from '../../assets/fondo1.jpg'; // Reemplaza con la ruta correcta
import imagen3 from '../../assets/fondo2.jpg';   // Reemplaza con la ruta correcta
import imagen4 from '../../assets/fondo.png';   // Reemplaza con la ruta correcta


const Bienvenida = () => {
  const images = [imagen1, imagen2, imagen3,imagen4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="bienvenida-container">
      <div className="image-slider">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Imagen ${index + 1}`}
            className={`slider-image ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
      <h2 className="bienvenida-title">¡Bienvenido a JavaPet!</h2>
      <div className="cta-button-container">
        <a href="https://www.facebook.com" className="cta-button" target="_blank" rel="noopener noreferrer">
          PEDI TU CITA AHORA!
        </a>
      </div>
    </div>
  );
};

export default Bienvenida;
